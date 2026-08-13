import React from 'react';

interface HeaderNavProps {
  activeTab?: 'game' | 'rules' | 'theory';
  onOpenModal?: (tab: 'rules' | 'theory') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeTab, onOpenModal }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 py-3 mb-6 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            🎲
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none tracking-wide group-hover:text-indigo-300 transition-colors">
              キャリア・キルト・クエスト
            </h1>
            <span className="text-xs text-slate-400 font-medium">Career Quilt Quest</span>
          </div>
        </a>

        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'game'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🎮</span>
            <span>ゲーム</span>
          </a>

          {onOpenModal ? (
            <>
              <button
                onClick={() => onOpenModal('rules')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'rules'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📖</span>
                <span>ルールガイド</span>
              </button>

              <button
                onClick={() => onOpenModal('theory')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'theory'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🎓</span>
                <span>キャリア理論</span>
              </button>
            </>
          ) : (
            <>
              <a
                href="/rules"
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'rules'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📖</span>
                <span>ルールガイド</span>
              </a>

              <a
                href="/theory"
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'theory'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🎓</span>
                <span>キャリア理論</span>
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
