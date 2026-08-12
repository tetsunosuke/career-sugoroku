import React from 'react';
import type { PlayerState } from '../types/game';
import { Briefcase, BookOpen, Heart, Smile, Users, Brain, Zap, Compass, UserCheck } from 'lucide-react';

interface Props {
  player: PlayerState;
  turn: number;
}

export const StatusPanel: React.FC<Props> = ({ player, turn }) => {
  const { character, generation, course, stats4L, skills } = player;

  const fourLConfig = [
    { key: 'labor', label: 'Labor (仕事)', value: stats4L.labor, icon: Briefcase, color: 'var(--color-labor)', bg: 'bg-orange-500/20', text: 'text-orange-400' },
    { key: 'learn', label: 'Learn (学び)', value: stats4L.learn, icon: BookOpen, color: 'var(--color-learn)', bg: 'bg-purple-500/20', text: 'text-purple-400' },
    { key: 'love', label: 'Love (関係)', value: stats4L.love, icon: Heart, color: 'var(--color-love)', bg: 'bg-pink-500/20', text: 'text-pink-400' },
    { key: 'leisure', label: 'Leisure (余暇)', value: stats4L.leisure, icon: Smile, color: 'var(--color-leisure)', bg: 'bg-emerald-500/20', text: 'text-emerald-400' }
  ];

  const skillConfig = [
    { key: 'interpersonal', label: '対人 (コミット)', value: skills.interpersonal, icon: Users, color: 'var(--color-interpersonal)', isFavored: character.favoredSkill === 'interpersonal' },
    { key: 'thinking', label: '思考 (ロジック)', value: skills.thinking, icon: Brain, color: 'var(--color-thinking)', isFavored: character.favoredSkill === 'thinking' },
    { key: 'execution', label: '実行 (ドライブ)', value: skills.execution, icon: Zap, color: 'var(--color-execution)', isFavored: character.favoredSkill === 'execution' },
    { key: 'flexibility', label: '柔軟 (アザイル)', value: skills.flexibility, icon: Compass, color: 'var(--color-flexibility)', isFavored: character.favoredSkill === 'flexibility' }
  ];

  return (
    <div className="glass-panel p-5 space-y-6 text-slate-100 border-slate-700/50">
      {/* プレイヤー基本概要 */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src={character.avatarUrl}
            alt={character.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-300 to-white bg-clip-text text-transparent">
                {character.name}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {character.riasecType}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {generation.name} • {course.name}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider block">現在の経過</span>
          <span className="text-lg font-bold text-indigo-400">Turn {turn}</span>
        </div>
      </div>

      {/* 4L パラメーター */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-indigo-400" /> 4L 人生パラメータ
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {fourLConfig.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.key} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${item.bg} ${item.text}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-300 block">{item.label}</span>
                    <span className="text-lg font-extrabold text-white">{item.value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ポータブルスキル */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>ポータブルスキル (汎用能力)</span>
          <span className="text-[10px] text-amber-300/80 font-normal">✨=得点1.5倍補正対象</span>
        </h3>
        <div className="space-y-2.5">
          {skillConfig.map((sk) => {
            const IconComp = sk.icon;
            const maxVal = 10;
            const percentage = Math.min(100, (sk.value / maxVal) * 100);

            return (
              <div key={sk.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-slate-200">
                    <IconComp className="w-3.5 h-3.5" style={{ color: sk.color }} />
                    {sk.label}
                    {sk.isFavored && <span className="text-amber-400">✨</span>}
                  </span>
                  <span className="font-bold text-slate-100">{sk.value} pt</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: sk.color,
                      boxShadow: `0 0 8px ${sk.color}`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
