import React, { useState } from 'react';
import { Dices, Play } from 'lucide-react';

interface Props {
  onRoll: (diceValue: number) => void;
  disabled: boolean;
}

export const DiceRoller: React.FC<Props> = ({ onRoll, disabled }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [lastValue, setLastValue] = useState<number | null>(null);

  const handleRoll = () => {
    if (disabled || isRolling) return;
    setIsRolling(true);

    let rollCount = 0;
    const interval = setInterval(() => {
      setLastValue(Math.floor(Math.random() * 3) + 1);
      rollCount++;
      if (rollCount >= 10) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 3) + 1;
        setLastValue(finalVal);
        setIsRolling(false);
        onRoll(finalVal);
      }
    }, 60);
  };

  return (
    <div className="glass-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-indigo-500/30">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center font-black text-2xl shadow-lg border border-indigo-400/40 ${
            isRolling ? 'rolling' : ''
          }`}
        >
          {lastValue !== null ? lastValue : <Dices className="w-7 h-7" />}
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-100">移動ダイス (出目 1 〜 3)</h3>
          <p className="text-xs text-slate-400">ダイスを振ってキャリアの歩みを進めます。</p>
        </div>
      </div>

      <button
        onClick={handleRoll}
        disabled={disabled || isRolling}
        className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-base flex items-center justify-center gap-2 text-white shadow-lg transition-all duration-200 ${
          disabled || isRolling
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-indigo-600/30 hover:scale-[1.02] active:scale-95'
        }`}
      >
        <Play className="w-5 h-5 fill-current" />
        {isRolling ? 'ダイス回転中...' : 'ダイスを振る！'}
      </button>
    </div>
  );
};
