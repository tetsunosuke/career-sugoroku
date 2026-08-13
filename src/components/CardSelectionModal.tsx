import React from 'react';
import type { Card4L, GenerationConfig, FourLStats } from '../types/game';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

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
  // 自動ドローされた全カード（または枚数制限分）のステータスを集計
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
      <div className="glass-panel w-full max-w-xl p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/40 shadow-2xl animate-fadeIn">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Layers className="w-4 h-4" /> 山札から経験カードを自動ドロー！
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            {generation.name}
          </h2>
          <p className="text-xs text-slate-300">
            山札から <strong className="text-amber-300 font-extrabold">{activeCards.length} 枚</strong> のカードがめくられました！
            {multiplier > 1 && <span className="text-amber-400 font-bold ml-1"> (✨獲得効果 {multiplier} 倍！)</span>}
          </p>
        </div>

        {/* ドローされたカードリスト表示（自動オープン） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeCards.map((card, idx) => (
            <div
              key={card.id + idx}
              className="p-4 rounded-xl border border-indigo-500/40 bg-indigo-950/60 shadow-md animate-tileReveal flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {card.deck === 'work' ? '💼 仕事(Labor)の山' : card.deck === 'learn' ? '📚 学び(Learn)の山' : '💖 ライフの山'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Card #{idx + 1}</span>
                </div>
                {card.title && <div className="text-sm font-bold text-white mb-1">{card.title}</div>}
              </div>

              <div className="py-2.5 px-3 bg-slate-950/70 rounded-lg border border-slate-800 space-y-1.5 mt-2">
                <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs font-black">
                  {card.stats.labor && <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">Labor +{card.stats.labor * multiplier}</span>}
                  {card.stats.learn && <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Learn +{card.stats.learn * multiplier}</span>}
                  {card.stats.love && <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">Love +{card.stats.love * multiplier}</span>}
                  {card.stats.leisure && <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Leisure +{card.stats.leisure * multiplier}</span>}
                </div>

                {/* 資金・体力効果 */}
                <div className="flex items-center justify-center gap-2 text-[11px] font-bold border-t border-white/5 pt-1">
                  {card.moneyEffect !== undefined && card.moneyEffect !== 0 && (
                    <span className={card.moneyEffect > 0 ? 'text-amber-300' : 'text-rose-300'}>
                      💰 資金 {card.moneyEffect > 0 ? `+${card.moneyEffect}` : card.moneyEffect}万
                    </span>
                  )}
                  {card.healthEffect !== undefined && card.healthEffect !== 0 && (
                    <span className={card.healthEffect > 0 ? 'text-emerald-300' : 'text-rose-300'}>
                      ❤️ 体力 {card.healthEffect > 0 ? `+${card.healthEffect}` : card.healthEffect}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 今回獲得できる合計パラメータサマリー */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 text-center space-y-2">
          <span className="text-xs text-indigo-300 font-extrabold uppercase tracking-wider block">
            🎯 今回のマスで獲得したスコア (4Lパラメータ)
          </span>
          <div className="flex items-center justify-center flex-wrap gap-3 text-base font-black py-1">
            {accumulated.labor ? <span className="px-3 py-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">Labor +{accumulated.labor}</span> : null}
            {accumulated.learn ? <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">Learn +{accumulated.learn}</span> : null}
            {accumulated.love ? <span className="px-3 py-1 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">Love +{accumulated.love}</span> : null}
            {accumulated.leisure ? <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Leisure +{accumulated.leisure}</span> : null}
          </div>

          {/* スキル成長の影響についての説明 */}
          <div className="pt-2 border-t border-slate-800 text-left text-xs space-y-1">
            {accumulated.labor ? (
              <p className="text-amber-300 font-semibold flex items-center gap-1">
                ⚡ 現場での実践(Labor)獲得！ いずれかのポータブルスキルがランダムで +1 偶発的成長します。
              </p>
            ) : null}
            {accumulated.learn ? (
              <p className="text-purple-300 font-semibold flex items-center gap-1">
                💡 学び(Learn +{accumulated.learn})獲得！ 次の画面でポータブルスキルへ手動変換・意味づけできます。
              </p>
            ) : null}
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Sparkles className="w-5 h-5" />
          この結果を獲得して進む <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
