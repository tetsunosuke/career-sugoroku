import type { CareerGoal } from '../types/game';

export const CAREER_GOALS: CareerGoal[] = [
  {
    id: 'goal_pro',
    title: 'プロフェッショナル追求型',
    subtitle: '仕事での成果と経済的独立',
    description: 'ビジネスでの圧倒的な実務成果(Labor)と資産形成(CR)を自律的に目指す目標。',
    target4L: { labor: 12 },
    targetMoney: 40,
    targetSkillsSum: 10,
    icon: '🚀'
  },
  {
    id: 'goal_life',
    title: 'ライフ＆コミュニティ型',
    subtitle: '絆と心地よい時間を最優先',
    description: '大切な人との関係(Love)と豊かな余暇(Leisure)を最も価値ある軸として暮らす目標。',
    target4L: { love: 12, leisure: 10 },
    targetMoney: 20,
    targetSkillsSum: 8,
    icon: '💖'
  },
  {
    id: 'goal_balance',
    title: 'ライフキャリア統合型',
    subtitle: '全領域の美しき調和',
    description: '仕事・人間関係・余暇のすべてを偏りなく育てる調和のとれた生き方を選ぶ目標。',
    target4L: { labor: 8, love: 8, leisure: 8 },
    targetMoney: 25,
    targetSkillsSum: 10,
    icon: '⚖️'
  },
  {
    id: 'goal_specialist',
    title: '自律スペシャリスト型',
    subtitle: '高い持ち運びスキルと経済力',
    description: 'どこでも通用するポータブルスキルと高い資本力を自律的に錬成する目標。',
    target4L: { labor: 10 },
    targetMoney: 50,
    targetSkillsSum: 14,
    icon: '⚡'
  }
];
