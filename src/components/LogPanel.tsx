import React, { useRef, useEffect } from 'react';
import type { GameLog } from '../types/game';
import { History } from 'lucide-react';

interface Props {
  logs: GameLog[];
}

const dotColors: Record<GameLog['type'], string> = {
  move: 'bg-indigo-500',
  card: 'bg-pink-500',
  skill: 'bg-amber-500',
  project: 'bg-emerald-500',
  info: 'bg-slate-500',
  warn: 'bg-red-500',
};

const emojiPrefixes: Record<GameLog['type'], string> = {
  move: '🎲',
  card: '🃏',
  skill: '⚡',
  project: '🎉',
  info: 'ℹ️',
  warn: '⚠️',
};

const badgeColors: Record<GameLog['type'], string> = {
  move: 'text-indigo-300 bg-indigo-950/60 border border-indigo-500/30',
  card: 'text-pink-300 bg-pink-950/60 border border-pink-500/30',
  skill: 'text-amber-300 bg-amber-950/60 border border-amber-500/30',
  project: 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/30',
  info: 'text-slate-400 bg-slate-800 border border-slate-600/30',
  warn: 'text-red-300 bg-red-950/60 border border-red-500/30',
};

export const LogPanel: React.FC<Props> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-panel p-4 space-y-3 border-slate-700/50">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <History className="w-4 h-4 text-indigo-400" /> キャリアログ・成長の記録
        </h3>
        <span className="text-[10px] text-slate-500">{logs.length} 件のイベント</span>
      </div>

      <div ref={scrollRef} className="max-h-60 overflow-y-auto pr-1 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="text-slate-500 text-xs py-2 text-center">ログはありません</div>
        ) : (
          <div className="relative pl-6 space-y-3 py-1">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-700/60" />
            {logs.map((log, index) => {
              const dotColor = dotColors[log.type] || 'bg-slate-500';
              const emoji = emojiPrefixes[log.type] || 'ℹ️';
              const badgeColor = badgeColors[log.type] || 'text-slate-400 bg-slate-800 border border-slate-600/30';

              return (
                <div key={index} className="relative flex items-start gap-2 text-slate-300 leading-relaxed">
                  <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ${dotColor} ring-4 ring-slate-900/90 shrink-0`} />
                  <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{log.timestamp}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] shrink-0 font-bold ${badgeColor}`}>
                    T{log.turn}
                  </span>
                  <span className="text-slate-200">
                    <span className="mr-1.5">{emoji}</span>
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
