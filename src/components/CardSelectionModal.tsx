import React, { useState } from 'react';
import type { Card4L, GenerationConfig, FourLStats } from '../types/game';
import { Layers, Sparkles, Check, Info } from 'lucide-react';

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
  // デフォルトで先頭の selectCount 枚をあらかじめ選択状態にする（詰まり防止）
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return drawnCards.slice(0, Math.min(selectCount, drawnCards.length)).map((c) => c.id);
  });

  const toggleSelect = (id: string) => {
    if (drawnCards.length <= selectCount) return; // 選択肢がない場合は固定

    if (selectedIds.includes(id)) {
      // 選択解除
      if (selectedIds.length > 1) { // 最低1枚選択維持
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      // 追加選択
      if (selectedIds.length < selectCount) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // すでに上限なら、一番古い選択を入れ替えて選択
        const newSelected = [...selectedIds.slice(1), id];
        setSelectedIds(newSelected);
      }
    }
  };

  const handleConfirm = () => {
    const selected = drawnCards.filter((c) => selectedIds.includes(c.id));
    
    const accumulated: Partial<FourLStats> = { labor: 0, learn: 0, love: 0, leisure: 0 };
    selected.forEach((card) => {
      if (card.stats.labor) accumulated.labor = (accumulated.labor || 0) + card.stats.labor * multiplier;
      if (card.stats.learn) accumulated.learn = (accumulated.learn || 0) + card.stats.learn * multiplier;
      if (card.stats.love) accumulated.love = (accumulated.love || 0) + card.stats.love * multiplier;
      if (card.stats.leisure) accumulated.leisure = (accumulated.leisure || 0) + card.stats.leisure * multiplier;
    });

    onConfirm(selected, accumulated);
  };

  const isReady = selectedIds.length > 0;

  return (
    <div className="modal-overlay z-[100]">
      <div className="glass-panel w-full max-w-2xl p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/40 shadow-2xl animate-fadeIn">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Layers className="w-4 h-4" /> 経験イベント（4Lカード抽出）
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            {generation.name}
          </h2>
          <p className="text-xs text-slate-300 flex items-center justify-center gap-1">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            カードをタップして獲得したい経験を <strong className="text-amber-300 font-extrabold mx-1">{selectCount} 枚</strong> 選択してください。
            {multiplier > 1 && <span className="text-amber-400 font-bold ml-1"> (✨獲得効果 {multiplier} 倍！)</span>}
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
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'border-indigo-400 bg-indigo-950/70 ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.01]'
                    : 'border-slate-800 bg-slate-900/50 opacity-60 hover:opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {card.deck} Deck
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-base mt-2 text-slate-100">{card.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{card.description}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-extrabold">
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
          className={`w-full py-4 rounded-xl font-extrabold text-base text-white flex items-center justify-center gap-2 shadow-xl transition-all duration-200 ${
            isReady
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-indigo-600/30 active:scale-98'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          選択した経験を獲得して進む ({selectedIds.length}/{selectCount})
        </button>
      </div>
    </div>
  );
};
