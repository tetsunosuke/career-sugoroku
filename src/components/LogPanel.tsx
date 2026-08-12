import React, { useRef, useEffect } from 'react';
import type { GameLog } from '../types/game';
import { History, Activity } from 'lucide-react';

interface Props {
  logs: GameLog[];
}

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

      <div ref={scrollRef} className="max-h-40 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
        {logs.map((log, index) => {
          let badgeColor = 'text-slate-400 bg-slate-800';
          if (log.type === 'move') badgeColor = 'text-indigo-300 bg-indigo-950/60 border border-indigo-500/30';
          if (log.type === 'card') badgeColor = 'text-pink-300 bg-pink-950/60 border border-pink-500/30';
          if (log.type === 'skill') badgeColor = 'text-amber-300 bg-amber-950/60 border border-amber-500/30';
          if (log.type === 'project') badgeColor = 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/30';

          return (
            <div key={index} className="flex items-start gap-2 text-slate-300 leading-relaxed">
              <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{log.timestamp}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] shrink-0 font-bold ${badgeColor}`}>
                T{log.turn}
              </span>
              <span className="text-slate-200">{log.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
