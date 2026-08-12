import type { BoardTile } from '../types/game';

export const BOARD_TILES: BoardTile[] = [
  {
    id: 0,
    name: 'スタート',
    category: 'スタート',
    deck: 'work',
    skillPt: 0,
    effectDescription: 'キャリアの歩みがここから始まります。'
  },
  {
    id: 1,
    name: '新規プロジェクト立ち上げ',
    category: '仕事',
    deck: 'work',
    skillPt: 1,
    effectDescription: '未知の事業立ち上げを牽引し、仕事実績を獲得。',
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
    effectDescription: '既存プロセスの無駄を省き、効率化に貢献。',
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
    effectDescription: '最新の業界動向と先端ナレッジを習得。'
  },
  {
    id: 4,
    name: '資格取得・自己研鑽',
    category: '学び',
    deck: 'learn',
    skillPt: 2,
    effectDescription: '体系的な専門スキルを磨き、信頼性を証明。',
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
    effectDescription: '多様な価値観を調和させ、組織の結束力を高める。（仕事/ライフ選択）',
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
    effectDescription: '大切な人との時間を優先し、人生の深みを増す。'
  },
  {
    id: 7,
    name: '地域活動・ボランティア',
    category: 'ライフ',
    deck: 'life',
    skillPt: 1,
    effectDescription: '社外コミュニティでの貢献から人間関係を拡大。',
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
    effectDescription: '慣れ親しんだ環境を離れ、国際的視野を養う。（仕事/学び選択）',
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
    effectDescription: '社外での挑戦を通じて新たな才能を開花。（任意のデッキドロー＆コース変更可能）',
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
    effectDescription: '予期せぬ環境変化！獲得スキルptは「柔軟」に強制割り振り。',
    isSpecialSkillAlloc: 'flexibility'
  },
  {
    id: 11,
    name: 'メンター・後輩の指導',
    category: '対人',
    deck: 'choice',
    skillPt: 1,
    effectDescription: '次世代を育成し、相手の成長と同時に自己再発見。（学び/ライフ選択）',
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
    effectDescription: 'これまでの歩みを振り返る総仕上げ。任意の4Lキューブを直接1個獲得！',
    directCubeReward: true
  }
];
