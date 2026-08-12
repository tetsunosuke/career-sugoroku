import React from 'react';
import type { BoardTile, PortableSkills, DeckType } from '../types/game';
import { Compass, Sparkles, Zap, Layers, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  tile: BoardTile;
  skills: PortableSkills;
  drawCount: number;
  skillBonusApplied: boolean;
  skillBonusText?: string;
  onDrawCards: () => void;
}

export const TileArrivalModal: React.FC<Props> = ({
  tile,
  skills,
  drawCount,
  skillBonusApplied,
  skillBonusText,
  onDrawCards
}) => {
  const getDeckName = (deck: DeckType | 'choice') => {
    if (deck === 'work') return '💼 仕事 (Labor) の山';
    if (deck === 'learn') return '📚 学び (Learn) の山';
    if (deck === 'life') return '💖 ライフの山';
    return '🌟 任意の山札 (選択可能)';
  };

  return (
    <div className="modal-overlay z-[100]">
      <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/40 shadow-2xl animate-fadeIn text-center">
        {/* 到着バッジ */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Compass className="w-4 h-4 text-indigo-400" /> マス #{tile.id} に到着！
        </div>

        {/* マス目の拡大カード表示 */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/80 to-slate-900/90 border-2 border-indigo-500/50 shadow-xl space-y-4 relative overflow-hidden">
          {/* 光の装飾背景 */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              {tile.category} エリア
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold">マス #{tile.id} / 12</span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-wide bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
            {tile.name}
          </h2>

          <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            {tile.effectDescription}
          </p>

          {/* ドロー山札情報 */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-300">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>対象山札: <strong className="text-indigo-300">{getDeckName(tile.deck)}</strong></span>
          </div>

          {/* スキル条件判定の拡大説明 */}
          {tile.skillCondition && (
            <div className={`p-3 rounded-xl border text-xs text-left space-y-1 ${
              skillBonusApplied
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  {skillBonusApplied ? <CheckCircle2 className="w-4 h-4 text-amber-400" /> : <AlertCircle className="w-4 h-4 text-slate-500" />}
                  スキルドロー判定: {tile.skillCondition.description}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800">
                  現在 {skills[tile.skillCondition.skill]} pt
                </span>
              </div>
              {skillBonusApplied ? (
                <p className="text-[11px] text-amber-300 font-bold">
                  ✨ ポータブルスキル条件を達成！山札から引くカードが +1枚 ボーナスされます！
                </p>
              ) : (
                <p className="text-[11px] text-slate-500">
                  ※スキル判定未達成（{tile.skillCondition.threshold}pt以上でボーナス発動）
                </p>
              )}
            </div>
          )}
        </div>

        {/* ドロー枚数確認 */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-300 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>山札から <strong className="text-amber-300 font-extrabold text-sm mx-1">{drawCount} 枚</strong> のカードを引きます</span>
        </div>

        {/* アクションボタン */}
        <button
          onClick={onDrawCards}
          className="w-full py-4 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98"
        >
          <Layers className="w-5 h-5" /> 山札からカードを引く！ <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
