import type { BoardTile } from '../types/game';

export const BOARD_TILES: BoardTile[] = [
  {
    id: 0,
    name: 'スタート',
    category: 'スタート',
    deck: 'work',
    skillPt: 0,
    moneyEffect: 0,
    healthEffect: 0,
    effectDescription: 'キャリアの歩みがここから始まります。'
  },
  {
    id: 1,
    name: '新規プロジェクト立ち上げ',
    category: '仕事',
    deck: 'work',
    skillPt: 1,
    moneyEffect: 8,
    healthEffect: -12,
    effectDescription: '未知の事業立ち上げを牽引！（報奨金 +8 CR / 体力-12）',
    skillCondition: {
      skill: 'execution',
      threshold: 3,
      bonusDrawCount: 1,
      description: '【実行】3pt以上で仕事カードドロー +1枚！'
    }
  },
  {
    id: 2,
    name: '業務改善・自動化の推進',
    category: '仕事',
    deck: 'work',
    skillPt: 1,
    moneyEffect: 6,
    healthEffect: -8,
    effectDescription: 'プロセスの効率化に貢献。（インセンティブ +6 CR / 体力-8）',
    skillCondition: {
      skill: 'thinking',
      threshold: 3,
      bonusDrawCount: 1,
      description: '【思考】3pt以上で仕事カードドロー +1枚！'
    }
  },
  {
    id: 3,
    name: '社外専門研修への参加',
    category: '学び',
    deck: 'learn',
    skillPt: 2,
    moneyEffect: -5,
    healthEffect: -5,
    effectDescription: '先端ナレッジを習得。（研修費 -5 CR / 体力-5）'
  },
  {
    id: 4,
    name: '資格取得・自己研鑽',
    category: '学び',
    deck: 'learn',
    skillPt: 2,
    moneyEffect: -4,
    healthEffect: -5,
    effectDescription: '専門資格で信頼性を証明。（受験料 -4 CR / 体力-5）',
    skillCondition: {
      skill: 'thinking',
      threshold: 4,
      bonusDrawCount: 1,
      description: '【思考】4pt以上で学びカードドロー +1枚！'
    }
  },
  {
    id: 5,
    name: 'チーム内の衝突・葛藤解決',
    category: '複合',
    deck: 'choice',
    skillPt: 1,
    moneyEffect: 3,
    healthEffect: -10,
    effectDescription: '組織の結束力を高める。（手当 +3 CR / 体力-10）',
    skillCondition: {
      skill: 'interpersonal',
      threshold: 3,
      bonusDrawCount: 1,
      description: '【対人】3pt以上でカードドロー +1枚！'
    }
  },
  {
    id: 6,
    name: '育児・介護・家族の転機',
    category: 'ライフ',
    deck: 'life',
    skillPt: 1,
    moneyEffect: -3,
    healthEffect: 15,
    effectDescription: '大切な人との時間を優先。（支出 -3 CR / 体力+15回復）'
  },
  {
    id: 7,
    name: '地域活動・ボランティア',
    category: 'ライフ',
    deck: 'life',
    skillPt: 1,
    moneyEffect: -2,
    healthEffect: 12,
    effectDescription: '社外での人間関係を拡大。（交通費等 -2 CR / 体力+12回復）',
    skillCondition: {
      skill: 'interpersonal',
      threshold: 3,
      bonusDrawCount: 1,
      description: '【対人】3pt以上でライフカードドロー +1枚！'
    }
  },
  {
    id: 8,
    name: '海外赴任・異文化体験',
    category: '複合',
    deck: 'choice',
    skillPt: 2,
    moneyEffect: 10,
    healthEffect: -15,
    effectDescription: '国際的視野を養う。（海外手当 +10 CR / 体力-15）',
    skillCondition: {
      skill: 'flexibility',
      threshold: 3,
      bonusDrawCount: 1,
      description: '【柔軟】3pt以上でカードドロー +1枚！'
    }
  },
  {
    id: 9,
    name: '副業・プロボノへの挑戦',
    category: '複合',
    deck: 'choice',
    skillPt: 1,
    moneyEffect: 7,
    healthEffect: -10,
    effectDescription: '新たな才能を開花！（副業収入 +7 CR / 体力-10 / コース変更可能）',
    canChangeCourse: true,
    skillCondition: {
      skill: 'flexibility',
      threshold: 4,
      bonusDrawCount: 1,
      description: '【柔軟】4pt以上でカードドロー +1枚！'
    }
  },
  {
    id: 10,
    name: '突然の部署異動',
    category: '環境',
    deck: 'work',
    skillPt: 1,
    moneyEffect: 2,
    healthEffect: -12,
    effectDescription: '予期せぬ環境変化！（準備金 +2 CR / 体力-12 / 「柔軟」スキル強制）',
    isSpecialSkillAlloc: 'flexibility'
  },
  {
    id: 11,
    name: 'メンター・後輩の指導',
    category: '対人',
    deck: 'choice',
    skillPt: 1,
    moneyEffect: 4,
    healthEffect: -5,
    effectDescription: '次世代を育成。（指導手当 +4 CR / 体力-5）',
    skillCondition: {
      skill: 'interpersonal',
      threshold: 4,
      bonusDrawCount: 1,
      description: '【対人】4pt以上でカードドロー +1枚！'
    }
  },
  {
    id: 12,
    name: '長期休暇・リフレッシュ（ゴール）',
    category: 'ライフ',
    deck: 'life',
    skillPt: 0,
    moneyEffect: 20,
    healthEffect: 35,
    effectDescription: 'これまでの歩みを振り返る総仕上げ！（特別ボーナス +20 CR / 体力+35回復）',
    directCubeReward: true
  }
];
