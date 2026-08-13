import React from 'react';
import type { Card4L, GenerationConfig, FourLStats } from '../types/game';
import { Sparkles, Layers, ArrowRight, Briefcase, BookOpen, Heart, Smile } from 'lucide-react';

interface Props {
  drawnCards: Card4L[];
  generation: GenerationConfig;
  selectCount: number;
  multiplier: number;
  onConfirm: (selectedCards: Card4L[], finalStats: Partial<FourLStats>) => void;
}

export const CardSelectionModal: React.FC<Props> = ({
  drawnCards,
  generation,
  selectCount,
  multiplier,
  onConfirm
}) => {
  const activeCards = drawnCards.slice(0, Math.min(drawnCards.length, Math.max(selectCount, drawnCards.length)));

  const accumulated: Partial<FourLStats> = { labor: 0, learn: 0, love: 0, leisure: 0 };
  activeCards.forEach((card) => {
    if (card.stats.labor) accumulated.labor = (accumulated.labor || 0) + card.stats.labor * multiplier;
    if (card.stats.learn) accumulated.learn = (accumulated.learn || 0) + card.stats.learn * multiplier;
    if (card.stats.love) accumulated.love = (accumulated.love || 0) + card.stats.love * multiplier;
    if (card.stats.leisure) accumulated.leisure = (accumulated.leisure || 0) + card.stats.leisure * multiplier;
  });

  const handleConfirm = () => {
    onConfirm(activeCards, accumulated);
  };

  return (
    <div className="modal-overlay z-[100]">
      <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/40 shadow-2xl animate-fadeIn text-center">
        {/* ヘッダー */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Layers className="w-4 h-4" /> 経験カードドロー結果
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {generation.name}
          </h2>
          <p className="text-xs text-slate-400">
            山札から <strong className="text-amber-300">{activeCards.length} 枚</strong> のカードを獲得しました！
            {multiplier > 1 && <span className="text-amber-400 font-bold ml-1"> (✨獲得効果 {multiplier} 倍！)</span>}
          </p>
        </div>

        {/* 獲得4Lスコアカード（メインの強調表示） */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-indigo-500/50 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="text-xs text-indigo-300 font-extrabold uppercase tracking-widest block">
            🎯 今回獲得した 4L スコア
          </div>

          <div className="grid grid-cols-2 gap-3 py-2">
            {/* Labor */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.labor
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-50'
            }`}>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-400" />
                <span className="font-extrabold text-sm">Labor</span>
              </div>
              <span className="text-2xl font-black">{accumulated.labor ? `+${accumulated.labor}` : '0'}</span>
            </div>

            {/* Learn */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.learn
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-50'
            }`}>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <span className="font-extrabold text-sm">Learn</span>
              </div>
              <span className="text-2xl font-black">{accumulated.learn ? `+${accumulated.learn}` : '0'}</span>
            </div>

            {/* Love */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.love
                ? 'bg-pink-500/20 border-pink-500/50 text-pink-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-50'
            }`}>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="font-extrabold text-sm">Love</span>
              </div>
              <span className="text-2xl font-black">{accumulated.love ? `+${accumulated.love}` : '0'}</span>
            </div>

            {/* Leisure */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.leisure
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-50'
            }`}>
              <div className="flex items-center gap-2">
                <Smile className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm">Leisure</span>
              </div>
              <span className="text-2xl font-black">{accumulated.leisure ? `+${accumulated.leisure}` : '0'}</span>
            </div>
          </div>

          {/* 成長効果の補足ガイド */}
          <div className="pt-2 border-t border-slate-800 text-left text-[11px] space-y-1">
            {accumulated.labor ? (
              <p className="text-amber-300 font-semibold">
                ⚡ Labor獲得: 現場での実践により、いずれかのスキルがランダムで +1 偶発的成長します。
              </p>
            ) : null}
            {accumulated.learn ? (
              <p className="text-purple-300 font-semibold">
                💡 Learn獲得: 次のステップでポータブルスキルへ手動変換・意味づけが可能です。
              </p>
            ) : null}
          </div>
        </div>

        {/* 決定ボタン */}
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Sparkles className="w-5 h-5" /> 4Lキューブを獲得して進む <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
