import type { Card4L } from '../types/game';

export const WORK_DECK: Card4L[] = [
  {
    id: 'w1',
    title: '大型案件の受注成功',
    deck: 'work',
    stats: { labor: 2, learn: 1 },
    description: 'チームを率いて競合を制し、大きな収益と事業貢献を達成した。'
  },
  {
    id: 'w2',
    title: '新規事業の提案通過',
    deck: 'work',
    stats: { labor: 3 },
    description: '経営陣への熱いピッチが実り、新規事業の立ち上げリーダーに抜擢。'
  },
  {
    id: 'w3',
    title: 'トラブル対応と収束',
    deck: 'work',
    stats: { labor: 1, learn: 2 },
    description: '危機的状況下で迅速に対応。修羅場をくぐり抜けて強い教訓を得た。'
  },
  {
    id: 'w4',
    title: '業務プロセスの標準化',
    deck: 'work',
    stats: { labor: 2, love: 1 },
    description: 'マニュアルと自動化を導入し、周囲の負担を大幅に削減。'
  },
  {
    id: 'w5',
    title: 'クロスフロンティア参画',
    deck: 'work',
    stats: { labor: 2, learn: 1 },
    description: '部署を超えたタスクフォースで成果を出し、社内での影響力が向上。'
  }
];

export const LEARN_DECK: Card4L[] = [
  {
    id: 'l1',
    title: '先端テクノロジーの修得',
    deck: 'learn',
    stats: { learn: 3 },
    description: 'AIやデータ分析の専門スキルをマスターし、新たな視点を手に入れた。'
  },
  {
    id: 'l2',
    title: 'ビジネススクール受講',
    deck: 'learn',
    stats: { learn: 2, love: 1 },
    description: '体系的な経営戦略を学び、切磋琢磨する学友とのネットワークを築いた。'
  },
  {
    id: 'l3',
    title: '社外勉強会の主催',
    deck: 'learn',
    stats: { learn: 2, labor: 1 },
    description: '自らのナレッジを発信し、業界コミュニティでリーダーシップを発揮。'
  },
  {
    id: 'l4',
    title: '専門書籍の執筆・寄稿',
    deck: 'learn',
    stats: { learn: 2, love: 1 },
    description: 'アウトプットを通して自身の思考を整理し、専門家としての評価を獲得。'
  },
  {
    id: 'l5',
    title: 'リスキリングプログラム完遂',
    deck: 'learn',
    stats: { learn: 3 },
    description: '時代の変化に合わせて新しい領域を貪欲に吸収した。'
  }
];

export const LIFE_DECK: Card4L[] = [
  {
    id: 'f1',
    title: '家族・友人との最高の休日',
    deck: 'life',
    stats: { love: 2, leisure: 2 },
    description: '心からリフレッシュし、絆を深めることで日々の活力が高まった。'
  },
  {
    id: 'f2',
    title: '趣味の発表会・コンテスト参加',
    deck: 'life',
    stats: { leisure: 3 },
    description: '仕事以外の情熱に打ち込み、新しい自分の一面を発見した。'
  },
  {
    id: 'f3',
    title: 'メンターシップ・ライフ相談',
    deck: 'life',
    stats: { love: 3 },
    description: '人生の先輩との対話を通じて、今後の生き方とビジョンがクリアになった。'
  },
  {
    id: 'f4',
    title: '健康的なライフスタイルの確立',
    deck: 'life',
    stats: { leisure: 2, love: 1 },
    description: '運動や食事改善により心身ともに最高のパフォーマンスを維持。'
  },
  {
    id: 'f5',
    title: '地域ボランティアのリーダーシップ',
    deck: 'life',
    stats: { love: 2, learn: 1 },
    description: '社会貢献活動を通じて温かい信頼関係と感謝を獲得した。'
  }
];
