import React, { useState } from 'react';
import type { Character, GenerationConfig, CourseConfig, CareerGoal } from '../types/game';
import { CHARACTERS, GENERATIONS, COURSES } from '../data/characters';
import { CAREER_GOALS } from '../data/goals';
import { User, Calendar, Briefcase, Sparkles, CheckCircle2, ArrowRight, Target, Compass } from 'lucide-react';
import { RadarChart } from './RadarChart';

type SetupStep = 'character' | 'generation' | 'course' | 'goal';

interface Props {
  onStart: (char: Character, gen: GenerationConfig, course: CourseConfig, goal: CareerGoal) => void;
}

export const SetupModal: React.FC<Props> = ({ onStart }) => {
  const [step, setStep] = useState<SetupStep>('character');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [previewChar, setPreviewChar] = useState<Character | null>(null);

  const [selectedGen, setSelectedGen] = useState<GenerationConfig | null>(null);
  const [previewGen, setPreviewGen] = useState<GenerationConfig | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<CourseConfig | null>(null);
  const [previewCourse, setPreviewCourse] = useState<CourseConfig | null>(null);

  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null);
  const [previewGoal, setPreviewGoal] = useState<CareerGoal | null>(null);

  const handleCharacterNext = () => {
    if (selectedChar) setStep('generation');
  };

  const handleSelectPreviewChar = (char: Character) => {
    setSelectedChar(char);
    setPreviewChar(null);
    setStep('generation');
  };

  const handleGenerationNext = () => {
    if (selectedGen) setStep('course');
  };

  const handleSelectPreviewGen = (gen: GenerationConfig) => {
    setSelectedGen(gen);
    setPreviewGen(null);
    setStep('course');
  };

  const handleCourseNext = () => {
    if (selectedCourse) setStep('goal');
  };

  const handleSelectPreviewCourse = (course: CourseConfig) => {
    setSelectedCourse(course);
    setPreviewCourse(null);
    setStep('goal');
  };

  const handleGoalConfirm = () => {
    if (selectedChar && selectedGen && selectedCourse && selectedGoal) {
      onStart(selectedChar, selectedGen, selectedCourse, selectedGoal);
    }
  };

  const handleSelectPreviewGoal = (goal: CareerGoal) => {
    setSelectedGoal(goal);
    setPreviewGoal(null);
    if (selectedChar && selectedGen && selectedCourse) {
      onStart(selectedChar, selectedGen, selectedCourse, goal);
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
          <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> 自律型キャリアシミュレーション
            </div>
            <a
              href="/rules"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 text-xs font-semibold transition-colors"
            >
              📖 ルール・解説を見る
            </a>
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
              <p className="text-xs text-slate-400 mt-1">カードをタップすると拡大して詳細なプロフィールを確認できます。</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHARACTERS.map((char) => {
                const isSelected = selectedChar?.id === char.id;
                return (
                  <div
                    key={char.id}
                    onClick={() => {
                      setSelectedChar(char);
                      setPreviewChar(char);
                    }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 glass-panel-interactive flex flex-col justify-between group ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/60 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                        : 'border-slate-700/60 bg-slate-900/40 opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <img
                          src={char.avatarUrl}
                          alt={char.name}
                          style={{ width: '56px', height: '56px', minWidth: '56px', minHeight: '56px', maxWidth: '56px', maxHeight: '56px', borderRadius: '50%', objectFit: 'cover' }}
                          className="border-2 border-indigo-400/50 shadow-md shrink-0 block group-hover:scale-105 transition-transform"
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
                    <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                      <span className="truncate">✨ {char.perkText}</span>
                      <span className="text-indigo-400 text-[10px] underline ml-1 shrink-0">🔍 拡大表示</span>
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
                    onClick={() => {
                      setSelectedGen(gen);
                      setPreviewGen(gen);
                    }}
                    className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 glass-panel-interactive flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-500 bg-purple-950/40 ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/10 scale-[1.02]'
                        : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-base">{gen.name}</h3>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{gen.drawRuleText}</p>

                      {/* レーダーチャート2連コンパクト表示 */}
                      <div className="grid grid-cols-2 gap-2 my-2 py-1 bg-slate-950/40 rounded-xl border border-white/5 text-center">
                        <div>
                          <span className="text-[10px] font-bold text-indigo-300 block mb-1">💎 初期 4L</span>
                          <RadarChart
                            size={120}
                            max={4}
                            fillColor="#818cf8"
                            strokeColor="#a5b4fc"
                            gradientId={`card4LGrad-${gen.id}`}
                            axes={[
                              { label: 'Labor', value: gen.initial4L.labor, color: '#f97316' },
                              { label: 'Learn', value: gen.initial4L.learn, color: '#a855f7' },
                              { label: 'Love', value: gen.initial4L.love, color: '#ec4899' },
                              { label: 'Leisure', value: gen.initial4L.leisure, color: '#10b981' }
                            ]}
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-purple-300 block mb-1">⚡ ポータブル</span>
                          <RadarChart
                            size={120}
                            max={4}
                            fillColor="#c084fc"
                            strokeColor="#e9d5ff"
                            gradientId={`cardSkillGrad-${gen.id}`}
                            axes={[
                              { label: '対人', value: gen.initialSkills.interpersonal, color: '#60a5fa' },
                              { label: '思考', value: gen.initialSkills.thinking, color: '#22d3ee' },
                              { label: '実行', value: gen.initialSkills.execution, color: '#facc15' },
                              { label: '柔軟', value: gen.initialSkills.flexibility, color: '#c084fc' }
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-purple-300 font-bold flex justify-end">
                      <span>🔍 拡大して詳細を見る</span>
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
                    onClick={() => {
                      setSelectedCourse(course);
                      setPreviewCourse(course);
                    }}
                    className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 glass-panel-interactive flex flex-col justify-between ${
                      isSelected
                        ? 'border-pink-500 bg-pink-950/40 ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/10 scale-[1.02]'
                        : 'border-slate-700/60 bg-slate-900/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{course.name}</h3>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{course.description}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-pink-300 font-bold flex justify-end">
                      <span>🔍 拡大して詳細を見る</span>
                    </div>
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
                onClick={handleCourseNext}
                disabled={!selectedCourse}
                className={`px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all duration-200 ${
                  selectedCourse
                    ? 'text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 hover:-translate-y-0.5'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                4. 自己決定目標の選択へ進む 🎯
              </button>
            </div>
          </div>
        )}
      </div>

      {/* キャラクター拡大表示・詳細確認モーダル */}
      {previewChar && (
        <div className="modal-overlay z-[140] animate-fadeIn p-4">
          <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/50 shadow-2xl bg-slate-950/95 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            {/* ヘッダー情報 */}
            <div className="text-center space-y-3">
              <div className="relative w-32 h-32 mx-auto">
                <img
                  src={previewChar.avatarUrl}
                  alt={previewChar.name}
                  style={{
                    width: '128px',
                    height: '128px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                  className="border-4 border-indigo-400 shadow-2xl block mx-auto"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-1">
                  {previewChar.riasecType}
                </div>
                <h2 className="text-2xl font-black text-white">{previewChar.name}</h2>
              </div>
            </div>

            {/* 詳細説明文 */}
            <div className="space-y-3 bg-slate-900/80 p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-indigo-300 block uppercase tracking-wider">
                👤 キャラクター概要・強み
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {previewChar.description}
              </p>
            </div>

            {/* 特権・固有スキル効果 */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-indigo-950/40 border border-amber-500/30 space-y-1.5">
              <span className="text-xs font-extrabold text-amber-400 block">
                ✨ 固有パッシブ能力
              </span>
              <p className="text-sm font-bold text-amber-200">
                {previewChar.perkText}
              </p>
            </div>

            {/* 決定 / キャンセルボタン */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleSelectPreviewChar(previewChar)}
                className="w-full py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                【{previewChar.name}】でスタート！ <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPreviewChar(null)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                ← 他のキャラクターを見る
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 年代拡大表示・詳細確認モーダル */}
      {previewGen && (
        <div className="modal-overlay z-[140] animate-fadeIn p-4">
          <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-6 text-slate-100 border-purple-500/50 shadow-2xl bg-slate-950/95 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                <Calendar className="w-4 h-4" /> 年代ステージ詳細
              </div>
              <h2 className="text-2xl font-black text-white">{previewGen.name}</h2>
            </div>

            {/* ドロー＆カードルール */}
            <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-purple-300 block uppercase tracking-wider">
                🎴 イベントカードドロー＆選択ルール
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {previewGen.drawRuleText}
              </p>
            </div>

            {/* 初期パラメーターのレーダーチャート比較 */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-300 block uppercase tracking-wider text-center">
                📊 初期ステータス バランス分析
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-900/90 border border-indigo-500/20 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-indigo-300 block">💎 初期 4Lリソース</span>
                  <RadarChart
                    size={170}
                    max={4}
                    fillColor="#818cf8"
                    strokeColor="#a5b4fc"
                    gradientId={`modal4LGrad-${previewGen.id}`}
                    axes={[
                      { label: 'Labor', value: previewGen.initial4L.labor, color: '#f97316' },
                      { label: 'Learn', value: previewGen.initial4L.learn, color: '#a855f7' },
                      { label: 'Love', value: previewGen.initial4L.love, color: '#ec4899' },
                      { label: 'Leisure', value: previewGen.initial4L.leisure, color: '#10b981' }
                    ]}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-purple-300 block">⚡ 初期 ポータブルスキル</span>
                  <RadarChart
                    size={170}
                    max={4}
                    fillColor="#c084fc"
                    strokeColor="#e9d5ff"
                    gradientId={`modalSkillGrad-${previewGen.id}`}
                    axes={[
                      { label: '対人', value: previewGen.initialSkills.interpersonal, color: '#60a5fa' },
                      { label: '思考', value: previewGen.initialSkills.thinking, color: '#22d3ee' },
                      { label: '実行', value: previewGen.initialSkills.execution, color: '#facc15' },
                      { label: '柔軟', value: previewGen.initialSkills.flexibility, color: '#c084fc' }
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* 決定 / キャンセルボタン */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleSelectPreviewGen(previewGen)}
                className="w-full py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
              >
                【{previewGen.name}】で決定して次へ <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPreviewGen(null)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                ← 他の年代を見る
              </button>
            </div>
          </div>
        </div>
      )}

      {/* コース拡大表示・詳細確認モーダル */}
      {previewCourse && (
        <div className="modal-overlay z-[140] animate-fadeIn p-4">
          <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-6 text-slate-100 border-pink-500/50 shadow-2xl bg-slate-950/95 relative overflow-hidden">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold">
                <Briefcase className="w-4 h-4" /> キャリア環境コース
              </div>
              <h2 className="text-2xl font-black text-white">{previewCourse.name}</h2>
            </div>

            {/* コース詳細説明 */}
            <div className="space-y-3 bg-slate-900/80 p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-pink-300 block uppercase tracking-wider">
                🏢 所属コースの特徴と成長機会
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {previewCourse.description}
              </p>
            </div>

            {/* 決定 / キャンセルボタン */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleSelectPreviewCourse(previewCourse)}
                className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-pink-600/30 transition-all flex items-center justify-center gap-2"
              >
                このコースを選択して次へ <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPreviewCourse(null)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                ← 他のコースを見る
              </button>
            </div>
          </div>
        </div>
      )}

      {/* キャリア目標カード拡大表示・詳細確認モーダル */}
      {previewGoal && (
        <div className="modal-overlay z-[140] animate-fadeIn p-4">
          <div className="glass-panel w-full max-w-lg p-6 md:p-8 space-y-6 text-slate-100 border-amber-500/50 shadow-2xl bg-slate-950/95 relative overflow-hidden text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">{previewGoal.icon}</span>
              <div className="text-left">
                <h2 className="text-2xl font-black text-white">{previewGoal.title}</h2>
                <div className="text-xs font-semibold text-amber-300">{previewGoal.subtitle}</div>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-900/80 p-4 rounded-2xl border border-white/10 text-left">
              {previewGoal.description}
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 to-indigo-950/50 border border-amber-500/40 text-left space-y-2">
              <span className="text-xs font-extrabold text-amber-300 block">🎯 自己決定する到達目標数値</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-200">
                {previewGoal.target4L.labor && <div className="p-2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">Labor: {previewGoal.target4L.labor} pt以上</div>}
                {previewGoal.target4L.love && <div className="p-2 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">Love: {previewGoal.target4L.love} pt以上</div>}
                {previewGoal.target4L.leisure && <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Leisure: {previewGoal.target4L.leisure} pt以上</div>}
                <div className="p-2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">資金: {previewGoal.targetMoney} CR以上</div>
                <div className="p-2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">スキル合計: {previewGoal.targetSkillsSum} pt以上</div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleSelectPreviewGoal(previewGoal)}
                className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-2"
              >
                この目標を自己決定してスタート！ 🚀
              </button>
              <button
                onClick={() => setPreviewGoal(null)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                ← 一覧に戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
