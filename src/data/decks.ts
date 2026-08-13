import type { Card4L } from '../types/game';

// 【仕事 (Labor) の山札】: 4Lリソース獲得特化
export const WORK_DECK: Card4L[] = [
  { id: 'w1', deck: 'work', stats: { labor: 1 }, title: 'Labor +1' },
  { id: 'w2', deck: 'work', stats: { labor: 1 }, title: 'Labor +1' },
  { id: 'w3', deck: 'work', stats: { labor: 2 }, title: 'Labor +2' },
  { id: 'w4', deck: 'work', stats: { labor: 2 }, title: 'Labor +2' },
  { id: 'w5', deck: 'work', stats: { labor: 1 }, title: 'Labor +1' },
  { id: 'w6', deck: 'work', stats: { labor: 1 }, title: 'Labor +1' },
  { id: 'w7', deck: 'work', stats: { learn: 1 }, title: 'Learn +1' },
  { id: 'w8', deck: 'work', stats: { learn: 1 }, title: 'Learn +1' },
  { id: 'w9', deck: 'work', stats: { love: 1 }, title: 'Love +1' },
  { id: 'w10', deck: 'work', stats: { leisure: 1 }, title: 'Leisure +1' }
];

// 【学び (Learn) の山札】: 4Lリソース獲得特化
export const LEARN_DECK: Card4L[] = [
  { id: 'l1', deck: 'learn', stats: { learn: 1 }, title: 'Learn +1' },
  { id: 'l2', deck: 'learn', stats: { learn: 1 }, title: 'Learn +1' },
  { id: 'l3', deck: 'learn', stats: { learn: 2 }, title: 'Learn +2' },
  { id: 'l4', deck: 'learn', stats: { learn: 2 }, title: 'Learn +2' },
  { id: 'l5', deck: 'learn', stats: { learn: 1 }, title: 'Learn +1' },
  { id: 'l6', deck: 'learn', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 'l7', deck: 'learn', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 'l8', deck: 'learn', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 'l9', deck: 'learn', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 'l10', deck: 'learn', stats: { love: 1 }, title: 'Love +1' }
];

// 【ライフ / 関係 (Love) の山札】: 4Lリソース獲得特化
export const LOVE_DECK: Card4L[] = [
  { id: 'v1', deck: 'life', stats: { love: 1 }, title: 'Love +1' },
  { id: 'v2', deck: 'life', stats: { love: 1 }, title: 'Love +1' },
  { id: 'v3', deck: 'life', stats: { love: 2 }, title: 'Love +2' },
  { id: 'v4', deck: 'life', stats: { love: 2 }, title: 'Love +2' },
  { id: 'v5', deck: 'life', stats: { love: 1 }, title: 'Love +1' },
  { id: 'v6', deck: 'life', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 'v7', deck: 'life', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 'v8', deck: 'life', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 'v9', deck: 'life', stats: { learn: 1 }, title: 'Learn +1' },
  { id: 'v10', deck: 'life', stats: { learn: 1 }, title: 'Learn +1' }
];

// 【ライフ / 余暇 (Leisure) の山札】: 4Lリソース獲得特化
export const LEISURE_DECK: Card4L[] = [
  { id: 's1', deck: 'life', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 's2', deck: 'life', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 's3', deck: 'life', stats: { leisure: 2 }, title: 'Leisure +2' },
  { id: 's4', deck: 'life', stats: { leisure: 2 }, title: 'Leisure +2' },
  { id: 's5', deck: 'life', stats: { leisure: 1 }, title: 'Leisure +1' },
  { id: 's6', deck: 'life', stats: { love: 1 }, title: 'Love +1' },
  { id: 's7', deck: 'life', stats: { love: 1 }, title: 'Love +1' },
  { id: 's8', deck: 'life', stats: { love: 1 }, title: 'Love +1' },
  { id: 's9', deck: 'life', stats: { learn: 1 }, title: 'Learn +1' },
  { id: 's10', deck: 'life', stats: { learn: 1 }, title: 'Learn +1' }
];

export const LIFE_DECK = [...LOVE_DECK];
