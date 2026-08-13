import React, { useState } from 'react';

interface GuideContentProps {
  initialTab?: 'rules' | 'theory';
  isModalView?: boolean;
  onClose?: () => void;
}

export const GuideContent: React.FC<GuideContentProps> = ({
  initialTab = 'rules',
  isModalView = false,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'theory'>(initialTab);

  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      {/* Tab Selector */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4 flex-wrap">
        <div className="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 shadow-inner">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
              activeTab === 'rules'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🎮</span>
            <span>ゲームルール・遊び方</span>
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
              activeTab === 'theory'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📚</span>
            <span>キャリア理論解説</span>
          </button>
        </div>

        {isModalView && onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1"
          >
            ✕ 閉じる
          </button>
        )}
      </div>

      {/* Content Body */}
      {activeTab === 'rules' ? (
        <div className="space-y-10 animate-fadeIn">
          {/* Header Hero */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 flex items-center gap-3">
              <span>🧵</span> キャリア・キルト・クエスト 基本ガイド
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              「キャリア・キルト・クエスト」は、ダイスを振って様々な出来事（マス・カード）を巡りながら、人生の4つの要素（<strong className="text-amber-400">Labor</strong>/<strong className="text-purple-400">Learn</strong>/<strong className="text-emerald-400">Leisure</strong>/<strong className="text-pink-400">Love</strong>）を獲得し、獲得した経験の断片をパッチワーク（キルト）のように自身独自の<strong className="text-cyan-300">ポータブルスキル</strong>へ手動で意味づけ・変換しながら、自分自身の自己決定目標の達成を目指す自律型キャリアシミュレーションゲームです。
            </p>
          </div>

          {/* Section: Game Flow */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
              🔄 ターンの流れ・ゲームの進行
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { step: '01', title: 'ダイスを振る', icon: '🎲', desc: '1〜2の出目でマスを進みます。着実な歩みの中で偶発的なイベントに遭遇！' },
                { step: '02', title: 'マスの効果&カード', icon: '🎴', desc: '到着マスの効果を受け、「仕事・学び・関係・余暇」などのカードを獲得。' },
                { step: '03', title: '4Lリソース獲得', icon: '💎', desc: 'カードやマスの内容に応じた4Lポイントを獲得。' },
                { step: '04', title: 'スキル変換', icon: '⚡', desc: '獲得した4Lを自身のポータブルスキルへポイント割り振り。' },
                { step: '05', title: 'プロジェクト達成', icon: '🎯', desc: '必要スキルを満たす協力PJを達成し豪華報酬(4L・資金・体力)を獲得！' }
              ].map((item, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all">
                  <div className="text-xs font-black text-indigo-400 tracking-wider mb-1">STEP {item.step}</div>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-slate-400 leading-snug">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Characters (RIASEC) */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-l-4 border-purple-500 pl-3">
              👤 6人のキャラクター（RIASECタイプ）
            </h3>
            <p className="text-sm text-slate-300">
              プレイヤーはホランドのRIASEC特性に基づく6人のキャラクターから1名を選択します。それぞれ固有の得意スキルやパッシブスキル（+1ボーナス等）を持っています。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { type: 'R（現実的）', name: 'リキヤ', favored: '実行スキル', perk: '「実行」スキル獲得 pt +1 ボーナス ＆ 体力消費20%軽減', icon: '🛠️', color: 'border-yellow-500/40 bg-yellow-950/10' },
                { type: 'I（研究的）', name: 'イオリ', favored: '思考スキル', perk: '「思考」スキル獲得 pt +1 ボーナス ＆ 受講費50%割引', icon: '🔍', color: 'border-cyan-500/40 bg-cyan-950/10' },
                { type: 'A（芸術的）', name: 'アオイ', favored: '柔軟スキル', perk: '「柔軟」スキル獲得 pt +1 ボーナス ＆ 体力回復1.5倍', icon: '🎨', color: 'border-purple-500/40 bg-purple-950/10' },
                { type: 'S（社会的）', name: 'ソウタ', favored: '対人スキル', perk: '「対人」スキル獲得 pt +1 ボーナス ＆ 愛で体力+10回復', icon: '🤝', color: 'border-blue-500/40 bg-blue-950/10' },
                { type: 'E（企業的）', name: 'エイジ', favored: 'プロジェクト推進', perk: '協力プロジェクト達成時、全4L+1 ＆ 報酬資金 +5 CR', icon: '🚀', color: 'border-red-500/40 bg-red-950/10' },
                { type: 'C（慣習的）', name: 'チヒロ', favored: 'プロセス・効率', perk: '4Lからスキルへの変換効率+1 ＆ 毎ターン手当 +2 CR', icon: '📊', color: 'border-emerald-500/40 bg-emerald-950/10' }
              ].map((c, i) => (
                <div key={i} className={`glass-panel p-4 rounded-xl border ${c.color} flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300">{c.type}</span>
                      <span className="text-xl">{c.icon}</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">{c.name}</div>
                    <div className="text-xs text-indigo-300 font-semibold mb-2">得意領域: {c.favored}</div>
                    <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-white/5">{c.perk}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: 4L & Portable Skills */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 4L Resources */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                💎 4Lリソース（経験の源泉）
              </h4>
              <p className="text-xs text-slate-300">
                カードやマスで獲得できる4つの人生要素。スキル割り振りの原資となります。
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-950/30 border border-orange-500/30">
                  <span className="text-sm font-bold text-orange-400">Labor（仕事・労働）</span>
                  <span className="text-xs text-slate-300">実務・責任・成果物</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
                  <span className="text-sm font-bold text-purple-400">Learning（学習・自己研鑽）</span>
                  <span className="text-xs text-slate-300">インプット・思考・探求</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                  <span className="text-sm font-bold text-emerald-400">Leisure（余暇・憩い）</span>
                  <span className="text-xs text-slate-300">リフレッシュ・健康・発想</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-pink-950/30 border border-pink-500/30">
                  <span className="text-sm font-bold text-pink-400">Love（愛・人間関係）</span>
                  <span className="text-xs text-slate-300">家族・仲間・コミュニティ</span>
                </div>
              </div>
            </div>

            {/* Portable Skills */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                ⚡ 4つのポータブルスキル
              </h4>
              <p className="text-xs text-slate-300">
                どんな職種・業界でも持ち運び可能な実践的能力。プロジェクト達成条件に使用。
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/30">
                  <span className="text-sm font-bold text-blue-400">対人スキル (Interpersonal)</span>
                  <span className="text-xs text-slate-300">巻き込み・傾聴・合意形成</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                  <span className="text-sm font-bold text-cyan-400">思考スキル (Thinking)</span>
                  <span className="text-xs text-slate-300">課題発見・構造化・分析</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-yellow-950/30 border border-yellow-500/30">
                  <span className="text-sm font-bold text-yellow-400">実行スキル (Execution)</span>
                  <span className="text-xs text-slate-300">推進力・即戦力・完遂</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
                  <span className="text-sm font-bold text-purple-400">柔軟スキル (Flexibility)</span>
                  <span className="text-xs text-slate-300">変化適応・偶発的チャンスの活用</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section: 4L Decks Composition Breakdown (山札の4Lカード内訳) */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-l-4 border-amber-500 pl-3">
              🃏 山札の構成（各山札の4Lカード内訳）
            </h3>
            <p className="text-xs text-slate-300">
              各山札は全10枚で構成されており、山札の種類によって得られやすい4Lリソース（Labor / Learn / Love / Leisure）の傾向が異なります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 💼 仕事 (Labor) の山札 */}
              <div className="glass-panel p-5 rounded-xl border border-orange-500/30 bg-orange-950/10 space-y-2">
                <div className="flex items-center justify-between border-b border-orange-500/30 pb-2">
                  <span className="font-bold text-orange-400 text-sm flex items-center gap-1.5">
                    💼 仕事 (Labor) の山札
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">計 10枚</span>
                </div>
                <p className="text-xs text-slate-300">実務成果と責任を中心に構成された山札。</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs pt-1 font-semibold">
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Labor +1 : <strong>4枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Labor +2 : <strong>2枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Learn +1 : <strong>2枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Love +1 / Leisure +1 : <strong>各1枚</strong></div>
                </div>
                <div className="text-[11px] text-orange-300/80 pt-1">
                  📊 獲得傾向: <strong>Labor 8pt</strong>, Learn 2pt, Love 1pt, Leisure 1pt
                </div>
              </div>

              {/* 📚 学び (Learn) の山札 */}
              <div className="glass-panel p-5 rounded-xl border border-purple-500/30 bg-purple-950/10 space-y-2">
                <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                  <span className="font-bold text-purple-400 text-sm flex items-center gap-1.5">
                    📚 学び (Learn) の山札
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">計 10枚</span>
                </div>
                <p className="text-xs text-slate-300">自己研鑽と知識の獲得、発想転換の山札。</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs pt-1 font-semibold">
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Learn +1 : <strong>3枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Learn +2 : <strong>2枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Leisure +1 : <strong>4枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Love +1 : <strong>1枚</strong></div>
                </div>
                <div className="text-[11px] text-purple-300/80 pt-1">
                  📊 獲得傾向: <strong>Learn 7pt</strong>, Leisure 4pt, Love 1pt
                </div>
              </div>

              {/* 💖 ライフ / 関係 (Love) の山札 */}
              <div className="glass-panel p-5 rounded-xl border border-pink-500/30 bg-pink-950/10 space-y-2">
                <div className="flex items-center justify-between border-b border-pink-500/30 pb-2">
                  <span className="font-bold text-pink-400 text-sm flex items-center gap-1.5">
                    💖 ライフ / 関係 (Love) の山札
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">計 10枚</span>
                </div>
                <p className="text-xs text-slate-300">人間関係、家族、共感と仲間との絆の山札。</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs pt-1 font-semibold">
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Love +1 : <strong>3枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Love +2 : <strong>2枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Leisure +1 : <strong>3枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Learn +1 : <strong>2枚</strong></div>
                </div>
                <div className="text-[11px] text-pink-300/80 pt-1">
                  📊 獲得傾向: <strong>Love 7pt</strong>, Leisure 3pt, Learn 2pt
                </div>
              </div>

              {/* 🌴 ライフ / 余暇 (Leisure) の山札 */}
              <div className="glass-panel p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-2">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                  <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                    🌴 ライフ / 余暇 (Leisure) の山札
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">計 10枚</span>
                </div>
                <p className="text-xs text-slate-300">リフレッシュ、趣味、ウェルビーイングの山札。</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs pt-1 font-semibold">
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Leisure +1 : <strong>3枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Leisure +2 : <strong>2枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Love +1 : <strong>3枚</strong></div>
                  <div className="bg-slate-900/60 p-2 rounded border border-white/5">Learn +1 : <strong>2枚</strong></div>
                </div>
                <div className="text-[11px] text-emerald-300/80 pt-1">
                  📊 獲得傾向: <strong>Leisure 7pt</strong>, Love 3pt, Learn 2pt
                </div>
              </div>
            </div>
          </section>

          {/* Section: Game Components Overview (コンポーネントの全容) */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
              🧩 ゲームコンポーネントの全容
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
                <div className="font-bold text-indigo-300 text-sm">🎲 12の盤面マス目</div>
                <p className="text-slate-300 leading-relaxed">
                  S字カーブ進行ルート（ルート矢印表示付）。新規事業、資格取得、育児、海外赴任など12の人生イベント。
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
                <div className="font-bold text-indigo-300 text-sm">⚡ リソース & メーター</div>
                <p className="text-slate-300 leading-relaxed">
                  💰 資金(CR)、❤️ 体力(HP)、🌴 有休メーター(全3回・最低1回消化義務)。バランス経営が不可欠。
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
                <div className="font-bold text-indigo-300 text-sm">🎯 3つの行動スタンス</div>
                <p className="text-slate-300 leading-relaxed">
                  💼 引き受ける / 🔥 かなりがんばる(-15HP, +5CR, ドロー+1) / 🌿 有給を使う(+20HP, 3CR投資でLeisure山ドロー可)。
                </p>
              </div>
            </div>
          </section>

          {/* Section: Course & Generations */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
              🌱 世代の進行 & コース選択
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-xl border border-white/10">
                <div className="font-bold text-emerald-400 text-base mb-2">🏢 コース選択（環境）</div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                    <strong className="text-white">ベンチャーコース:</strong> マス移動獲得スキルpt +1。刺激とトラブル、スピード感ある環境。
                  </li>
                  <li className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                    <strong className="text-white">大手企業コース:</strong> 「学び」カード獲得時のドロー数 +1。充実した育成体系と安定した成長。
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/10">
                <div className="font-bold text-cyan-400 text-base mb-2">⏳ 世代進行（20代 → 30代 → 40-50代）</div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <strong className="text-white">20代（自己発見）:</strong> 基礎スキルの獲得と多様なカードの無条件ドロー。
                  </li>
                  <li className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <strong className="text-white">30代（選択と集中）:</strong> 3枚から任意2枚を選択可能。専門性の確立。
                  </li>
                  <li className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <strong className="text-white">40-50代（熟練・効果倍増）:</strong> カード獲得効果が2倍に！後輩育成やマネジメント。
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* Academic Career Theories Tab */
        <div className="space-y-10 animate-fadeIn">
          {/* Theory Hero */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-950/40 via-indigo-950/20 to-slate-900 border border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 flex items-center gap-3">
              <span>🎓</span> キャリア・キルト・クエストを支える5つのキャリア理論
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              本ゲームは、現代のキャリア開発・学術研究で重視される主要なキャリア理論に基づき設計されています。「偶発性を味方につける」「仕事以外を含むライフキャリアの統合」「個性の自己理解」「持ち運び可能な汎用スキル」を楽しく体験・理解することができます。
            </p>
          </div>

          {/* Theory 1: RIASEC Holland */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-indigo-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-bold rounded-lg text-xs border border-indigo-500/30">理論 01</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">ジョン・ホランドの「職業選択理論（RIASECモデル）」</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              アメリカの心理学者ジョン・ホランド（John L. Holland）が提唱した理論。個人の性格特性と職場の環境タイプを6つの基本領域に分類し、適合度（マッチング）が高いほど高い満足度と成果が得られるとされています。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-yellow-400 text-sm mb-1">R : Realistic（現実的）</div>
                <div className="text-xs text-slate-300 mb-1">モノや機械の操作、実務的な作業を好む。</div>
                <div className="text-xs text-slate-400">キャラ：リキヤ（実行スキル特化）</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-cyan-400 text-sm mb-1">I : Investigative（研究的）</div>
                <div className="text-xs text-slate-300 mb-1">学問、思考、分析、課題解明を好む。</div>
                <div className="text-xs text-slate-400">キャラ：イオリ（思考スキル特化）</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-purple-400 text-sm mb-1">A : Artistic（芸術的）</div>
                <div className="text-xs text-slate-300 mb-1">直感、創造性、自由で柔軟な表現を好む。</div>
                <div className="text-xs text-slate-400">キャラ：アオイ（柔軟スキル特化）</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-blue-400 text-sm mb-1">S : Social（社会的）</div>
                <div className="text-xs text-slate-300 mb-1">人々との対話、育成、支援、協働を好む。</div>
                <div className="text-xs text-slate-400">キャラ：ソウタ（対人スキル特化）</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-red-400 text-sm mb-1">E : Enterprising（企業的）</div>
                <div className="text-xs text-slate-300 mb-1">企画、提案、組織牽引、価値創出を好む。</div>
                <div className="text-xs text-slate-400">キャラ：エイジ（プロジェクト特化）</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-emerald-400 text-sm mb-1">C : Conventional（慣習的）</div>
                <div className="text-xs text-slate-300 mb-1">秩序、規律、正確なデータやルール運用。</div>
                <div className="text-xs text-slate-400">キャラ：チヒロ（変換効率補正）</div>
              </div>
            </div>
            <div className="bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-500/20 text-xs text-indigo-200">
              💡 <strong>ゲームでの学び：</strong> 自身のパーソナリティに合わせた得意領域を活かしつつ、他者との協働で苦手を補い合う視点を養います。
            </div>
          </div>

          {/* Theory 2: Hansen 4L */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-pink-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 font-bold rounded-lg text-xs border border-pink-500/30">理論 02</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">サニー・ハンセンの「統合的ライフプランニング（4L理論）」</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              キャリア学者サニー・ハンセン（Sunny L. Hansen）が唱えた、人生を4つの「L」の織物（パッチワーク・キルト）として統合的に捉える理論。仕事（Labor）のみをキャリアと捉えず、生涯を通じた4つの要素の調和と意味づけが豊かな人生を創ると定義しました。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-orange-500/30">
                <div className="text-orange-400 font-bold text-sm mb-1">① Labor（労働・仕事）</div>
                <div className="text-xs text-slate-300">給与を得る仕事だけでなく、責任を持った社会的役割や成果物の制作。</div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30">
                <div className="text-purple-400 font-bold text-sm mb-1">② Learning（学習・自己研鑽）</div>
                <div className="text-xs text-slate-300">学校教育、仕事上のスキルアップ、生涯学習、知的好奇心の充足。</div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30">
                <div className="text-emerald-400 font-bold text-sm mb-1">③ Leisure（余暇・憩い）</div>
                <div className="text-xs text-slate-300">趣味、リフレッシュ、心身の健康保全、新たなアイデアのインスピレーション。</div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-pink-500/30">
                <div className="text-pink-400 font-bold text-sm mb-1">④ Love（愛・人間関係・ボランティア）</div>
                <div className="text-xs text-slate-300">家族やパートナーシップ、友人関係、地域貢献や他者へのケア。</div>
              </div>
            </div>
            <div className="bg-pink-950/30 p-3.5 rounded-xl border border-pink-500/20 text-xs text-pink-200">
              💡 <strong>ゲームでの学び：</strong> 「Leisure」や「Love」の経験も、「Thinking」や「Interpersonal」といった実用スキルへと変換・昇華されることを体験します。
            </div>
          </div>

          {/* Theory 3: Planned Happenstance */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 font-bold rounded-lg text-xs border border-purple-500/30">理論 03</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">ジョン・クランボルツの「計画的偶発性理論（Planned Happenstance）」</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              スタンフォード大学のジョン・クランボルツ（John D. Krumboltz）教授が提唱した現代キャリアの核心理論。「成功した個人のキャリアの約8割は、事前に計画されたものではなく、予想しない偶発的な出来事によって決定される」とし、その偶発性を積極的にチャンスへ変える行動様式が重要であるとしています。
            </p>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="font-bold text-purple-300 text-sm">偶然を機会に変える「5つの行動指針」</div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="bg-slate-800 p-2 rounded-lg"><strong className="text-white block mb-0.5">1. 好奇心</strong>新しい学びへの関心</div>
                <div className="bg-slate-800 p-2 rounded-lg"><strong className="text-white block mb-0.5">2. 持続性</strong>失敗に折れない継続</div>
                <div className="bg-slate-800 p-2 rounded-lg"><strong className="text-white block mb-0.5">3. 柔軟性</strong>こだわりを捨てる</div>
                <div className="bg-slate-800 p-2 rounded-lg"><strong className="text-white block mb-0.5">4. 楽観性</strong>何とかなると信じる</div>
                <div className="bg-slate-800 p-2 rounded-lg"><strong className="text-white block mb-0.5">5. 冒険心</strong>リスクを恐れず行動</div>
              </div>
            </div>
            <div className="bg-purple-950/30 p-3.5 rounded-xl border border-purple-500/20 text-xs text-purple-200">
              💡 <strong>ゲームでの学び：</strong> ダイスの出目や予期せぬトラブルマスも、「柔軟スキル」やポジティブな意味づけ（4Lの獲得）によってキャリアの糧へ変えられることを学びます。
            </div>
          </div>

          {/* Theory 4: Portable Skills */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 font-bold rounded-lg text-xs border border-cyan-500/30">理論 04</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">厚生労働省「ポータブルスキル（持ち運び可能な能力）」</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              職種や業種を問わず、どのような環境や時代変化においても有効に機能する通用性の高いビジネススキルのフレームワーク。「仕事の進め方」や「人との関わり方」を中心とした汎用能力です。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-blue-500/30 text-xs">
                <strong className="text-blue-400 text-sm block mb-1">対人スキル（Interpersonal）</strong>
                社内外の関係者と良好な信頼関係を築き、意見を調整し、周囲を巻き込んで協働する力。
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-cyan-500/30 text-xs">
                <strong className="text-cyan-400 text-sm block mb-1">思考スキル（Thinking）</strong>
                現状の課題を発見・分析し、論理的な構造化によって最適な解決策を導き出す力。
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-yellow-500/30 text-xs">
                <strong className="text-yellow-400 text-sm block mb-1">実行スキル（Execution）</strong>
                計画を立て、スピード感を持ってやり切り、確実に成果やアウトプットを出す力。
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-purple-500/30 text-xs">
                <strong className="text-purple-400 text-sm block mb-1">柔軟スキル（Flexibility）</strong>
                環境の変化や不確実性を受け入れ、臨機応変に発想を変えて適応する力。
              </div>
            </div>
          </div>

          {/* Theory 05: Self-Determination Theory & Protean Career */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-950/20 to-indigo-950/20 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg text-xs border border-amber-500/30">理論 05</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">デシ＆ライアンの「自己決定理論 (SDT)」とダグラス・ホールの「プロティアン・キャリア」</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              キャリアにおける真の幸福とは他者から与えられる均等やバランスではなく、<strong>「自分の価値観に基づき、自分の人生を自ら選択・自己決定した（Autonomy）という実感」</strong>にあります。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/30 space-y-1">
                <div className="text-amber-300 font-bold text-sm">🎯 自己決定理論 (SDT)</div>
                <div className="text-xs text-slate-300">
                  エドワード・デシとリチャード・ライアンが唱えた動機づけ理論。自律性（自分で決める感覚）が満たされることで最高のモチベーションとウェルビーイングが生まれます。
                </div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 space-y-1">
                <div className="text-purple-300 font-bold text-sm">🌟 プロティアン・キャリア ＆ 心理的成功</div>
                <div className="text-xs text-slate-300">
                  ダグラス・ホールが提唱。社会や組織の物差し（昇進・給与）ではなく、自身が定めた目標に対する「心理的成功（Psychological Success）」こそがキャリアのゴールであると定めます。
                </div>
              </div>
            </div>
            <div className="bg-amber-950/40 p-3.5 rounded-xl border border-amber-500/30 text-xs text-amber-200">
              💡 <strong>ゲームでの学び：</strong> スタート時に自ら選択した「自己決定目標カード」の達成度や、1周目の内省を生かした「2周目 (リ・キャリア)」の再構築により、自律的キャリア形成の真髄を体験します。
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
