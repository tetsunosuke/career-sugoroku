import type { Card4L } from '../types/game';

// 【仕事/Laborの山札】 (Laborが主軸、一部でLearnやLoveも得られる)
export const WORK_DECK: Card4L[] = [
  { id: 'w1', deck: 'work', stats: { labor: 2, learn: 1 } },
  { id: 'w2', deck: 'work', stats: { labor: 3 } },
  { id: 'w3', deck: 'work', stats: { labor: 1, learn: 2 } },
  { id: 'w4', deck: 'work', stats: { labor: 2, love: 1 } },
  { id: 'w5', deck: 'work', stats: { labor: 2 } },
  { id: 'w6', deck: 'work', stats: { labor: 1, leisure: 1 } },
  { id: 'w7', deck: 'work', stats: { labor: 3, learn: 1 } }
];

// 【学び/Learnの山札】 (Learnが主軸、一部でLaborやLoveも得られる)
export const LEARN_DECK: Card4L[] = [
  { id: 'l1', deck: 'learn', stats: { learn: 3 } },
  { id: 'l2', deck: 'learn', stats: { learn: 2, love: 1 } },
  { id: 'l3', deck: 'learn', stats: { learn: 2, labor: 1 } },
  { id: 'l4', deck: 'learn', stats: { learn: 2 } },
  { id: 'l5', deck: 'learn', stats: { learn: 3, leisure: 1 } },
  { id: 'l6', deck: 'learn', stats: { learn: 1, labor: 1 } },
  { id: 'l7', deck: 'learn', stats: { learn: 2, love: 1 } }
];

// 【ライフ/Love & Leisureの山札】 (LoveやLeisureが主軸、一部でLearnも得られる)
export const LIFE_DECK: Card4L[] = [
  { id: 'f1', deck: 'life', stats: { love: 2, leisure: 2 } },
  { id: 'f2', deck: 'life', stats: { leisure: 3 } },
  { id: 'f3', deck: 'life', stats: { love: 3 } },
  { id: 'f4', deck: 'life', stats: { leisure: 2, love: 1 } },
  { id: 'f5', deck: 'life', stats: { love: 2, learn: 1 } },
  { id: 'f6', deck: 'life', stats: { leisure: 2, learn: 1 } },
  { id: 'f7', deck: 'life', stats: { love: 2, labor: 1 } }
];
