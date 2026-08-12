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
import { RefreshCw } from 'lucide-react';

export const GameContainer: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('SETUP');
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [turn, setTurn] = useState<number>(1);
  const [projects, setProjects] = useState<CoOpProject[]>(COOP_PROJECTS);
  const [logs, setLogs] = useState<GameLog[]>([]);

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

    setCurrentPosition(nextPos);
    setPlayer({ ...player, position: nextPos });
    addLog(`ダイスの出目 [${diceVal}] でマス #${nextPos}「${tile.name}」へ移動しました。`, 'move');

    // 12番マス（ゴール）到達判定
    if (nextPos === 12) {
      setPlayer((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          position: 12,
          stats4L: {
            labor: prev.stats4L.labor + 1,
            learn: prev.stats4L.learn + 1,
            love: prev.stats4L.love + 1,
            leisure: prev.stats4L.leisure + 1
          }
        };
      });
      addLog(`ゴール！直獲得特権により全4Lキューブを+1獲得しました！`, 'card');
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

    // マス拡大説明表示フェーズへ移行
    setPhase('TILE_ARRIVAL');
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

    const isDaiki = player.character.id === 'CHAR_E';
    const bonus = isDaiki ? 1 : 0;

    const rewardLabor = (proj.reward4L.labor || 0) + bonus;
    const rewardLearn = (proj.reward4L.learn || 0) + bonus;
    const rewardLove = (proj.reward4L.love || 0) + bonus;
    const rewardLeisure = (proj.reward4L.leisure || 0) + bonus;

    const new4L = {
      labor: player.stats4L.labor + rewardLabor,
      learn: player.stats4L.learn + rewardLearn,
      love: player.stats4L.love + rewardLove,
      leisure: player.stats4L.leisure + rewardLeisure
    };

    setPlayer({ ...player, stats4L: new4L });
    setProjects((prev) =>
      prev.map((p) => (p.id === proj.id ? { ...p, isCompleted: true } : p))
    );

    addLog(`🎉 協力プロジェクト【${proj.title}】を達成！報酬4Lを獲得。`, 'project');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 画面ヘッダー */}
      <header className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-extrabold text-white shadow-lg">
            キャリア
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
              キャリアすごろく
            </h1>
            <p className="text-xs text-slate-400">自律型キャリアシミュレーション Web App</p>
          </div>
        </div>

        <button
          onClick={() => setPhase('SETUP')}
          className="px-4 py-2 rounded-lg text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> 最初からやり直す
        </button>
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
                skills={player.skills}
                character={player.character}
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
    </div>
  );
};
