import React from 'react';
import type { CoOpProject, PortableSkills, Character } from '../types/game';
import { canCompleteProject } from '../logic/gameEngine';
import { Target, CheckCircle2, Award, Users } from 'lucide-react';

interface Props {
  projects: CoOpProject[];
  skills: PortableSkills;
  character: Character;
  onComplete: (project: CoOpProject) => void;
}

export const ProjectsPanel: React.FC<Props> = ({
  projects,
  skills,
  character,
  onComplete
}) => {
  return (
    <div className="glass-panel p-5 space-y-4 border-slate-700/50">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" /> 協力プロジェクト (中間ゴール)
        </h3>
        <span className="text-xs text-slate-400">蓄積スキルで共創クリア！</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {projects.map((proj) => {
          const isSatisfied = canCompleteProject(skills, proj);

          return (
            <div
              key={proj.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                proj.isCompleted
                  ? 'border-emerald-500/40 bg-emerald-950/20 opacity-60'
                  : isSatisfied
                  ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500/50 shadow-lg'
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-slate-100">{proj.title}</h4>
                  {proj.isCompleted && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 達成済
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">{proj.description}</p>

                {/* 要求スキル一覧 */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">要求ポータブルスキル</span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {proj.reqSkills.interpersonal && (
                      <span className={`px-1.5 py-0.5 rounded font-semibold ${skills.interpersonal >= proj.reqSkills.interpersonal ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'}`}>
                        対人 {skills.interpersonal}/{proj.reqSkills.interpersonal}
                      </span>
                    )}
                    {proj.reqSkills.thinking && (
                      <span className={`px-1.5 py-0.5 rounded font-semibold ${skills.thinking >= proj.reqSkills.thinking ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                        思考 {skills.thinking}/{proj.reqSkills.thinking}
                      </span>
                    )}
                    {proj.reqSkills.execution && (
                      <span className={`px-1.5 py-0.5 rounded font-semibold ${skills.execution >= proj.reqSkills.execution ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                        実行 {skills.execution}/{proj.reqSkills.execution}
                      </span>
                    )}
                    {proj.reqSkills.flexibility && (
                      <span className={`px-1.5 py-0.5 rounded font-semibold ${skills.flexibility >= proj.reqSkills.flexibility ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-400'}`}>
                        柔軟 {skills.flexibility}/{proj.reqSkills.flexibility}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 達成ボタン & 報酬 */}
              <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[10px] text-slate-400">
                  <span className="block font-bold text-indigo-300">達成報酬</span>
                  <div className="flex gap-1.5 text-slate-200">
                    {proj.reward4L.labor && <span>Labor+{proj.reward4L.labor}</span>}
                    {proj.reward4L.learn && <span>Learn+{proj.reward4L.learn}</span>}
                    {proj.reward4L.love && <span>Love+{proj.reward4L.love}</span>}
                    {proj.reward4L.leisure && <span>Leisure+{proj.reward4L.leisure}</span>}
                    {character.id === 'CHAR_E' && <span className="text-amber-300 font-bold">(+1特権)</span>}
                  </div>
                </div>

                {!proj.isCompleted && (
                  <button
                    onClick={() => onComplete(proj)}
                    disabled={!isSatisfied}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isSatisfied
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    達成可能！
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
