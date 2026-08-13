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
  DeckType,
  CareerGoal
} from '../types/game';
import { BOARD_TILES } from '../data/boards';
import { COOP_PROJECTS } from '../data/projects';
import { COURSES } from '../data/characters';
import {
  createInitialPlayer,
  getDeckCards,
  getDrawCount,
  getRandomSkill,
  computeGoalAchievement,
  computeSkillPoints
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
  const handleStartGame = (
    character: Character,
    generation: GenerationConfig,
    course: CourseConfig,
    goal: CareerGoal,
    lap: number = 1,
    firstLapSummary?: any
  ) => {
    const initialPlayer = createInitialPlayer(character, generation, course, goal, lap, firstLapSummary);
    setPlayer(initialPlayer);
    setCurrentPosition(0);
    setTurn(1);
    setPhase('ROLL');
    addLog(`🚀 第 ${lap} 周目：【${character.name}】(${character.riasecType}) × 【${generation.name}】 × 【${course.name}】 コースでゲームを開始！`, 'info');
    addLog(`🎯 あなたが自己決定した目標: 【${goal.title}】（目標達成に向けてスタート！）`, 'card');
  };

  // 1周目の結果を引き継いで2周目 (リ・キャリア) へ進む
  const handleStartSecondLap = () => {
    if (!player) return;
    const summary = {
      goalTitle: player.goal.title,
      achievementRate: computeGoalAchievement(player),
      money: player.money,
      stats4L: { ...player.stats4L }
    };

    // SETUPフェーズに戻して2周目用セットアップ
    setPhase('SETUP');
    // フラグ用一時保持
    (window as any).__firstLapSummary = summary;
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

  // マス拡大・出来事モーダルから行動スタンスを選択
  const handleSelectStance = (stance: ActionStance, useLeisureDeck?: boolean) => {
    if (!player) return;
    const tile = BOARD_TILES[currentPosition];
    let targetDeck: DeckType = tile.deck === 'choice' ? 'any' : tile.deck;

    let { drawCount, selectCount, multiplier, skillBonusApplied, skillBonusText } = getDrawCount(
      player.generation,
      player.course,
      targetDeck,
      player.skills,
      tile
    );

    let updatedHealth = { ...player.health };
    let updatedMoney = player.money;
    let updatedLeaves = { ...player.paidLeaves };

    // 40-50代での家族介護強制有休イベントかチェック
    const isMandatoryVacationEvent =
      tile.isMandatoryVacationGen === '40s_50s' && player.generation.id === '40s_50s';

    let updated4L = { ...player.stats4L };

    if (isMandatoryVacationEvent) {
      if (updatedLeaves.used < updatedLeaves.max) {
        // 有休が残っている場合: 有休を1回強制消化 & Love +1 & Learn +1 獲得！
        updatedLeaves.used += 1;
        updated4L.love += 1;
        updated4L.learn += 1;
        addLog(`🚨【40-50代介護イベント】家族の介護サポートのため有休を消化し、家族の絆と人生の学びが深まりました（消化: ${updatedLeaves.used}/${updatedLeaves.max}回, 💖 Love +1 / 💡 Learn +1 獲得！）。`, 'card');
      } else {
        // 有休が無い場合: マネー 10 CR 減少ペナルティ
        updatedMoney = Math.max(0, updatedMoney - 10);
        addLog(`💸【40-50代介護ペナルティ】有給休暇の残数が無いため、非常介護サポート費用として 10 CR が発生しました！`, 'warn');
      }
      drawCount = 1;
      selectCount = 1;
    } else if (stance === 'hardwork') {
      // かなりがんばってみる: 体力-15 HP, 資金+5 CR, ドロー枚数+1枚
      updatedHealth.current = Math.max(0, updatedHealth.current - 15);
      updatedMoney += 5;
      drawCount += 1;
      addLog(`🔥 スタンス【かなりがんばってみる】を選択！（体力-15 HP, 資金+5 CR, ドローカード+1枚）`, 'warn');
    } else if (stance === 'vacation') {
      // 有給を使う: 有休消化+1回, 体力+20 HP回復
      updatedLeaves.used = Math.min(updatedLeaves.max, updatedLeaves.used + 1);
      updatedHealth.current = Math.min(updatedHealth.max, updatedHealth.current + 20);
      drawCount = 1;
      selectCount = 1;

      if (useLeisureDeck && updatedMoney >= 3) {
        // 資金 3 CR 消費で Leisure (余暇/ライフ) 山札からドロー！
        updatedMoney -= 3;
        targetDeck = 'life';
        addLog(`✨ 贅沢有給旅行を取得！（3 CRを自己投資し、【Leisure (余暇) の山札】からドロー！ / 体力+20 HP回復）`, 'info');
      } else {
        addLog(`🌿 スタンス【通常有給】を選択！（有休消化 ${updatedLeaves.used}/${updatedLeaves.max}回, 体力+20 HP回復）`, 'info');
      }
    } else {
      addLog(`💼 スタンス【引き受ける】を選択。（順当に業務・活動に対応）`, 'info');
    }

    // プレイヤー状態更新
    setPlayer({
      ...player,
      stats4L: updated4L,
      money: updatedMoney,
      health: updatedHealth,
      paidLeaves: updatedLeaves
    });

    const cards = getDeckCards(targetDeck, drawCount);

    setDrawnCards(cards);
    setCurrentDrawParams({ selectCount, multiplier });
    setPendingSkillBasePt(tile.skillPt);
    setForcedSkill(tile.isSpecialSkillAlloc);

    setPhase('DRAW_SELECTION');
  };

  // 2. 4Lカード決定（獲得した4Lスコアのみを加算）
  const handleConfirmCards = (selectedCards: Card4L[], finalStats: Partial<FourLStats>) => {
    if (!player) return;

    const gainedLabor = finalStats.labor || 0;
    const gainedLearn = finalStats.learn || 0;
    const gainedLove = finalStats.love || 0;
    const gainedLeisure = finalStats.leisure || 0;

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

    addLog(`4Lキューブ獲得: [ ${statSummary || 'なし'} ]`, 'card');

    // ① Labor獲得による偶発的なポータブルスキルランダム成長
    if (gainedLabor > 0) {
      const randomSkill = getRandomSkill();
      updatedSkills[randomSkill.key] = updatedSkills[randomSkill.key] + 1;
      addLog(`⚡ 現場での実践(Labor +${gainedLabor})により、【${randomSkill.label}】スキルが偶発的に+1成長！`, 'skill');
    }

    setPlayer({
      ...player,
      stats4L: updated4L,
      skills: updatedSkills
    });

    // ② マスの確定基礎スキルpt (tile.skillPt) と Learnカードpt (gainedLearn) を合算
    const currentTile = BOARD_TILES[currentPosition];
    const tileBaseSkillPt = currentTile?.skillPt || 0;
    const totalSkillBasePt = tileBaseSkillPt + gainedLearn;

    if (totalSkillBasePt > 0 || currentTile?.isSpecialSkillAlloc) {
      setPendingSkillBasePt(totalSkillBasePt);
      setForcedSkill(currentTile?.isSpecialSkillAlloc);
      addLog(`✨ スキル配分フェーズ: 【マスの確定スキル: +${tileBaseSkillPt}pt】 + 【Learn獲得: +${gainedLearn}pt】 = 計 ${totalSkillBasePt} pt を配分します。`, 'skill');
      setPhase('SKILL_ALLOCATION');
    } else {
      addLog('今回のマスと経験ではスキルポイントが得られなかったため、スキル配分はスキップされました。', 'info');
      // 9番マスのコース変更特権確認
      if (currentTile?.canChangeCourse) {
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

  // 3. 意味づけフェーズ (スキルポイント自由配分)
  const handleAllocateSkill = (allocatedMap: Record<SkillType, number>) => {
    if (!player) return;

    const skillNames: Record<SkillType, string> = {
      interpersonal: '対人',
      thinking: '思考',
      execution: '実行',
      flexibility: '柔軟'
    };

    let updatedSkills = { ...player.skills };
    const logsList: string[] = [];

    (Object.keys(allocatedMap) as SkillType[]).forEach((sk) => {
      const allocatedPt = allocatedMap[sk];
      if (allocatedPt > 0) {
        const gainedPt = computeSkillPoints(player.character, sk, allocatedPt, player.course);
        updatedSkills[sk] += gainedPt;
        logsList.push(`${skillNames[sk]} +${gainedPt}pt`);
      }
    });

    setPlayer({ ...player, skills: updatedSkills });

    addLog(`スキル自由配分: [ ${logsList.join(', ')} ]`, 'skill');

    // ゴールマス(12番マス以上)に到達している場合はリザルトへ
    if (currentPosition >= 12) {
      setPhase('GAME_OVER');
      return;
    }

    // 9番マスのコース変更特権確認（スキル割り振り後に表示）
    const currentTile = BOARD_TILES[currentPosition];
    if (currentTile && currentTile.canChangeCourse) {
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
      {phase === 'SETUP' && (
        <SetupModal
          onStart={(char, gen, course, goal) => {
            const firstLapSummary = (window as any).__firstLapSummary;
            const lap = firstLapSummary ? 2 : 1;
            handleStartGame(char, gen, course, goal, lap, firstLapSummary);
          }}
        />
      )}

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

      {/* マス到着・拡大説明・スタンス選択ダイアログ */}
      {phase === 'TILE_ARRIVAL' && player && (
        <TileArrivalModal
          tile={BOARD_TILES[currentPosition]}
          skills={player.skills}
          baseDrawCount={getDrawCount(player.generation, player.course, BOARD_TILES[currentPosition].deck === 'choice' ? 'any' : BOARD_TILES[currentPosition].deck, player.skills, BOARD_TILES[currentPosition]).drawCount}
          skillBonusApplied={getDrawCount(player.generation, player.course, BOARD_TILES[currentPosition].deck === 'choice' ? 'any' : BOARD_TILES[currentPosition].deck, player.skills, BOARD_TILES[currentPosition]).skillBonusApplied}
          money={player.money}
          generationId={player.generation.id}
          paidLeaves={player.paidLeaves || { used: 0, max: 3 }}
          onSelectStance={handleSelectStance}
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
          onRestart={() => {
            delete (window as any).__firstLapSummary;
            setPhase('SETUP');
          }}
          onStartSecondLap={handleStartSecondLap}
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
