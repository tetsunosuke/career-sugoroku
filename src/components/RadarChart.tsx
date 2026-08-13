import React from 'react';

export interface RadarAxis {
  label: string;
  value: number;
  color: string;
}

interface RadarChartProps {
  size?: number;
  max?: number;
  axes: [RadarAxis, RadarAxis, RadarAxis, RadarAxis];
  gradientId?: string;
  fillColor?: string;
  strokeColor?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  size = 200,
  max = 5,
  axes,
  gradientId = 'radarGrad',
  fillColor = '#a855f7',
  strokeColor = '#c084fc'
}) => {
  const center = size / 2;
  const radius = center * 0.65;

  const getPoint = (val: number, angleDeg: number) => {
    const ratio = Math.min(val, max) / max;
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: center + ratio * radius * Math.cos(rad),
      y: center + ratio * radius * Math.sin(rad)
    };
  };

  const angles = [0, 90, 180, 270];

  const pts = axes.map((axis, i) => getPoint(axis.value, angles[i]));
  const polyPoints = pts.map((p) => `${p.x},${p.y}`).join(' ');

  const guides = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible mx-auto">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* ガイド枠線 */}
      {guides.map((ratio, i) => {
        const guidePts = angles
          .map((angle) => {
            const pt = getPoint(max * ratio, angle);
            return `${pt.x},${pt.y}`;
          })
          .join(' ');
        return (
          <polygon
            key={i}
            points={guidePts}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            strokeDasharray={i < 3 ? '2,2' : 'none'}
          />
        );
      })}

      {/* 軸線 */}
      {angles.map((angle, i) => {
        const pt = getPoint(max, angle);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={pt.x}
            y2={pt.y}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
        );
      })}

      {/* データポリゴン */}
      <polygon
        points={polyPoints}
        fill={`url(#${gradientId})`}
        stroke={strokeColor}
        strokeWidth="2"
        className="transition-all duration-500 ease-out"
      />

      {/* データポイント頂点 */}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={size > 180 ? 4 : 3}
          fill={axes[i].color}
          stroke="#0b0f19"
          strokeWidth="1.5"
        />
      ))}

      {/* 軸ラベル */}
      {axes.map((a, i) => {
        const pt = getPoint(max + (size > 180 ? 0.9 : 0.8), angles[i]);
        return (
          <text
            key={i}
            x={pt.x}
            y={pt.y}
            fill={a.color}
            fontSize={size > 180 ? '11' : '9'}
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {a.label} ({a.value})
          </text>
        );
      })}
    </svg>
  );
};
