import React, { useState } from 'react';
import type { Card4L, GenerationConfig, FourLStats } from '../types/game';
import { Layers, Sparkles, Check } from 'lucide-react';

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
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    // もし引く枚数＝選択枚数の場合全選択
    if (drawnCards.length <= selectCount) {
      return drawnCards.map((c) => c.id);
    }
    return [];
  });

  const toggleSelect = (id: string) => {
    if (drawnCards.length <= selectCount) return; // 20代などは選択変更不要

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < selectCount) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleConfirm = () => {
    const selected = drawnCards.filter((c) => selectedIds.includes(c.id));
    
    // 集計（4L獲得）
    const accumulated: Partial<FourLStats> = { labor: 0, learn: 0, love: 0, leisure: 0 };
    selected.forEach((card) => {
      if (card.stats.labor) accumulated.labor = (accumulated.labor || 0) + card.stats.labor * multiplier;
      if (card.stats.learn) accumulated.learn = (accumulated.learn || 0) + card.stats.learn * multiplier;
      if (card.stats.love) accumulated.love = (accumulated.love || 0) + card.stats.love * multiplier;
      if (card.stats.leisure) accumulated.leisure = (accumulated.leisure || 0) + card.stats.leisure * multiplier;
    });

    onConfirm(selected, accumulated);
  };

  const isReady = selectedIds.length === selectCount || drawnCards.length <= selectCount;

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-2xl p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/30">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Layers className="w-4 h-4" /> 経験イベント（4Lカード抽出し）
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            {generation.name} のルール適応
          </h2>
          <p className="text-xs text-slate-400">
            抽出された {drawnCards.length} 枚のうち、<strong className="text-indigo-300">{selectCount} 枚</strong> を選択して自分の経験として獲得します。
            {multiplier > 1 && <span className="text-amber-400 font-bold ml-1"> (✨効果 {multiplier} 倍！)</span>}
          </p>
        </div>

        {/* カードリスト */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {drawnCards.map((card) => {
            const isSelected = selectedIds.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => toggleSelect(card.id)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/50 ring-2 ring-indigo-500/40 shadow-lg'
                    : 'border-slate-800 bg-slate-900/40 opacity-70 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {card.deck} Deck
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-base mt-2 text-slate-100">{card.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{card.description}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-bold">
                  {card.stats.labor && <span className="text-orange-400">Labor +{card.stats.labor * multiplier}</span>}
                  {card.stats.learn && <span className="text-purple-400">Learn +{card.stats.learn * multiplier}</span>}
                  {card.stats.love && <span className="text-pink-400">Love +{card.stats.love * multiplier}</span>}
                  {card.stats.leisure && <span className="text-emerald-400">Leisure +{card.stats.leisure * multiplier}</span>}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleConfirm}
          disabled={!isReady}
          className={`w-full py-3.5 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
            isReady
              ? 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          選択した経験を自分の力にする ({selectedIds.length}/{selectCount})
        </button>
      </div>
    </div>
  );
};
