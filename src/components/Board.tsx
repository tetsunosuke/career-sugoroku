import React from 'react';
import type { BoardTile } from '../types/game';
import { BOARD_TILES } from '../data/boards';
import { Flag, Compass, UserCheck, HelpCircle, Lock } from 'lucide-react';

interface Props {
  currentPosition: number;
}

export const Board: React.FC<Props> = ({ currentPosition }) => {
  // S字（ジグザグ）レイアウトの順序定義
  // 4列表示時:
  // 行1 (左→右): #0,  #1,  #2,  #3  (右端で下へ)
  // 行2 (右→左): #7,  #6,  #5,  #4  (#3の直下が#4!) (左端で下へ)
  // 行3 (左→右): #8,  #9, #10, #11  (#7の直下が#8!) (右端で下へ)
  // 行4:         #12 (GOAL)
  const rows = [
    { dir: 'right', tileIds: [0, 1, 2, 3] },
    { dir: 'left', tileIds: [7, 6, 5, 4] },
    { dir: 'right', tileIds: [8, 9, 10, 11] },
    { dir: 'goal', tileIds: [12] }
  ];

  return (
    <div className="glass-panel p-5 sm:p-6 space-y-5 border-slate-700/50 relative overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" /> キャリア・パッチワーク・クエスト盤面 (S字進行マップ)
        </h2>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          現在地: <strong className="text-indigo-300">マス #{currentPosition}</strong> / 12
        </div>
      </div>

      {/* S字ジグザグ盤面マップ */}
      <div className="space-y-4">
        {rows.map((row, rIdx) => {
          const isRight = row.dir === 'right';
          const isGoalRow = row.dir === 'goal';

          return (
            <div key={rIdx} className="space-y-3">
              {/* 各行のグリッド */}
              <div className={`grid ${isGoalRow ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-2 sm:grid-cols-4'} gap-3 sm:gap-4 relative`}>
                {row.tileIds.map((tileId, idx) => {
                  const tile = BOARD_TILES.find((t) => t.id === tileId);
                  if (!tile) return null;

                  const isCurrent = tile.id === currentPosition;
                  const isVisited = tile.id < currentPosition;
                  const isRevealed = tile.id <= currentPosition;
                  const isGoal = tile.id === 12;
                  const isNextFew = tile.id > currentPosition && tile.id <= currentPosition + 2;

                  // 矢印判定
                  let arrowDirection: 'right' | 'left' | 'down' | null = null;
                  if (!isGoal) {
                    if (isRight) {
                      arrowDirection = idx < row.tileIds.length - 1 ? 'right' : null;
                    } else {
                      arrowDirection = idx < row.tileIds.length - 1 ? 'left' : null;
                    }
                  }

                  let categoryBadge = 'bg-slate-700/50 text-slate-300';
                  if (tile.category === '仕事') categoryBadge = 'bg-orange-500/20 text-orange-300 border-orange-500/30';
                  if (tile.category === '学び') categoryBadge = 'bg-purple-500/20 text-purple-300 border-purple-500/30';
                  if (tile.category === 'ライフ') categoryBadge = 'bg-pink-500/20 text-pink-300 border-pink-500/30';
                  if (tile.category === '複合') categoryBadge = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
                  if (tile.category === '環境') categoryBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                  if (tile.category === '対人') categoryBadge = 'bg-teal-500/20 text-teal-300 border-teal-500/30';

                  return (
                    <div key={tile.id} className="relative group">
                      {/* マス本体 */}
                      <div
                        className={`relative p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[130px] shadow-lg ${
                          isCurrent
                            ? 'border-indigo-400 bg-indigo-950/80 ring-4 ring-indigo-500/50 shadow-indigo-500/30 scale-[1.03] z-20 animate-pulse'
                            : isVisited
                            ? 'border-slate-700/80 bg-slate-900/70 opacity-90'
                            : isGoal
                            ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/40 to-slate-900/90'
                            : isNextFew
                            ? 'border-slate-700/60 bg-slate-900/50 opacity-80 hover:opacity-100'
                            : 'border-slate-800/40 bg-slate-900/30 opacity-50'
                        }`}
                      >
                        {/* 未到達マスの非公開裏面 */}
                        {!isRevealed ? (
                          <div className="text-center my-auto space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-slate-500">
                              <span className="font-extrabold text-slate-500">#{tile.id}</span>
                            </div>
                            {isGoal ? (
                              <div className="space-y-1">
                                <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                                  <Flag className="w-5 h-5 text-amber-400" />
                                </div>
                                <span className="text-[11px] font-black text-amber-400">GOAL マス</span>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                                  isNextFew ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-slate-800/50 border border-slate-700/30'
                                }`}>
                                  <HelpCircle className={`w-4 h-4 ${isNextFew ? 'text-indigo-400/60' : 'text-slate-700'}`} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 block">未到達</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          // 到達済み表面表示
                          <>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-extrabold text-indigo-300">#{tile.id}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${categoryBadge}`}>
                                {tile.category}
                              </span>
                            </div>

                            <div className="my-1.5">
                              <h4 className="font-bold text-xs sm:text-sm text-slate-100 leading-snug">
                                {tile.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                                {tile.effectDescription}
                              </p>
                              {tile.skillCondition && (
                                <div className="mt-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[9px] font-bold text-amber-300 truncate">
                                  ⚡ {tile.skillCondition.description}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                              <span>
                                {tile.skillPt > 0 ? `+${tile.skillPt} Skill pt` : tile.id === 12 ? '直4L個' : ''}
                              </span>
                              {tile.id === 12 && (
                                <span className="text-amber-400 font-bold flex items-center gap-1">
                                  <Flag className="w-3.5 h-3.5" /> GOAL
                                </span>
                              )}
                            </div>
                          </>
                        )}

                        {/* プレイヤー現在地コマ */}
                        {isCurrent && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1 z-30 animate-bounce">
                            <UserCheck className="w-3 h-3" /> YOU
                          </div>
                        )}
                      </div>

                      {/* マス間の横方向進行矢印 (➡️ または ⬅️) */}
                      {arrowDirection === 'right' && (
                        <div className="hidden sm:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-indigo-400/80 font-black text-sm drop-shadow pointer-events-none">
                          <span className={`${tile.id <= currentPosition ? 'text-indigo-400 animate-pulse' : 'text-slate-600'}`}>
                            ➡️
                          </span>
                        </div>
                      )}
                      {arrowDirection === 'left' && (
                        <div className="hidden sm:flex absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 text-indigo-400/80 font-black text-sm drop-shadow pointer-events-none">
                          <span className={`${tile.id <= currentPosition ? 'text-indigo-400 animate-pulse' : 'text-slate-600'}`}>
                            ⬅️
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 行の切り替わり（端から下へ伸ばす進行矢印 ⬇️） */}
              {rIdx < rows.length - 1 && (
                <div className={`flex ${isRight ? 'justify-end pr-8 sm:pr-12' : 'justify-start pl-8 sm:pl-12'} py-0.5`}>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-md">
                    <span>⬇️ 次の行へ折り返し</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 凡例 */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-indigo-500/40 border border-indigo-400 inline-block"></span> 現在地 (YOU)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700 inline-block"></span> 到達済みマス
        </span>
        <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
          ➡️ ⬅️ ⬇️ 進行ルート
        </span>
      </div>
    </div>
  );
};
