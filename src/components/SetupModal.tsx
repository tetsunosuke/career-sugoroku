import React, { useState } from 'react';
import type { Character, GenerationConfig, CourseConfig } from '../types/game';
import { CHARACTERS, GENERATIONS, COURSES } from '../data/characters';
import { User, Calendar, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  onStart: (char: Character, gen: GenerationConfig, course: CourseConfig) => void;
}

export const SetupModal: React.FC<Props> = ({ onStart }) => {
  const [selectedChar, setSelectedChar] = useState<Character>(CHARACTERS[0]);
  const [selectedGen, setSelectedGen] = useState<GenerationConfig>(GENERATIONS[0]);
  const [selectedCourse, setSelectedCourse] = useState<CourseConfig>(COURSES[0]);

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-8 text-slate-100 border-indigo-500/30">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">
            <Sparkles className="w-4 h-4" /> 自律型キャリアシミュレーション
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            『キャリアすごろく』プロトタイプ
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            初期キャラクター・年代・所属コースを選択して、自分だけのキャリア探求の旅を始めましょう。
          </p>
        </div>

        {/* 1. キャラクター選択 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-300">
            <User className="w-5 h-5" /> 1. RIASECキャラクターを選択
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHARACTERS.map((char) => {
              const isSelected = selectedChar.id === char.id;
              return (
                <div
                  key={char.id}
                  onClick={() => setSelectedChar(char)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 glass-panel-interactive ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {char.riasecType}
                      </span>
                      <h3 className="text-lg font-bold mt-1">{char.name}</h3>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">{char.description}</p>
                  <div className="mt-3 pt-2 border-t border-slate-700/50 text-xs font-medium text-amber-300/90">
                    ✨ 特権: {char.perkText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. スタート年代選択 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-purple-300">
            <Calendar className="w-5 h-5" /> 2. スタート年代を選択
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GENERATIONS.map((gen) => {
              const isSelected = selectedGen.id === gen.id;
              return (
                <div
                  key={gen.id}
                  onClick={() => setSelectedGen(gen)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 glass-panel-interactive ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/40 ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/10'
                      : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base">{gen.name}</h3>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{gen.drawRuleText}</p>
                  <div className="mt-3 text-xs text-slate-400 flex gap-2">
                    <span>Labor: {gen.initial4L.labor}</span>
                    <span>Learn: {gen.initial4L.learn}</span>
                    <span>Love: {gen.initial4L.love}</span>
                    <span>Leisure: {gen.initial4L.leisure}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. コース選択 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-pink-300">
            <Briefcase className="w-5 h-5" /> 3. 所属コースを選択
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSES.map((course) => {
              const isSelected = selectedCourse.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 glass-panel-interactive ${
                    isSelected
                      ? 'border-pink-500 bg-pink-950/40 ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/10'
                      : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base">{course.name}</h3>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-400" />}
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{course.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* スタートボタン */}
        <div className="pt-4 text-center">
          <button
            onClick={() => onStart(selectedChar, selectedGen, selectedCourse)}
            className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            キャリアシミュレーションを開始する 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
