import React from 'react';
import type { BoardTile } from '../types/game';
import { BOARD_TILES } from '../data/boards';
import { Flag, Compass, UserCheck, HelpCircle, Lock } from 'lucide-react';

interface Props {
  currentPosition: number;
}

export const Board: React.FC<Props> = ({ currentPosition }) => {
  return (
    <div className="glass-panel p-5 space-y-4 border-slate-700/50">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" /> キャリアすごろく盤面 (12マス)
        </h2>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          現在位置: <strong className="text-indigo-300">マス {currentPosition}</strong> / 12
        </div>
      </div>

      {/* 盤面パス表示 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {BOARD_TILES.map((tile) => {
          const isCurrent = tile.id === currentPosition;
          const isVisited = tile.id < currentPosition;
          const isRevealed = tile.id <= currentPosition; // 到着済み or 現在地
          const isGoal = tile.id === 12;
          const isNextFew = tile.id > currentPosition && tile.id <= currentPosition + 3;

          // --- 未到達マス: 裏面表示 ---
          if (!isRevealed) {
            return (
              <div
                key={tile.id}
                className={`relative p-3.5 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center min-h-[120px] ${
                  isGoal
                    ? 'border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-slate-900/80'
                    : isNextFew
                    ? 'border-slate-700/80 bg-slate-900/60'
                    : 'border-slate-800/50 bg-slate-900/30 opacity-50'
                }`}
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-600">#{tile.id}</span>
                  {isGoal ? (
                    <>
                      <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <Flag className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-400/70 uppercase tracking-widest">GOAL</span>
                    </>
                  ) : (
                    <>
                      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                        isNextFew
                          ? 'bg-indigo-500/10 border border-indigo-500/20'
                          : 'bg-slate-800/50 border border-slate-700/30'
                      }`}>
                        <HelpCircle className={`w-5 h-5 ${isNextFew ? 'text-indigo-400/60' : 'text-slate-700'}`} />
                      </div>
                      <span className={`text-[10px] font-bold tracking-wider ${
                        isNextFew ? 'text-slate-500' : 'text-slate-700'
                      }`}>
                        {isNextFew ? '次のエリア…' : '未踏'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          }

          // --- 到達済みマス: 表面表示 ---
          let categoryBadge = 'bg-slate-700/50 text-slate-300';
          if (tile.category === '仕事') categoryBadge = 'bg-orange-500/20 text-orange-300 border-orange-500/30';
          if (tile.category === '学び') categoryBadge = 'bg-purple-500/20 text-purple-300 border-purple-500/30';
          if (tile.category === 'ライフ') categoryBadge = 'bg-pink-500/20 text-pink-300 border-pink-500/30';
          if (tile.category === '複合') categoryBadge = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
          if (tile.category === '環境') categoryBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
          if (tile.category === '対人') categoryBadge = 'bg-teal-500/20 text-teal-300 border-teal-500/30';

          return (
            <div
              key={tile.id}
              className={`relative p-3.5 rounded-xl border transition-all duration-500 flex flex-col justify-between min-h-[120px] ${
                isCurrent
                  ? 'border-indigo-400 bg-indigo-950/60 ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.02] z-10 animate-tileReveal'
                  : 'border-slate-700/60 bg-slate-900/50 opacity-75'
              }`}
            >
              {/* マス番号・カテゴリバッジ */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-400">#{tile.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${categoryBadge}`}>
                  {tile.category}
                </span>
              </div>

              {/* マス名 */}
              <div className="my-2">
                <h4 className="font-bold text-sm text-slate-100 leading-snug">
                  {tile.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {tile.effectDescription}
                </p>
              </div>

              {/* フッター */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>
                  {tile.skillPt > 0 ? `+${tile.skillPt} Skill pt` : tile.id === 12 ? '直4L個' : ''}
                </span>
                {tile.id === 12 && (
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5" /> GOAL
                  </span>
                )}
              </div>

              {/* プレイヤー駒 */}
              {isCurrent && (
                <div className="absolute -top-2.5 -right-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> YOU
                </div>
              )}

              {/* 新着バッジ (現在地のマス) */}
              {isCurrent && (
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-green-500 text-white text-[8px] font-bold flex items-center justify-center shadow-md animate-bounce">
                  ✨
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 凡例 */}
      <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 pt-1">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-indigo-500/20 border border-indigo-500/30 inline-block"></span> 現在地
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700 inline-block"></span> 通過済み
        </span>
        <span className="flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-slate-600" /> 未踏エリア
        </span>
      </div>
    </div>
  );
};
