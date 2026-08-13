import React, { useState } from 'react';
import type { Character, SkillType, CourseConfig } from '../types/game';
import { computeSkillPoints } from '../logic/gameEngine';
import { Brain, Users, Zap, Compass, Sparkles, Plus, Minus, CheckCircle2 } from 'lucide-react';

interface Props {
  character: Character;
  course: CourseConfig;
  baseSkillPt: number;
  forcedSkill?: SkillType;
  onAllocate: (allocatedMap: Record<SkillType, number>) => void;
}

export const SkillAllocationModal: React.FC<Props> = ({
  character,
  course,
  baseSkillPt,
  forcedSkill,
  onAllocate
}) => {
  // 各スキルへの割り振り Learn pt
  const [allocated, setAllocated] = useState<Record<SkillType, number>>({
    interpersonal: forcedSkill === 'interpersonal' ? baseSkillPt : 0,
    thinking: forcedSkill === 'thinking' ? baseSkillPt : 0,
    execution: forcedSkill === 'execution' ? baseSkillPt : 0,
    flexibility: forcedSkill === 'flexibility' ? baseSkillPt : 0
  });

  const totalUsed = Object.values(allocated).reduce((a, b) => a + b, 0);
  const remainingPt = Math.max(0, baseSkillPt - totalUsed);

  const skillsList: { key: SkillType; label: string; icon: any; color: string }[] = [
    { key: 'interpersonal', label: '対人 (コミット)', icon: Users, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { key: 'thinking', label: '思考 (ロジック)', icon: Brain, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { key: 'execution', label: '実行 (ドライブ)', icon: Zap, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { key: 'flexibility', label: '柔軟 (アザイル)', icon: Compass, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' }
  ];

  const handleIncrement = (sk: SkillType) => {
    if (forcedSkill) return;
    if (remainingPt <= 0) return;
    setAllocated((prev) => ({ ...prev, [sk]: prev[sk] + 1 }));
  };

  const handleDecrement = (sk: SkillType) => {
    if (forcedSkill) return;
    if (allocated[sk] <= 0) return;
    setAllocated((prev) => ({ ...prev, [sk]: prev[sk] - 1 }));
  };

  const handleConfirm = () => {
    onAllocate(allocated);
  };

  return (
    <div className="modal-overlay z-[100]">
      <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-5 text-slate-100 border-indigo-500/40 shadow-2xl animate-fadeIn custom-scrollbar max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" /> 意味づけフェーズ (スキル配分)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            学び(Learn)をポータブルスキルへ配分
          </h2>
          <p className="text-xs text-slate-300">
            獲得した <strong className="text-purple-300 font-extrabold text-sm">{baseSkillPt} pt</strong> の Learn を各スキルへ自由に割り振れます。
          </p>
        </div>

        {/* 強制割り振り警告 */}
        {forcedSkill && (
          <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs text-center font-semibold">
            ⚠️ 部署異動イベントのため、獲得ptは「柔軟」スキルに強制割り振りされます。
          </div>
        )}

        {/* 手元残pt表示メーター */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/40 flex items-center justify-between shadow-inner">
          <span className="text-xs font-bold text-slate-300">未配分の Learn ポイント:</span>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-black ${remainingPt > 0 ? 'text-amber-300 animate-pulse' : 'text-emerald-400'}`}>
              {remainingPt}
            </span>
            <span className="text-xs text-slate-400">/ {baseSkillPt} pt</span>
          </div>
        </div>

        {/* 4スキル割り振りコントロール一覧 */}
        <div className="space-y-2.5">
          {skillsList.map((sk) => {
            const isFavored = character.favoredSkill === sk.key;
            const currentAlloc = allocated[sk.key];
            const finalGained = currentAlloc > 0 ? computeSkillPoints(character, sk.key, currentAlloc, course) : 0;
            const IconComp = sk.icon;

            return (
              <div
                key={sk.key}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  currentAlloc > 0
                    ? 'border-indigo-500/60 bg-indigo-950/50 shadow-md'
                    : 'border-slate-800 bg-slate-900/40 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${sk.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-slate-100">{sk.label}</span>
                      {isFavored && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          ⭐ 得意(+1pt)
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-indigo-300 mt-0.5">
                      配分: <strong className="text-white">{currentAlloc} pt</strong>
                      {currentAlloc > 0 && (
                        <span className="text-emerald-300 font-bold ml-1.5">
                          ➡️ 最終獲得 +{finalGained} pt
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 加減ボタン */}
                {!forcedSkill && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(sk.key)}
                      disabled={currentAlloc <= 0}
                      className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono font-bold text-base w-5 text-center">{currentAlloc}</span>
                    <button
                      onClick={() => handleIncrement(sk.key)}
                      disabled={remainingPt <= 0}
                      className="p-1.5 rounded-lg border border-indigo-500/50 bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 決定ボタン */}
        <button
          onClick={handleConfirm}
          disabled={remainingPt > 0}
          className={`w-full py-3.5 rounded-xl font-extrabold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
            remainingPt === 0
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white cursor-pointer shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          {remainingPt === 0 ? 'この配分でスキルを確定する' : `あと ${remainingPt} pt 割り振ってください`}
        </button>
      </div>
    </div>
  );
};
