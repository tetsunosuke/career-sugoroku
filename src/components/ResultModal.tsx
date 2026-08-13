import React, { useEffect } from 'react';
import type { PlayerState, CoOpProject, GameLog } from '../types/game';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, RefreshCw, Award, HeartHandshake, History } from 'lucide-react';

interface Props {
  player: PlayerState;
  completedProjects: CoOpProject[];
  turn: number;
  logs: GameLog[];
  onRestart: () => void;
}

const RadarChart: React.FC<{ stats: { labor: number, learn: number, love: number, leisure: number } }> = ({ stats }) => {
  const max = 15;
  const r = 90;
  const center = 140;

  const getPoint = (val: number, angleDeg: number) => {
    const ratio = Math.min(val, max) / max;
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: center + ratio * r * Math.cos(rad),
      y: center + ratio * r * Math.sin(rad)
    };
  };

  const pts = [
    getPoint(stats.labor, 0),
    getPoint(stats.learn, 90),
    getPoint(stats.love, 180),
    getPoint(stats.leisure, 270)
  ];

  const polyPoints = pts.map(p => `${p.x},${p.y}`).join(' ');

  const axes = [
    { label: 'Labor', color: '#f97316', angle: 0 },
    { label: 'Learn', color: '#a855f7', angle: 90 },
    { label: 'Love', color: '#ec4899', angle: 180 },
    { label: 'Leisure', color: '#10b981', angle: 270 }
  ];

  const guides = [0.33, 0.66, 1];

  return (
    <svg width="280" height="280" className="mx-auto overflow-visible">
      <defs>
        <linearGradient id="polyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      
      {/* Guides */}
      {guides.map((ratio, i) => {
        const guidePts = axes.map(a => {
          const pt = getPoint(max * ratio, a.angle);
          return `${pt.x},${pt.y}`;
        }).join(' ');
        return (
          <polygon key={i} points={guidePts} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray={i < 2 ? "2,2" : "none"} />
        );
      })}

      {/* Axes */}
      {axes.map((a, i) => {
        const pt = getPoint(max, a.angle);
        return (
          <line key={i} x1={center} y1={center} x2={pt.x} y2={pt.y} stroke="#475569" strokeWidth="1" />
        );
      })}

      {/* Data Polygon */}
      <polygon points={polyPoints} fill="url(#polyGrad)" fillOpacity="0.3" stroke="#818cf8" strokeWidth="2" />

      {/* Data Points */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={axes[i].color} />
      ))}

      {/* Labels */}
      {axes.map((a, i) => {
        const pt = getPoint(max + 2.5, a.angle);
        return (
          <text 
            key={i} 
            x={pt.x} 
            y={pt.y} 
            fill={a.color} 
            fontSize="12" 
            fontWeight="bold"
            textAnchor="middle" 
            dominantBaseline="middle"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
};

export const ResultModal: React.FC<Props> = ({
  player,
  completedProjects,
  turn,
  logs,
  onRestart
}) => {
  const { character, stats4L, skills } = player;

  useEffect(() => {
    // 紙吹雪エフェクト
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // 称号判定
  const total4L = stats4L.labor + stats4L.learn + stats4L.love + stats4L.leisure;
  const { labor, learn, love, leisure } = stats4L;
  const isLaborLawViolated = (player.paidLeaves?.used ?? 0) === 0;

  let title = 'バランス型アジリティ・リーダー';
  
  if (labor >= 12 && learn >= 12) title = '知と実行を兼ね備えたプロフェッショナル';
  else if (love >= 12 && leisure >= 12) title = '人生謳歌・人間関係マスター';
  else if (labor >= 10 && love >= 10) title = 'チームを導く情熱的リーダー';
  else if (learn >= 10 && leisure >= 10) title = 'マイペースな知の探求者';
  else if (labor >= 10 && leisure >= 10) title = '効率重視のワークライフバランサー';
  else if (learn >= 10 && love >= 10) title = '共感力豊かな知恵袋';
  else if (labor >= 12) title = '最高峰の実績クリエイター (Labor特化)';
  else if (learn >= 12) title = '知の探求イノベーター (Learn特化)';
  else if (love >= 12) title = '人間関係・エンゲージメントマスター (Love特化)';
  else if (leisure >= 12) title = 'ウェルビーイング探求家 (Leisure特化)';
  else if (total4L >= 30) title = 'オールラウンド・キャリブレーション';

  if (isLaborLawViolated) {
    title = `⚠️ ワーカホリック（有休未消化労基違反）: ${title}`;
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'move': return 'bg-blue-500 border-blue-900';
      case 'card': return 'bg-amber-400 border-amber-900';
      case 'skill': return 'bg-purple-500 border-purple-900';
      case 'project': return 'bg-emerald-500 border-emerald-900';
      case 'warn': return 'bg-red-500 border-red-900';
      default: return 'bg-slate-400 border-slate-900';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 text-slate-100 border-indigo-500/30 text-center custom-scrollbar">
        <div className="space-y-3">
          <div className="relative w-20 h-20 mx-auto">
            <img
              src={character.avatarUrl}
              alt={character.name}
              style={{
                width: '80px',
                height: '80px',
                minWidth: '80px',
                minHeight: '80px',
                maxWidth: '80px',
                maxHeight: '80px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              className="border-4 border-amber-400 shadow-xl shadow-amber-500/30 block mx-auto"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-indigo-300">
            {title}
          </h2>
          <p className="text-xs text-slate-400">
            {character.name}（{character.riasecType}）としてのキャリア達成レポート
          </p>

          {/* 総資産 ＆ 健康度 ＆ 有休サマリー */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-1">
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
              <span className="text-[11px] font-bold text-amber-400 block">💰 最終資金</span>
              <span className="text-lg font-black text-amber-200">{player.money} CR</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <span className="text-[11px] font-bold text-emerald-400 block">❤️ コンディション</span>
              <span className="text-lg font-black text-emerald-200">{player.health.current} HP</span>
            </div>
            <div className={`p-3 rounded-xl border ${isLaborLawViolated ? 'bg-rose-950/50 border-rose-500/60' : 'bg-indigo-950/40 border-indigo-500/30'}`}>
              <span className={`text-[11px] font-bold block ${isLaborLawViolated ? 'text-rose-400' : 'text-indigo-300'}`}>🌴 有休消化</span>
              <span className={`text-lg font-black ${isLaborLawViolated ? 'text-rose-300 animate-pulse' : 'text-indigo-200'}`}>
                {player.paidLeaves?.used ?? 0} / 3 回
              </span>
            </div>
          </div>

          {/* 労基違反警告 */}
          {isLaborLawViolated && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs font-bold text-rose-300 animate-fadeIn">
              ⚠️ 労働基準法違反警告: 有給休暇が1回も消化されていません！ワークライフバランスの改善が必要です。
            </div>
          )}
        </div>

        {/* 獲得称号 */}
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">あなたのキャリア称号</span>
          <h3 className="text-2xl font-black text-amber-300 tracking-wide">{title}</h3>
        </div>

        {/* スコア集計 & レーダーチャート */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* 4L 集計 & レーダーチャート */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
            <h4 className="text-xs font-bold text-slate-400 uppercase w-full flex items-center gap-1 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> 最終4Lパラメータ (合計: {total4L})
            </h4>
            
            <RadarChart stats={stats4L} />

            <div className="grid grid-cols-2 gap-2 text-xs font-bold w-full mt-4">
              <span className="text-orange-400">Labor: {stats4L.labor}</span>
              <span className="text-purple-400">Learn: {stats4L.learn}</span>
              <span className="text-pink-400">Love: {stats4L.love}</span>
              <span className="text-emerald-400">Leisure: {stats4L.leisure}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* ポータブルスキル 集計 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                <Award className="w-4 h-4 text-indigo-400" /> ポータブルスキル
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <span className="text-blue-400">対人: {skills.interpersonal}</span>
                <span className="text-cyan-400">思考: {skills.thinking}</span>
                <span className="text-amber-400">実行: {skills.execution}</span>
                <span className="text-purple-400">柔軟: {skills.flexibility}</span>
              </div>
            </div>

            {/* 達成プロジェクト */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left space-y-2 flex-grow">
              <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                <HeartHandshake className="w-4 h-4 text-indigo-400" /> 達成した協力プロジェクト ({completedProjects.length})
              </h4>
              {completedProjects.length === 0 ? (
                <p className="text-xs text-slate-500">プロジェクト未達成</p>
              ) : (
                <ul className="text-xs space-y-1">
                  {completedProjects.map((p) => (
                    <li key={p.id} className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      ✓ {p.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 経験のタイムライン */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
            <History className="w-4 h-4 text-indigo-400" /> キャリア経験の軌跡
          </h4>
          {logs && logs.length > 0 ? (
            <div className="relative space-y-3 pl-6 border-l-2 border-slate-700/50 ml-3">
              {logs.map((log, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 ${getTypeColor(log.type)}`} />
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 shadow-sm text-xs text-left">
                    <span className="font-bold text-indigo-400 mb-1 block">Turn {log.turn}</span>
                    <p className="text-slate-200 leading-relaxed">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">記録がありません。</p>
          )}
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <RefreshCw className="w-5 h-5" /> もう一度プレイする
        </button>
      </div>
    </div>
  );
};
