import React, { useState } from 'react';
import type {
  PlayerState,
  Character,
  GenerationConfig,
  CourseConfig,
  GamePhase,
  Card4L,
  FourLStats,
  SkillType,
  CoOpProject,
  GameLog,
  DeckType
} from '../types/game';
import { BOARD_TILES } from '../data/boards';
import { COOP_PROJECTS } from '../data/projects';
import { COURSES } from '../data/characters';
import {
  createInitialPlayer,
  getDeckCards,
  getDrawCount,
  getRandomSkill
} from '../logic/gameEngine';

import { HeaderNav } from './HeaderNav';
import { GuideContent } from './GuideContent';
import { SetupModal } from './SetupModal';
import { StatusPanel } from './StatusPanel';
import { Board } from './Board';
import { DiceRoller } from './DiceRoller';
import { TileArrivalModal } from './TileArrivalModal';
import { CardSelectionModal } from './CardSelectionModal';
import { SkillAllocationModal } from './SkillAllocationModal';
import { ProjectsPanel } from './ProjectsPanel';
import { LogPanel } from './LogPanel';
import { ResultModal } from './ResultModal';
import { RefreshCw, BookOpen, GraduationCap } from 'lucide-react';

export const GameContainer: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('SETUP');
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [turn, setTurn] = useState<number>(1);
  const [projects, setProjects] = useState<CoOpProject[]>(COOP_PROJECTS);
  const [logs, setLogs] = useState<GameLog[]>([]);
  const [guideModalTab, setGuideModalTab] = useState<'rules' | 'theory' | null>(null);

  // ドロー＆割り振り用の一時ステート
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [drawnCards, setDrawnCards] = useState<Card4L[]>([]);
  const [currentDrawParams, setCurrentDrawParams] = useState<{ selectCount: number; multiplier: number }>({ selectCount: 1, multiplier: 1 });
  const [pendingSkillBasePt, setPendingSkillBasePt] = useState<number>(0);
  const [forcedSkill, setForcedSkill] = useState<SkillType | undefined>(undefined);
  const [canChangeCourseModal, setCanChangeCourseModal] = useState<boolean>(false);

  const addLog = (message: string, type: GameLog['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, { turn, message, type, timestamp }]);
  };

  // ゲームスタート
  const handleStartGame = (char: Character, gen: GenerationConfig, course: CourseConfig) => {
    const newPlayer = createInitialPlayer(char, gen, course);
    setPlayer(newPlayer);
    setCurrentPosition(0);
    setPhase('ROLL');
    setTurn(1);
    setLogs([]);
    addLog(`【ゲーム開始】キャラ: ${char.name} (${char.riasecType}), 年代: ${gen.name}, コース: ${course.name}`, 'info');
  };

  // 1. 移動フェーズ (ダイス振り)
  const handleRollDice = (diceVal: number) => {
    if (!player) return;

    const nextPos = Math.min(12, currentPosition + diceVal);
    const tile = BOARD_TILES[nextPos];

    // 体力・資金の移動時変動
    let staminaCost = 5;
    if (player.character.id === 'CHAR_R') {
      staminaCost = 4; // リキヤ特権: 20%軽減
    }

    let nextMoney = player.money;
    let nextHealth = Math.max(0, player.health.current - staminaCost);

    // 大手企業コース福利厚生 & チヒロ手当
    if (player.course.id === 'enterprise') {
      nextHealth = Math.min(player.health.max, nextHealth + 5);
      nextMoney += 1;
    }
    if (player.character.id === 'CHAR_C') {
      nextMoney += 2; // チヒロ特権
    }

    // マス効果
    if (tile.moneyEffect) nextMoney += tile.moneyEffect;
    if (tile.healthEffect) nextHealth = Math.max(0, Math.min(player.health.max, nextHealth + tile.healthEffect));

    setCurrentPosition(nextPos);

    const updatedPlayer: PlayerState = {
      ...player,
      position: nextPos,
      money: Math.max(0, nextMoney),
      health: { ...player.health, current: nextHealth }
    };
    setPlayer(updatedPlayer);

    addLog(`ダイスの出目 [${diceVal}] でマス #${nextPos}「${tile.name}」へ移動。（体力 -${staminaCost}${tile.moneyEffect ? `, 資金 ${tile.moneyEffect > 0 ? '+' : ''}${tile.moneyEffect}万` : ''}）`, 'move');

    // 体力切れ（バーンアウト・燃え尽き）判定
    if (nextHealth <= 0) {
      addLog(`⚠️ 体力が0になり燃え尽きました！ 1ターンしっかり休息して体力を回復します。`, 'warn');
      setPhase('BURNOUT_REST');
      return;
    }

    // 12番マス（ゴール）到達判定
    if (nextPos === 12) {
      setPlayer((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          position: 12,
          money: prev.money + 20,
          health: { ...prev.health, current: prev.health.max },
          stats4L: {
            labor: prev.stats4L.labor + 1,
            learn: prev.stats4L.learn + 1,
            love: prev.stats4L.love + 1,
            leisure: prev.stats4L.leisure + 1
          }
        };
      });
      addLog(`ゴール！直獲得特権により全4L+1、特別ボーナス20万円＆体力完全回復！`, 'card');
      setPhase('GAME_OVER');
      return;
    }

    // 2. マス到着・ドロー準備フェーズ (TILE_ARRIVAL)
    let targetDeck: DeckType = 'work';
    if (tile.deck === 'choice') {
      targetDeck = 'any';
    } else {
      targetDeck = tile.deck;
    }

    const { drawCount, selectCount, multiplier, skillBonusApplied, skillBonusText } = getDrawCount(
      player.generation,
      player.course,
      targetDeck,
      player.skills,
      tile
    );

    if (skillBonusApplied && skillBonusText) {
      addLog(`✨ スキル条件判定クリア！ ${skillBonusText}`, 'skill');
    }

    const cards = getDeckCards(targetDeck, drawCount);

    setDrawnCards(cards);
    setCurrentDrawParams({ selectCount, multiplier });
    setPendingSkillBasePt(tile.skillPt);
    setForcedSkill(tile.isSpecialSkillAlloc);

    setPhase('TILE_ARRIVAL');
  };

  // 燃え尽き復帰
  const handleRecoverBurnout = () => {
    if (!player) return;
    const recoveredHealth = Math.floor(player.health.max * 0.6);
    setPlayer({
      ...player,
      health: { ...player.health, current: recoveredHealth }
    });
    addLog(`🌿 休暇を過ごして体力を ${recoveredHealth} HP まで回復しました。`, 'info');
    setTurn((t) => t + 1);
    setPhase('ROLL');
  };

  // マス拡大説明から山札ドロー実行
  const handleStartDraw = () => {
    setPhase('DRAW_SELECTION');
  };

  // 2. 4Lカード決定
  const handleConfirmCards = (selectedCards: Card4L[], finalStats: Partial<FourLStats>) => {
    if (!player) return;

    const gainedLabor = finalStats.labor || 0;
    const gainedLearn = finalStats.learn || 0;
    const gainedLove = finalStats.love || 0;
    const gainedLeisure = finalStats.leisure || 0;

    let cardMoneyDiff = 0;
    let cardHealthDiff = 0;

    selectedCards.forEach((c) => {
      let mEff = c.moneyEffect || 0;
      let hEff = c.healthEffect || 0;

      // イオリ(I): 学び費用半額
      if (player.character.id === 'CHAR_I' && mEff < 0 && c.deck === 'learn') {
        mEff = Math.ceil(mEff / 2);
      }
      // アオイ(A): 余暇の体力回復1.5倍
      if (player.character.id === 'CHAR_A' && hEff > 0 && c.deck === 'life' && c.stats.leisure) {
        hEff = Math.floor(hEff * 1.5);
      }
      // ソウタ(S): 愛の獲得時体力回復+10
      if (player.character.id === 'CHAR_S' && c.stats.love) {
        hEff += 10;
      }

      cardMoneyDiff += mEff;
      cardHealthDiff += hEff;
    });

    const updated4L = {
      labor: player.stats4L.labor + gainedLabor,
      learn: player.stats4L.learn + gainedLearn,
      love: player.stats4L.love + gainedLove,
      leisure: player.stats4L.leisure + gainedLeisure
    };

    let updatedSkills = { ...player.skills };

    // ログ記録
    const statSummary = [
      gainedLabor > 0 ? `Labor +${gainedLabor}` : '',
      gainedLearn > 0 ? `Learn +${gainedLearn}` : '',
      gainedLove > 0 ? `Love +${gainedLove}` : '',
      gainedLeisure > 0 ? `Leisure +${gainedLeisure}` : ''
    ].filter(Boolean).join(', ');

    addLog(`4Lキューブ獲得: [ ${statSummary || 'なし'} ]${cardMoneyDiff !== 0 ? `, 資金 ${cardMoneyDiff > 0 ? '+' : ''}${cardMoneyDiff}万` : ''}${cardHealthDiff !== 0 ? `, 体力 ${cardHealthDiff > 0 ? '+' : ''}${cardHealthDiff}` : ''}`, 'card');

    // ① Labor獲得による偶発的なポータブルスキルランダム成長
    if (gainedLabor > 0) {
      const randomSkill = getRandomSkill();
      updatedSkills[randomSkill.key] = updatedSkills[randomSkill.key] + 1;
      addLog(`⚡ 現場での実践(Labor +${gainedLabor})により、【${randomSkill.label}】スキルが偶発的に+1成長！`, 'skill');
    }

    setPlayer({
      ...player,
      stats4L: updated4L,
      skills: updatedSkills,
      money: Math.max(0, player.money + cardMoneyDiff),
      health: {
        ...player.health,
        current: Math.max(0, Math.min(player.health.max, player.health.current + cardHealthDiff))
      }
    });

    // ② Learn(学び)が得られた場合のみ、ポータブルスキル手動変換フェーズへ進む
    if (gainedLearn > 0) {
      setPendingSkillBasePt(gainedLearn);
      setPhase('SKILL_ALLOCATION');
    } else {
      addLog('今回の経験では「学び(Learn)」が得られなかったため、主体的スキル変換はスキップされました。', 'info');
      // 9番マスのコース変更特権確認
      const currentTile = BOARD_TILES[currentPosition];
      if (currentTile.canChangeCourse) {
        setCanChangeCourseModal(true);
      }
      setTurn((t) => t + 1);
      setPhase('ROLL');
    }
  };

  // コース変更処理
  const handleChangeCourse = (newCourseId: CourseConfig['id']) => {
    if (!player) return;
    const targetCourse = COURSES.find((c) => c.id === newCourseId) || player.course;
    setPlayer({ ...player, course: targetCourse });
    addLog(`副業・プロボノの経験からコースを【${targetCourse.name}】へ変更しました。`, 'info');
    setCanChangeCourseModal(false);
  };

  // 3. 意味づけフェーズ (スキルポイント割り振り)
  const handleAllocateSkill = (allocatedSkill: SkillType, amount: number) => {
    if (!player) return;

    const newSkills = {
      ...player.skills,
      [allocatedSkill]: player.skills[allocatedSkill] + amount
    };

    setPlayer({ ...player, skills: newSkills });

    const skillNames: Record<SkillType, string> = {
      interpersonal: '対人',
      thinking: '思考',
      execution: '実行',
      flexibility: '柔軟'
    };
    addLog(`スキル割り振り: ${skillNames[allocatedSkill]} +${amount} pt`, 'skill');

    // 9番マスのコース変更特権確認（スキル割り振り後に表示）
    const currentTile = BOARD_TILES[currentPosition];
    if (currentTile.canChangeCourse) {
      setCanChangeCourseModal(true);
    }

    // ターン終了判定
    setTurn((t) => t + 1);
    setPhase('ROLL');
  };

  // 4. 協力プロジェクト達成
  const handleCompleteProject = (proj: CoOpProject) => {
    if (!player) return;

    const isEiji = player.character.id === 'CHAR_E';
    const bonus4L = isEiji ? 1 : 0;
    const bonusMoney = isEiji ? 5 : 0;

    const rewardLabor = (proj.reward4L.labor || 0) + bonus4L;
    const rewardLearn = (proj.reward4L.learn || 0) + bonus4L;
    const rewardLove = (proj.reward4L.love || 0) + bonus4L;
    const rewardLeisure = (proj.reward4L.leisure || 0) + bonus4L;

    const earnedMoney = (proj.rewardMoney || 0) + bonusMoney;
    const costMoney = proj.reqMoney || 0;
    const costHealth = proj.reqHealth || 0;
    const earnedHealth = proj.rewardHealth || 0;

    const new4L = {
      labor: player.stats4L.labor + rewardLabor,
      learn: player.stats4L.learn + rewardLearn,
      love: player.stats4L.love + rewardLove,
      leisure: player.stats4L.leisure + rewardLeisure
    };

    const newMoney = Math.max(0, player.money - costMoney + earnedMoney);
    const newHealth = Math.max(0, Math.min(player.health.max, player.health.current - costHealth + earnedHealth));

    setPlayer({
      ...player,
      stats4L: new4L,
      money: newMoney,
      health: { ...player.health, current: newHealth }
    });

    setProjects((prev) =>
      prev.map((p) => (p.id === proj.id ? { ...p, isCompleted: true } : p))
    );

    addLog(`🎉 協力プロジェクト【${proj.title}】を達成！報酬4Lおよび報酬資金+${earnedMoney}万を獲得。`, 'project');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 画面ヘッダー */}
      <header className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-extrabold text-white shadow-lg">
            🎲
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
              キャリアすごろく
            </h1>
            <p className="text-xs text-slate-400">自律型キャリアシミュレーション Web App</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setGuideModalTab('rules')}
            className="px-3 py-2 rounded-lg text-xs font-bold text-slate-300 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> ルールガイド
          </button>
          <button
            onClick={() => setGuideModalTab('theory')}
            className="px-3 py-2 rounded-lg text-xs font-bold text-slate-300 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 flex items-center gap-1.5 transition-all"
          >
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" /> キャリア理論解説
          </button>
          <button
            onClick={() => setPhase('SETUP')}
            className="px-3 py-2 rounded-lg text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> 最初からやり直す
          </button>
        </div>
      </header>

      {/* セットアップダイアログ */}
      {phase === 'SETUP' && <SetupModal onStart={handleStartGame} />}

      {/* メインゲームレイアウト */}
      {player && phase !== 'SETUP' && (
        <div className="space-y-6">
          {/* 上段: サイコロ操作パネル */}
          <DiceRoller
            onRoll={handleRollDice}
            disabled={phase !== 'ROLL'}
          />

          {/* 中段: 2カラムグリッド (すごろく盤面 & ステータス) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Board currentPosition={currentPosition} />
              <ProjectsPanel
                projects={projects}
                player={player}
                onComplete={handleCompleteProject}
              />
            </div>

            <div className="space-y-6">
              <StatusPanel player={player} turn={turn} />
              <LogPanel logs={logs} />
            </div>
          </div>
        </div>
      )}

      {/* マス到着・拡大説明ダイアログ */}
      {phase === 'TILE_ARRIVAL' && player && (
        <TileArrivalModal
          tile={BOARD_TILES[currentPosition]}
          skills={player.skills}
          drawCount={drawnCards.length}
          skillBonusApplied={getDrawCount(player.generation, player.course, BOARD_TILES[currentPosition].deck === 'choice' ? 'any' : BOARD_TILES[currentPosition].deck, player.skills, BOARD_TILES[currentPosition]).skillBonusApplied}
          skillBonusText={getDrawCount(player.generation, player.course, BOARD_TILES[currentPosition].deck === 'choice' ? 'any' : BOARD_TILES[currentPosition].deck, player.skills, BOARD_TILES[currentPosition]).skillBonusText}
          onDrawCards={handleStartDraw}
        />
      )}

      {/* 4Lカードドローダイアログ */}
      {phase === 'DRAW_SELECTION' && player && (
        <CardSelectionModal
          drawnCards={drawnCards}
          generation={player.generation}
          selectCount={currentDrawParams.selectCount}
          multiplier={currentDrawParams.multiplier}
          onConfirm={handleConfirmCards}
        />
      )}

      {/* スキル割り振りダイアログ */}
      {phase === 'SKILL_ALLOCATION' && player && (
        <SkillAllocationModal
          character={player.character}
          course={player.course}
          baseSkillPt={pendingSkillBasePt}
          forcedSkill={forcedSkill}
          onAllocate={handleAllocateSkill}
        />
      )}

      {/* 副業コース変更ダイアログ (9番マス通過時) */}
      {canChangeCourseModal && player && (
        <div className="modal-overlay z-[110]">
          <div className="glass-panel p-6 max-w-md w-full space-y-4 text-center">
            <h3 className="text-lg font-bold text-indigo-300">✨ 副業・プロボノの成果！</h3>
            <p className="text-xs text-slate-300">
              コース変更が可能です。現在の【{player.course.name}】から変更しますか？
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {COURSES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleChangeCourse(c.id)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    player.course.id === c.id
                      ? 'border-indigo-500 bg-indigo-950/60 text-white'
                      : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCanChangeCourseModal(false)}
              className="text-xs text-slate-400 hover:underline pt-2"
            >
              変更せずに進む
            </button>
          </div>
        </div>
      )}
      {/* 燃え尽き症候群・要休息モーダル */}
      {phase === 'BURNOUT_REST' && (
        <div className="modal-overlay z-[120]">
          <div className="glass-panel p-6 max-w-md w-full text-center space-y-4 border-rose-500/40 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-3xl mx-auto">
              🥱
            </div>
            <h3 className="text-xl font-bold text-rose-300">体力が0になりました！</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              連日のハードワークにより疲労が限界に達しました。1ターンしっかり休みを取ってコンディションを回復させましょう。
            </p>
            <button
              onClick={handleRecoverBurnout}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 font-bold text-sm text-white shadow-lg shadow-rose-600/30 transition-all"
            >
              🌿 1ターン休養して体力を回復
            </button>
          </div>
        </div>
      )}

      {/* ゲームオーバー / ゴールリザルト */}
      {phase === 'GAME_OVER' && player && (
        <ResultModal
          player={player}
          completedProjects={projects.filter((p) => p.isCompleted)}
          turn={turn}
          logs={logs}
          onRestart={() => setPhase('SETUP')}
        />
      )}

      {/* ガイドブック / キャリア理論モーダル */}
      {guideModalTab && (
        <div className="modal-overlay z-[150] overflow-y-auto py-8">
          <div className="bg-slate-950/95 border border-white/10 p-6 sm:p-8 rounded-3xl max-w-5xl w-full shadow-2xl my-auto">
            <GuideContent
              initialTab={guideModalTab}
              isModalView={true}
              onClose={() => setGuideModalTab(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
