import React, { useEffect } from 'react';
import type { PlayerState, CoOpProject } from '../types/game';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, RefreshCw, Award, HeartHandshake } from 'lucide-react';

interface Props {
  player: PlayerState;
  completedProjects: CoOpProject[];
  turn: number;
  onRestart: () => void;
}

export const ResultModal: React.FC<Props> = ({
  player,
  completedProjects,
  turn,
  onRestart
}) => {
  const { character, stats4L, skills } = player;

  useEffect(() => {
    // 紙吹雪エフェクト
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // 称号判定
  const total4L = stats4L.labor + stats4L.learn + stats4L.love + stats4L.leisure;
  let title = 'バランス型アジリティ・リーダー';
  if (stats4L.labor >= 8) title = '最高峰の実績クリエイター (Labor型)';
  else if (stats4L.learn >= 8) title = '知の探求イノベーター (Learn型)';
  else if (stats4L.love >= 8) title = '人間関係・エンゲージメントマスター (Love型)';
  else if (stats4L.leisure >= 8) title = 'ウェルビーイング探求家 (Leisure型)';

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-2xl p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/30 text-center">
        <div className="space-y-3">
          <div className="relative w-20 h-20 mx-auto">
            <img
              src={character.avatarUrl}
              alt={character.name}
              style={{
                width: '80px',
                height: '80px',
                minWidth: '80px',
                minHeight: '80px',
                maxWidth: '80px',
                maxHeight: '80px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              className="border-4 border-amber-400 shadow-xl shadow-amber-500/30 block mx-auto"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            キャリア探求の旅 ゴール到達！🎉
          </h2>
          <p className="text-indigo-300 font-semibold text-sm">
            【{character.name}】が {turn} ターンでマス12（長期休暇・リフレッシュ）に到達しました。
          </p>
        </div>

        {/* 獲得称号 */}
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">あなたのキャリア称号</span>
          <h3 className="text-2xl font-black text-amber-300 tracking-wide">{title}</h3>
        </div>

        {/* スコア集計 */}
        <div className="grid grid-cols-2 gap-4 text-left">
          {/* 4L 集計 */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-indigo-400" /> 最終4Lパラメータ (合計: {total4L})
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <span className="text-orange-400">Labor: {stats4L.labor}</span>
              <span className="text-purple-400">Learn: {stats4L.learn}</span>
              <span className="text-pink-400">Love: {stats4L.love}</span>
              <span className="text-emerald-400">Leisure: {stats4L.leisure}</span>
            </div>
          </div>

          {/* ポータブルスキル 集計 */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
              <Award className="w-4 h-4 text-indigo-400" /> ポータブルスキル
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <span className="text-blue-400">対人: {skills.interpersonal}</span>
              <span className="text-cyan-400">思考: {skills.thinking}</span>
              <span className="text-amber-400">実行: {skills.execution}</span>
              <span className="text-purple-400">柔軟: {skills.flexibility}</span>
            </div>
          </div>
        </div>

        {/* 達成プロジェクト */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
            <HeartHandshake className="w-4 h-4 text-indigo-400" /> 達成した協力プロジェクト ({completedProjects.length})
          </h4>
          {completedProjects.length === 0 ? (
            <p className="text-xs text-slate-500">プロジェクト未達成</p>
          ) : (
            <ul className="text-xs space-y-1">
              {completedProjects.map((p) => (
                <li key={p.id} className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  ✓ {p.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <RefreshCw className="w-5 h-5" /> もう一度プレイする
        </button>
      </div>
    </div>
  );
};
