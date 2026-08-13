import React from 'react';
import type { BoardTile, PortableSkills, DeckType, ActionStance } from '../types/game';
import { Compass, Sparkles, Layers, ArrowRight, CheckCircle2, AlertCircle, Sun, Flame, Coffee } from 'lucide-react';

interface Props {
  tile: BoardTile;
  skills: PortableSkills;
  baseDrawCount: number;
  skillBonusApplied: boolean;
  paidLeaves: { used: number; max: number };
  onSelectStance: (stance: ActionStance) => void;
}

export const TileArrivalModal: React.FC<Props> = ({
  tile,
  skills,
  baseDrawCount,
  skillBonusApplied,
  paidLeaves,
  onSelectStance
}) => {
  const remainingLeaves = paidLeaves.max - paidLeaves.used;

  const getDeckName = (deck: DeckType | 'choice') => {
    if (deck === 'work') return '💼 仕事 (Labor) の山';
    if (deck === 'learn') return '📚 学び (Learn) の山';
    if (deck === 'life') return '💖 ライフの山';
    return '🌟 任意の山札 (選択可能)';
  };

  return (
    <div className="modal-overlay z-[100]">
      <div className="glass-panel w-full max-w-xl p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/40 shadow-2xl animate-fadeIn text-center custom-scrollbar max-h-[90vh] overflow-y-auto">
        {/* 到着ヘッダー */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Compass className="w-4 h-4 text-indigo-400" /> マス #{tile.id} に到着！
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sun className="w-3.5 h-3.5 text-emerald-400" /> 有休残: {remainingLeaves}/{paidLeaves.max} 回 {paidLeaves.used === 0 && <span className="text-amber-400 font-bold ml-1"> (※未消化)</span>}
          </div>
        </div>

        {/* マス目の出来事・状況説明 */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/80 to-slate-900/90 border-2 border-indigo-500/40 shadow-xl space-y-3.5 relative text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              {tile.category} エリア
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold">対象: {getDeckName(tile.deck)}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {tile.name}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {tile.effectDescription}
          </p>

          {/* スキル達成判定 */}
          {tile.skillCondition && (
            <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
              skillBonusApplied
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200 font-bold'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <span className="flex items-center gap-1.5">
                {skillBonusApplied ? <CheckCircle2 className="w-4 h-4 text-amber-400" /> : <AlertCircle className="w-4 h-4 text-slate-500" />}
                {tile.skillCondition.description}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 shrink-0">
                {skills[tile.skillCondition.skill]} pt
              </span>
            </div>
          )}
        </div>

        {/* アクションスタンス選択タイトル */}
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-indigo-300 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> この出来事にどう臨みますか？ (スタンスを選択)
          </h3>
          <p className="text-[11px] text-slate-400">あなたの選択によって体力・資金(CR)の変動や引けるカード数が変化します。</p>
        </div>

        {/* 3つの行動選択ボタン */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
          {/* 1. 引き受ける (通常) */}
          <button
            onClick={() => onSelectStance('normal')}
            className="p-4 rounded-xl border border-indigo-500/40 bg-slate-900/80 hover:bg-indigo-950/60 hover:border-indigo-400 transition-all space-y-2 group shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-indigo-300 group-hover:text-white flex items-center gap-1">
                💼 引き受ける
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">通常</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              標準的なスタンスで順当に対応します。
            </p>
            <div className="text-[10px] text-indigo-300 font-bold pt-1 border-t border-slate-800">
              🎴 ドロー: {baseDrawCount} 枚
            </div>
          </button>

          {/* 2. かなりがんばってみる (ハードワーク) */}
          <button
            onClick={() => onSelectStance('hardwork')}
            className="p-4 rounded-xl border border-amber-500/40 bg-slate-900/80 hover:bg-amber-950/60 hover:border-amber-400 transition-all space-y-2 group shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-amber-300 group-hover:text-white flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-400" /> かなりがんばる
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">挑戦</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              体力を消費して挑戦！資金(CR)獲得アップ＆ドロー枚数+1枚。
            </p>
            <div className="text-[10px] text-amber-300 font-bold pt-1 border-t border-slate-800 flex justify-between">
              <span>❤️ 体力-15 HP / 💰 +5 CR</span>
              <span>🎴 ドロー: {baseDrawCount + 1} 枚</span>
            </div>
          </button>

          {/* 3. 有給を使う (リフレッシュ) */}
          <button
            onClick={() => onSelectStance('vacation')}
            disabled={remainingLeaves <= 0}
            className={`p-4 rounded-xl border transition-all space-y-2 text-left shadow-md ${
              remainingLeaves > 0
                ? 'border-emerald-500/40 bg-slate-900/80 hover:bg-emerald-950/60 hover:border-emerald-400 group cursor-pointer'
                : 'border-slate-800 bg-slate-900/40 opacity-40 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-emerald-300 flex items-center gap-1">
                <Coffee className="w-4 h-4 text-emerald-400" /> 有給を使う
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                残{remainingLeaves}回
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              有休を1回消費して休養。体力を大幅回復（+20 HP）。
            </p>
            <div className="text-[10px] text-emerald-300 font-bold pt-1 border-t border-slate-800 flex justify-between">
              <span>❤️ 体力+20 HP 回復</span>
              <span>🎴 ドロー: 1 枚</span>
            </div>
          </button>
        </div>

        <p className="text-[10px] text-slate-500">
          ※労働基準法遵守のため、全12マス中最低1回の有給休暇の消化が必要です。
        </p>
      </div>
    </div>
  );
};
