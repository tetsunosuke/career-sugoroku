import React, { useState } from 'react';
import type { Character, SkillType, CourseConfig } from '../types/game';
import { computeSkillPoints } from '../logic/gameEngine';
import { Brain, Users, Zap, Compass, Sparkles } from 'lucide-react';

interface Props {
  character: Character;
  course: CourseConfig;
  baseSkillPt: number;
  forcedSkill?: SkillType;
  onAllocate: (allocatedSkill: SkillType, finalAmount: number) => void;
}

export const SkillAllocationModal: React.FC<Props> = ({
  character,
  course,
  baseSkillPt,
  forcedSkill,
  onAllocate
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillType>(forcedSkill || 'thinking');

  const skillsList: { key: SkillType; label: string; icon: any; color: string }[] = [
    { key: 'interpersonal', label: '対人 (コミット)', icon: Users, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { key: 'thinking', label: '思考 (ロジック)', icon: Brain, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { key: 'execution', label: '実行 (ドライブ)', icon: Zap, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { key: 'flexibility', label: '柔軟 (アザイル)', icon: Compass, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' }
  ];

  const currentFinalPt = computeSkillPoints(character, selectedSkill, baseSkillPt, course);

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/30">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4" /> 意味づけフェーズ (スキル変換)
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            経験をポータブルスキルへ変換
          </h2>
          <p className="text-xs text-slate-400">
            獲得した経験ptを、どのポータブルスキルとして意味づけるか選択します。
          </p>
        </div>

        {forcedSkill && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-center font-semibold">
            ⚠️ 「部署異動」環境イベントのため、獲得ptは「柔軟」に強制割り振りされます。
          </div>
        )}

        {/* スキル選択グリッド */}
        <div className="grid grid-cols-2 gap-3">
          {skillsList.map((sk) => {
            const isSelected = selectedSkill === sk.key;
            const isFavored = character.favoredSkill === sk.key;
            const computedVal = computeSkillPoints(character, sk.key, baseSkillPt, course);
            const IconComp = sk.icon;

            if (forcedSkill && forcedSkill !== sk.key) return null;

            return (
              <div
                key={sk.key}
                onClick={() => !forcedSkill && setSelectedSkill(sk.key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/60 ring-2 ring-indigo-500/50'
                    : 'border-slate-800 bg-slate-900/40 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${sk.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  {isFavored && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      1.5倍得点
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <h4 className="font-bold text-sm text-slate-100">{sk.label}</h4>
                  <div className="text-xl font-black text-indigo-300 mt-1">
                    +{computedVal} <span className="text-xs font-normal text-slate-400">pt獲得</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => onAllocate(selectedSkill, currentFinalPt)}
          className="w-full py-3.5 rounded-xl font-extrabold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 transition-all"
        >
          {currentFinalPt} pt を確定してスキルに加算
        </button>
      </div>
    </div>
  );
};
