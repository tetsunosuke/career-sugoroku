import React, { useState } from 'react';
import type { Character, GenerationConfig, CourseConfig } from '../types/game';
import { CHARACTERS, GENERATIONS, COURSES } from '../data/characters';
import { User, Calendar, Briefcase, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

type SetupStep = 'character' | 'generation' | 'course';

interface Props {
  onStart: (char: Character, gen: GenerationConfig, course: CourseConfig) => void;
}

export const SetupModal: React.FC<Props> = ({ onStart }) => {
  const [step, setStep] = useState<SetupStep>('character');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedGen, setSelectedGen] = useState<GenerationConfig | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseConfig | null>(null);

  const handleCharacterNext = () => {
    if (selectedChar) setStep('generation');
  };

  const handleGenerationNext = () => {
    if (selectedGen) setStep('course');
  };

  const handleCourseConfirm = () => {
    if (selectedChar && selectedGen && selectedCourse) {
      onStart(selectedChar, selectedGen, selectedCourse);
    }
  };

  // ステップインジケーター
  const StepIndicator = () => {
    const steps: { key: SetupStep; label: string; num: number }[] = [
      { key: 'character', label: 'キャラクター', num: 1 },
      { key: 'generation', label: '年代', num: 2 },
      { key: 'course', label: 'コース', num: 3 }
    ];
    const currentIdx = steps.findIndex(s => s.key === step);

    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((s, i) => (
          <React.Fragment key={s.key}>
            <div className={`flex items-center gap-1.5 ${i <= currentIdx ? 'text-indigo-300' : 'text-slate-600'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border-2 transition-all ${
                i < currentIdx
                  ? 'bg-indigo-500 border-indigo-400 text-white'
                  : i === currentIdx
                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                  : 'bg-slate-900 border-slate-700 text-slate-600'
              }`}>
                {i < currentIdx ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 rounded ${i < currentIdx ? 'bg-indigo-500' : 'bg-slate-800'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-8 text-slate-100 border-indigo-500/30">
        {/* 共通タイトル */}
        <div className="text-center space-y-2 mb-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">
            <Sparkles className="w-4 h-4" /> 自律型キャリアシミュレーション
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            『キャリアすごろく』
          </h1>
        </div>

        <StepIndicator />

        {/* ===== STEP 1: キャラクター選択 ===== */}
        {step === 'character' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-lg font-bold flex items-center justify-center gap-2 text-indigo-300">
                <User className="w-5 h-5" /> RIASECキャラクターを選んでください
              </h2>
              <p className="text-xs text-slate-400 mt-1">あなたの強みに合ったキャラクターを1人選択してください。</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHARACTERS.map((char) => {
                const isSelected = selectedChar?.id === char.id;
                return (
                  <div
                    key={char.id}
                    onClick={() => setSelectedChar(char)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 glass-panel-interactive flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/60 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                        : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <img
                          src={char.avatarUrl}
                          alt={char.name}
                          style={{ width: '56px', height: '56px', minWidth: '56px', minHeight: '56px', maxWidth: '56px', maxHeight: '56px', borderRadius: '50%', objectFit: 'cover' }}
                          className="border-2 border-indigo-400/50 shadow-md shrink-0 block"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 truncate">
                              {char.riasecType}
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
                          </div>
                          <h3 className="text-base font-bold text-slate-100 mt-1 truncate">{char.name}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">{char.description}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-700/50 text-[11px] font-semibold text-amber-300">
                      ✨ {char.perkText}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={handleCharacterNext}
                disabled={!selectedChar}
                className={`px-10 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 mx-auto transition-all duration-200 ${
                  selectedChar
                    ? 'text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 hover:-translate-y-0.5'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                次へ：年代を選択 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 2: 年代選択 ===== */}
        {step === 'generation' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-lg font-bold flex items-center justify-center gap-2 text-purple-300">
                <Calendar className="w-5 h-5" /> スタート年代を選んでください
              </h2>
              <p className="text-xs text-slate-400 mt-1">年代によって初期パラメーターとカード獲得ルールが変わります。</p>
            </div>

            {/* 選択済みキャラ表示 */}
            {selectedChar && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 mx-auto max-w-sm">
                <img
                  src={selectedChar.avatarUrl}
                  alt={selectedChar.name}
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', maxWidth: '40px', maxHeight: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  className="border-2 border-indigo-400/50 shadow-md shrink-0 block"
                />
                <div>
                  <span className="text-sm font-bold text-slate-100">{selectedChar.name}</span>
                  <span className="text-xs text-indigo-300 ml-2">{selectedChar.riasecType}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GENERATIONS.map((gen) => {
                const isSelected = selectedGen?.id === gen.id;
                return (
                  <div
                    key={gen.id}
                    onClick={() => setSelectedGen(gen)}
                    className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 glass-panel-interactive ${
                      isSelected
                        ? 'border-purple-500 bg-purple-950/40 ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/10 scale-[1.02]'
                        : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-base">{gen.name}</h3>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{gen.drawRuleText}</p>
                    <div className="mt-3 pt-2 border-t border-slate-700/50 text-xs text-slate-400 space-y-1">
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                        <span className="text-orange-400">Labor: {gen.initial4L.labor}</span>
                        <span className="text-purple-400">Learn: {gen.initial4L.learn}</span>
                        <span className="text-pink-400">Love: {gen.initial4L.love}</span>
                        <span className="text-emerald-400">Leisure: {gen.initial4L.leisure}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-slate-400">
                        <span className="text-slate-300 font-semibold">初期スキル:</span>
                        <span>対人:{gen.initialSkills.interpersonal}</span>
                        <span>思考:{gen.initialSkills.thinking}</span>
                        <span>実行:{gen.initialSkills.execution}</span>
                        <span>柔軟:{gen.initialSkills.flexibility}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setStep('character')}
                className="px-6 py-3 rounded-xl text-sm font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                ← 戻る
              </button>
              <button
                onClick={handleGenerationNext}
                disabled={!selectedGen}
                className={`px-10 py-3 rounded-xl font-bold text-base flex items-center gap-2 transition-all duration-200 ${
                  selectedGen
                    ? 'text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 hover:-translate-y-0.5'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                次へ：コースを選択 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: コース選択 ===== */}
        {step === 'course' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-lg font-bold flex items-center justify-center gap-2 text-pink-300">
                <Briefcase className="w-5 h-5" /> 所属コースを選んでください
              </h2>
              <p className="text-xs text-slate-400 mt-1">キャリア環境を選択して冒険を始めましょう！</p>
            </div>

            {/* 選択済みキャラ＆年代表示 */}
            {selectedChar && selectedGen && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 mx-auto max-w-md">
                <img
                  src={selectedChar.avatarUrl}
                  alt={selectedChar.name}
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', maxWidth: '40px', maxHeight: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  className="border-2 border-indigo-400/50 shadow-md shrink-0 block"
                />
                <div className="text-sm">
                  <span className="font-bold text-slate-100">{selectedChar.name}</span>
                  <span className="text-indigo-300 ml-2 text-xs">{selectedChar.riasecType}</span>
                  <span className="text-slate-500 mx-1.5">•</span>
                  <span className="text-purple-300 text-xs">{selectedGen.name}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COURSES.map((course) => {
                const isSelected = selectedCourse?.id === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 glass-panel-interactive ${
                      isSelected
                        ? 'border-pink-500 bg-pink-950/40 ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/10 scale-[1.02]'
                        : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{course.name}</h3>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-400" />}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{course.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setStep('generation')}
                className="px-6 py-3 rounded-xl text-sm font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                ← 戻る
              </button>
              <button
                onClick={handleCourseConfirm}
                disabled={!selectedCourse}
                className={`px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all duration-200 ${
                  selectedCourse
                    ? 'text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 hover:-translate-y-0.5'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                キャリアシミュレーションを開始する 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
