import React, { useState } from 'react';
import type { Card4L, GenerationConfig, FourLStats } from '../types/game';
import { Sparkles, Layers, ArrowRight, Briefcase, BookOpen, Heart, Smile, CheckCircle2 } from 'lucide-react';

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
  // 実質採用可能枚数（ドロー数より要求数が多い場合はドロー数に合わせる）
  const requiredCount = Math.min(selectCount, drawnCards.length);

  // 初期選択インデックス (0 〜 requiredCount - 1)
  const [selectedIndices, setSelectedIndices] = useState<number[]>(() =>
    Array.from({ length: requiredCount }, (_, i) => i)
  );

  const toggleSelectCard = (index: number) => {
    if (drawnCards.length <= requiredCount) return; // 全選択が強制の場合はタップ変更不要

    if (selectedIndices.includes(index)) {
      setSelectedIndices((prev) => prev.filter((i) => i !== index));
    } else {
      if (selectedIndices.length < requiredCount) {
        setSelectedIndices((prev) => [...prev, index]);
      } else {
        // すでに上限枚数に達している場合は古いのを外して新しく選択
        setSelectedIndices((prev) => [...prev.slice(1), index]);
      }
    }
  };

  const selectedCards = selectedIndices.map((i) => drawnCards[i]).filter(Boolean);

  // 選択されたカードのみから 4L スコアを累積計算
  const accumulated: Partial<FourLStats> = { labor: 0, learn: 0, love: 0, leisure: 0 };
  selectedCards.forEach((card) => {
    if (card.stats.labor) accumulated.labor = (accumulated.labor || 0) + card.stats.labor * multiplier;
    if (card.stats.learn) accumulated.learn = (accumulated.learn || 0) + card.stats.learn * multiplier;
    if (card.stats.love) accumulated.love = (accumulated.love || 0) + card.stats.love * multiplier;
    if (card.stats.leisure) accumulated.leisure = (accumulated.leisure || 0) + card.stats.leisure * multiplier;
  });

  const isReady = selectedIndices.length === requiredCount;

  const handleConfirm = () => {
    if (isReady) {
      onConfirm(selectedCards, accumulated);
    }
  };

  const getStatLabel = (stats: Partial<FourLStats>) => {
    const parts: string[] = [];
    if (stats.labor) parts.push(`Labor +${stats.labor * multiplier}`);
    if (stats.learn) parts.push(`Learn +${stats.learn * multiplier}`);
    if (stats.love) parts.push(`Love +${stats.love * multiplier}`);
    if (stats.leisure) parts.push(`Leisure +${stats.leisure * multiplier}`);
    return parts.join(' / ');
  };

  return (
    <div className="modal-overlay z-[100]">
      <div className="glass-panel w-full max-w-xl p-6 md:p-8 space-y-5 text-slate-100 border-indigo-500/40 shadow-2xl animate-fadeIn text-center custom-scrollbar max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Layers className="w-4 h-4" /> 経験カードの選択
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {generation.name}
          </h2>
          <p className="text-xs text-slate-300">
            ドローした <strong className="text-amber-300">{drawnCards.length} 枚</strong> の中から、人生に採用するカードを <strong className="text-emerald-300 text-sm">{requiredCount} 枚</strong> タップして選択してください。
            {multiplier > 1 && <span className="text-amber-400 font-bold ml-1"> (✨獲得効果 {multiplier} 倍！)</span>}
          </p>
        </div>

        {/* ドローカード選択リスト */}
        <div className="space-y-2.5">
          {drawnCards.map((card, idx) => {
            const isSelected = selectedIndices.includes(idx);
            return (
              <div
                key={card.id || idx}
                onClick={() => toggleSelectCard(idx)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/50 shadow-lg'
                    : 'border-slate-800 bg-slate-900/40 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-100">
                      カード #{idx + 1}
                    </div>
                    <div className="text-xs font-bold text-amber-300 mt-0.5">
                      {getStatLabel(card.stats)}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-xs font-black text-emerald-300 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30">
                    採用選択中
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* 獲得4Lスコア合計プレビュー */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/50 shadow-xl space-y-3 relative overflow-hidden">
          <div className="text-[11px] text-indigo-300 font-extrabold uppercase tracking-widest block">
            🎯 選択したカードから獲得する 4L スコア合計
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Labor */}
            <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.labor
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40'
            }`}>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-orange-400" />
                <span className="font-extrabold text-xs">Labor</span>
              </div>
              <span className="text-xl font-black">{accumulated.labor ? `+${accumulated.labor}` : '0'}</span>
            </div>

            {/* Learn */}
            <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.learn
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40'
            }`}>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="font-extrabold text-xs">Learn</span>
              </div>
              <span className="text-xl font-black">{accumulated.learn ? `+${accumulated.learn}` : '0'}</span>
            </div>

            {/* Love */}
            <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.love
                ? 'bg-pink-500/20 border-pink-500/50 text-pink-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40'
            }`}>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="font-extrabold text-xs">Love</span>
              </div>
              <span className="text-xl font-black">{accumulated.love ? `+${accumulated.love}` : '0'}</span>
            </div>

            {/* Leisure */}
            <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
              accumulated.leisure
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40'
            }`}>
              <div className="flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-emerald-400" />
                <span className="font-extrabold text-xs">Leisure</span>
              </div>
              <span className="text-xl font-black">{accumulated.leisure ? `+${accumulated.leisure}` : '0'}</span>
            </div>
          </div>
        </div>

        {/* 決定ボタン */}
        <button
          onClick={handleConfirm}
          disabled={!isReady}
          className={`w-full py-3.5 rounded-xl font-extrabold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
            isReady
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white cursor-pointer shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          {isReady ? '選択したカードを確定して進む' : `カードを あと ${requiredCount - selectedIndices.length} 枚 選択してください`}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
