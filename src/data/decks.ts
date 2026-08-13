import type { Card4L } from '../types/game';

// 【仕事 (Labor) の山札】: 資金+獲得 / 体力-消費
export const WORK_DECK: Card4L[] = [
  { id: 'w1', deck: 'work', stats: { labor: 1 }, moneyEffect: 5, healthEffect: -10, title: '仕事経験カード [Labor +1]', description: '＋5 CR / 体力-10' },
  { id: 'w2', deck: 'work', stats: { labor: 1 }, moneyEffect: 4, healthEffect: -8, title: '仕事経験カード [Labor +1]', description: '＋4 CR / 体力-8' },
  { id: 'w3', deck: 'work', stats: { labor: 2 }, moneyEffect: 10, healthEffect: -20, title: '仕事経験カード [Labor +2]', description: '＋10 CR / 体力-20' },
  { id: 'w4', deck: 'work', stats: { labor: 2 }, moneyEffect: 12, healthEffect: -25, title: '仕事経験カード [Labor +2]', description: '＋12 CR / 体力-25' },
  { id: 'w5', deck: 'work', stats: { labor: 1 }, moneyEffect: 6, healthEffect: -10, title: '仕事経験カード [Labor +1]', description: '＋6 CR / 体力-10' },
  { id: 'w6', deck: 'work', stats: { labor: 1 }, moneyEffect: 5, healthEffect: -12, title: '仕事経験カード [Labor +1]', description: '＋5 CR / 体力-12' },
  { id: 'w7', deck: 'work', stats: { learn: 1 }, moneyEffect: 3, healthEffect: -5, title: '仕事経験カード [Learn +1]', description: '＋3 CR / 体力-5' },
  { id: 'w8', deck: 'work', stats: { learn: 1 }, moneyEffect: 3, healthEffect: -5, title: '仕事経験カード [Learn +1]', description: '＋3 CR / 体力-5' },
  { id: 'w9', deck: 'work', stats: { love: 1 }, moneyEffect: 2, healthEffect: +5, title: '仕事経験カード [Love +1]', description: '＋2 CR / 体力+5' },
  { id: 'w10', deck: 'work', stats: { leisure: 1 }, moneyEffect: 4, healthEffect: +10, title: '仕事経験カード [Leisure +1]', description: '＋4 CR / 体力+10' }
];

// 【学び (Learn) の山札】: 受講費-消費 / 体力-微消費
export const LEARN_DECK: Card4L[] = [
  { id: 'l1', deck: 'learn', stats: { learn: 1 }, moneyEffect: -3, healthEffect: -5, title: '学び経験カード [Learn +1]', description: '－3 CR / 体力-5' },
  { id: 'l2', deck: 'learn', stats: { learn: 1 }, moneyEffect: -2, healthEffect: -5, title: '学び経験カード [Learn +1]', description: '－2 CR / 体力-5' },
  { id: 'l3', deck: 'learn', stats: { learn: 2 }, moneyEffect: -8, healthEffect: -10, title: '学び経験カード [Learn +2]', description: '－8 CR / 体力-10' },
  { id: 'l4', deck: 'learn', stats: { learn: 2 }, moneyEffect: -10, healthEffect: -15, title: '学び経験カード [Learn +2]', description: '－10 CR / 体力-15' },
  { id: 'l5', deck: 'learn', stats: { learn: 1 }, moneyEffect: -4, healthEffect: -5, title: '学び経験カード [Learn +1]', description: '－4 CR / 体力-5' },
  { id: 'l6', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -1, healthEffect: +10, title: '学び経験カード [Leisure +1]', description: '－1 CR / 体力+10' },
  { id: 'l7', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +10, title: '学び経験カード [Leisure +1]', description: '－2 CR / 体力+10' },
  { id: 'l8', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -1, healthEffect: +8, title: '学び経験カード [Leisure +1]', description: '－1 CR / 体力+8' },
  { id: 'l9', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +12, title: '学び経験カード [Leisure +1]', description: '－2 CR / 体力+12' },
  { id: 'l10', deck: 'learn', stats: { love: 1 }, moneyEffect: -2, healthEffect: +10, title: '学び経験カード [Love +1]', description: '－2 CR / 体力+10' }
];

// 【ライフ / 関係 (Love) の山札】: 費用-微消費 / 体力+回復
export const LOVE_DECK: Card4L[] = [
  { id: 'v1', deck: 'life', stats: { love: 1 }, moneyEffect: -2, healthEffect: +15, title: 'ライフ経験カード [Love +1]', description: '－2 CR / 体力+15' },
  { id: 'v2', deck: 'life', stats: { love: 1 }, moneyEffect: -1, healthEffect: +12, title: 'ライフ経験カード [Love +1]', description: '－1 CR / 体力+12' },
  { id: 'v3', deck: 'life', stats: { love: 2 }, moneyEffect: -4, healthEffect: +20, title: 'ライフ経験カード [Love +2]', description: '－4 CR / 体力+20' },
  { id: 'v4', deck: 'life', stats: { love: 2 }, moneyEffect: -5, healthEffect: +25, title: 'ライフ経験カード [Love +2]', description: '－5 CR / 体力+25' },
  { id: 'v5', deck: 'life', stats: { love: 1 }, moneyEffect: -1, healthEffect: +10, title: 'ライフ経験カード [Love +1]', description: '－1 CR / 体力+10' },
  { id: 'v6', deck: 'life', stats: { leisure: 1 }, moneyEffect: -3, healthEffect: +15, title: 'ライフ経験カード [Leisure +1]', description: '－3 CR / 体力+15' },
  { id: 'v7', deck: 'life', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +12, title: 'ライフ経験カード [Leisure +1]', description: '－2 CR / 体力+12' },
  { id: 'v8', deck: 'life', stats: { leisure: 1 }, moneyEffect: -1, healthEffect: +10, title: 'ライフ経験カード [Leisure +1]', description: '－1 CR / 体力+10' },
  { id: 'v9', deck: 'life', stats: { learn: 1 }, moneyEffect: -2, healthEffect: +5, title: 'ライフ経験カード [Learn +1]', description: '－2 CR / 体力+5' },
  { id: 'v10', deck: 'life', stats: { learn: 1 }, moneyEffect: -1, healthEffect: +8, title: 'ライフ経験カード [Learn +1]', description: '－1 CR / 体力+8' }
];

// 【ライフ / 余暇 (Leisure) の山札】: 費用-消費 / 体力+大回復
export const LEISURE_DECK: Card4L[] = [
  { id: 's1', deck: 'life', stats: { leisure: 1 }, moneyEffect: -4, healthEffect: +25, title: 'ライフ経験カード [Leisure +1]', description: '－4 CR / 体力+25' },
  { id: 's2', deck: 'life', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +15, title: 'ライフ経験カード [Leisure +1]', description: '－2 CR / 体力+15' },
  { id: 's3', deck: 'life', stats: { leisure: 2 }, moneyEffect: -8, healthEffect: +40, title: 'ライフ経験カード [Leisure +2]', description: '－8 CR / 体力+40' },
  { id: 's4', deck: 'life', stats: { leisure: 2 }, moneyEffect: -6, healthEffect: +35, title: 'ライフ経験カード [Leisure +2]', description: '－6 CR / 体力+35' },
  { id: 's5', deck: 'life', stats: { leisure: 1 }, moneyEffect: -3, healthEffect: +20, title: 'ライフ経験カード [Leisure +1]', description: '－3 CR / 体力+20' },
  { id: 's6', deck: 'life', stats: { love: 1 }, moneyEffect: -3, healthEffect: +15, title: 'ライフ経験カード [Love +1]', description: '－3 CR / 体力+15' },
  { id: 's7', deck: 'life', stats: { love: 1 }, moneyEffect: -2, healthEffect: +15, title: 'ライフ経験カード [Love +1]', description: '－2 CR / 体力+15' },
  { id: 's8', deck: 'life', stats: { love: 1 }, moneyEffect: -1, healthEffect: +10, title: 'ライフ経験カード [Love +1]', description: '－1 CR / 体力+10' },
  { id: 's9', deck: 'life', stats: { learn: 1 }, moneyEffect: -3, healthEffect: +10, title: 'ライフ経験カード [Learn +1]', description: '－3 CR / 体力+10' },
  { id: 's10', deck: 'life', stats: { learn: 1 }, moneyEffect: -2, healthEffect: +10, title: 'ライフ経験カード [Learn +1]', description: '－2 CR / 体力+10' }
];

export const LIFE_DECK = [...LOVE_DECK];
