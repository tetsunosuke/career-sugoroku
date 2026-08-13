import type { Card4L } from '../types/game';

// 【仕事 (Labor) の山札】: 資金+獲得 / 体力-消費
export const WORK_DECK: Card4L[] = [
  { id: 'w1', deck: 'work', stats: { labor: 1 }, moneyEffect: 5, healthEffect: -10, title: '新規案件の完遂', description: '成果報酬5万円 / 体力10消費' },
  { id: 'w2', deck: 'work', stats: { labor: 1 }, moneyEffect: 4, healthEffect: -8, title: '日常業務の安定運用', description: '成果報酬4万円 / 体力8消費' },
  { id: 'w3', deck: 'work', stats: { labor: 2 }, moneyEffect: 10, healthEffect: -20, title: '大規模PJリーダーリード', description: '成果報酬10万円 / 体力20消費' },
  { id: 'w4', deck: 'work', stats: { labor: 2 }, moneyEffect: 12, healthEffect: -25, title: '海外クライアント獲得', description: '成果報酬12万円 / 体力25消費' },
  { id: 'w5', deck: 'work', stats: { labor: 1 }, moneyEffect: 6, healthEffect: -10, title: 'チーム内業務フロー改善', description: '成果報酬6万円 / 体力10消費' },
  { id: 'w6', deck: 'work', stats: { labor: 1 }, moneyEffect: 5, healthEffect: -12, title: '緊急トラブル対応完遂', description: '成果報酬5万円 / 体力12消費' },
  { id: 'w7', deck: 'work', stats: { learn: 1 }, moneyEffect: 3, healthEffect: -5, title: '現場実践からのスキル学習', description: '成果報酬3万円 / 体力5消費' },
  { id: 'w8', deck: 'work', stats: { learn: 1 }, moneyEffect: 3, healthEffect: -5, title: '先輩社員からのOJT指導', description: '成果報酬3万円 / 体力5消費' },
  { id: 'w9', deck: 'work', stats: { love: 1 }, moneyEffect: 2, healthEffect: +5, title: '同僚とのランチミーティング', description: '成果報酬2万円 / 体力5回復' },
  { id: 'w10', deck: 'work', stats: { leisure: 1 }, moneyEffect: 4, healthEffect: +10, title: '定時退社・ノー残業デー', description: '成果報酬4万円 / 体力10回復' }
];

// 【学び (Learn) の山札】: 受講費-消費 / 体力-微消費
export const LEARN_DECK: Card4L[] = [
  { id: 'l1', deck: 'learn', stats: { learn: 1 }, moneyEffect: -3, healthEffect: -5, title: '専門技術オンライン講座', description: '受講料3万円消費 / 体力5消費' },
  { id: 'l2', deck: 'learn', stats: { learn: 1 }, moneyEffect: -2, healthEffect: -5, title: '実務専門書の読破', description: '書籍費2万円消費 / 体力5消費' },
  { id: 'l3', deck: 'learn', stats: { learn: 2 }, moneyEffect: -8, healthEffect: -10, title: '短期集中ブートキャンプ参加', description: '参加費8万円消費 / 体力10消費' },
  { id: 'l4', deck: 'learn', stats: { learn: 2 }, moneyEffect: -10, healthEffect: -15, title: 'MBA・高度資格取得挑戦', description: '受験費10万円消費 / 体力15消費' },
  { id: 'l5', deck: 'learn', stats: { learn: 1 }, moneyEffect: -4, healthEffect: -5, title: '業界セミナー受講', description: '参加費4万円消費 / 体力5消費' },
  { id: 'l6', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -1, healthEffect: +10, title: '教養書読書とマインドフルネス', description: '書籍費1万円消費 / 体力10回復' },
  { id: 'l7', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +10, title: '社外ワークショップ交流', description: '参加費2万円消費 / 体力10回復' },
  { id: 'l8', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -1, healthEffect: +8, title: '思考整理のモーニングルーティン', description: '費用1万円消費 / 体力8回復' },
  { id: 'l9', deck: 'learn', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +12, title: 'デザイン・アート鑑賞', description: 'チケット代2万円消費 / 体力12回復' },
  { id: 'l10', deck: 'learn', stats: { love: 1 }, moneyEffect: -2, healthEffect: +10, title: '勉強会コミュニティ共同開催', description: '運営費2万円消費 / 体力10回復' }
];

// 【ライフ / 関係 (Love) の山札】: 費用-微消費 / 体力+回復
export const LOVE_DECK: Card4L[] = [
  { id: 'v1', deck: 'life', stats: { love: 1 }, moneyEffect: -2, healthEffect: +15, title: '家族やパートナーとの食事', description: '外食費2万円消費 / 体力15回復' },
  { id: 'v2', deck: 'life', stats: { love: 1 }, moneyEffect: -1, healthEffect: +12, title: '旧友との親交・相談', description: '交流費1万円消費 / 体力12回復' },
  { id: 'v3', deck: 'life', stats: { love: 2 }, moneyEffect: -4, healthEffect: +20, title: 'ホームパーティーの主催', description: '開催費4万円消費 / 体力20回復' },
  { id: 'v4', deck: 'life', stats: { love: 2 }, moneyEffect: -5, healthEffect: +25, title: '家族旅行・大切な節目のお祝い', description: '旅行費5万円消費 / 体力25回復' },
  { id: 'v5', deck: 'life', stats: { love: 1 }, moneyEffect: -1, healthEffect: +10, title: '地域コミュニティボランティア', description: '交通費1万円消費 / 体力10回復' },
  { id: 'v6', deck: 'life', stats: { leisure: 1 }, moneyEffect: -3, healthEffect: +15, title: '友人たちとスポーツアクティビティ', description: '施設費3万円消費 / 体力15回復' },
  { id: 'v7', deck: 'life', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +12, title: '公園でののんびりピクニック', description: '費2万円消費 / 体力12回復' },
  { id: 'v8', deck: 'life', stats: { leisure: 1 }, moneyEffect: -1, healthEffect: +10, title: '感謝を伝える手紙・ギフト', description: '購入費1万円消費 / 体力10回復' },
  { id: 'v9', deck: 'life', stats: { learn: 1 }, moneyEffect: -2, healthEffect: +5, title: '相互メンタリング・仲間との語り合い', description: 'カフェ費2万円消費 / 体力5回復' },
  { id: 'v10', deck: 'life', stats: { learn: 1 }, moneyEffect: -1, healthEffect: +8, title: '世代を超えた対話と気づき', description: '費用1万円消費 / 体力8回復' }
];

// 【ライフ / 余暇 (Leisure) の山札】: 費用-消費 / 体力+大回復
export const LEISURE_DECK: Card4L[] = [
  { id: 's1', deck: 'life', stats: { leisure: 1 }, moneyEffect: -4, healthEffect: +25, title: '温泉リゾートでデトックス', description: '宿泊費4万円消費 / 体力25回復' },
  { id: 's2', deck: 'life', stats: { leisure: 1 }, moneyEffect: -2, healthEffect: +15, title: 'スパ＆アロマ整体トリートメント', description: '施術費2万円消費 / 体力15回復' },
  { id: 's3', deck: 'life', stats: { leisure: 2 }, moneyEffect: -8, healthEffect: +40, title: 'リフレッシュ長期リゾート休暇', description: '休暇費8万円消費 / 体力40回復' },
  { id: 's4', deck: 'life', stats: { leisure: 2 }, moneyEffect: -6, healthEffect: +35, title: '趣味の道具・ギアの新調と満喫', description: '購入費6万円消費 / 体力35回復' },
  { id: 's5', deck: 'life', stats: { leisure: 1 }, moneyEffect: -3, healthEffect: +20, title: '週末キャンプ＆グランピング', description: '利用費3万円消費 / 体力20回復' },
  { id: 's6', deck: 'life', stats: { love: 1 }, moneyEffect: -3, healthEffect: +15, title: 'フェス・コンサートの鑑賞', description: 'チケット費3万円消費 / 体力15回復' },
  { id: 's7', deck: 'life', stats: { love: 1 }, moneyEffect: -2, healthEffect: +15, title: 'ドライブ＆景勝地巡り', description: 'ガソリン費2万円消費 / 体力15回復' },
  { id: 's8', deck: 'life', stats: { love: 1 }, moneyEffect: -1, healthEffect: +10, title: '自宅でのんびり推し活・映画鑑賞', description: '配信費1万円消費 / 体力10回復' },
  { id: 's9', deck: 'life', stats: { learn: 1 }, moneyEffect: -3, healthEffect: +10, title: '新しい趣味スクールへの体験', description: '体験費3万円消費 / 体力10回復' },
  { id: 's10', deck: 'life', stats: { learn: 1 }, moneyEffect: -2, healthEffect: +10, title: '料理教室・美食探索', description: '材料費2万円消費 / 体力10回復' }
];

export const LIFE_DECK = [...LOVE_DECK];
