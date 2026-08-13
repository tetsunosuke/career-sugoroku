import type { Character, GenerationConfig, CourseConfig } from '../types/game';

export const CHARACTERS: Character[] = [
  {
    id: 'CHAR_R',
    name: 'リキヤ',
    riasecType: 'R（現実的）',
    favoredSkill: 'execution',
    description: '現場での即戦力と実務遂行能力に優れる技術思考スペシャリスト。',
    perkText: '「実行」スキル獲得時、ポイント1.5倍（端数切り捨て）',
    avatarUrl: '/images/rikiya.jpg'
  },
  {
    id: 'CHAR_I',
    name: 'イオリ',
    riasecType: 'I（研究的）',
    favoredSkill: 'thinking',
    description: '本質を問い、緻密な構造化と課題発見を得意とするアナリスト。',
    perkText: '「思考」スキル獲得時、ポイント1.5倍（端数切り捨て）',
    avatarUrl: '/images/iori.jpg'
  },
  {
    id: 'CHAR_A',
    name: 'アオイ',
    riasecType: 'A（芸術的）',
    favoredSkill: 'flexibility',
    description: '固定概念に囚われず、変化に適応し枠を超えるクリエイター。',
    perkText: '「柔軟」スキル獲得時、ポイント1.5倍（端数切り捨て）',
    avatarUrl: '/images/aoi.jpg'
  },
  {
    id: 'CHAR_S',
    name: 'ソウタ',
    riasecType: 'S（社会的）',
    favoredSkill: 'interpersonal',
    description: '他者の感情に寄り添い、信頼と巻き込みで協働を促すファシリテーター。',
    perkText: '「対人」スキル獲得時、ポイント1.5倍（端数切り捨て）',
    avatarUrl: '/images/sota.jpg'
  },
  {
    id: 'CHAR_E',
    name: 'エイジ',
    riasecType: 'E（企業的）',
    description: '事業の機会を見出し、人を巻き込んで価値を生み出すアントレプレナー。',
    perkText: '協力プロジェクト達成時、獲得4Lが全項目 +1',
    avatarUrl: '/images/eiji.jpg'
  },
  {
    id: 'CHAR_C',
    name: 'チヒロ',
    riasecType: 'C（慣習的）',
    description: '確実で無駄のないプロセスとリスク管理で組織を安定させるスペシャリスト。',
    perkText: '4Lからスキルへの変換効率補正（スキル割り振りに+1ボーナス）',
    avatarUrl: '/images/chihiro.jpg'
  }
];

export const GENERATIONS: GenerationConfig[] = [
  {
    id: '20s',
    name: '20代（自己発見・吸収）',
    initial4L: { labor: 1, learn: 1, love: 1, leisure: 1 },
    initialSkills: { interpersonal: 1, thinking: 1, execution: 2, flexibility: 2 },
    drawRuleText: '指定デッキから2枚引いてそのまま2枚獲得（無条件獲得）'
  },
  {
    id: '30s',
    name: '30代（選択と集中）',
    initial4L: { labor: 2, learn: 1, love: 2, leisure: 1 },
    initialSkills: { interpersonal: 2, thinking: 3, execution: 3, flexibility: 2 },
    drawRuleText: '指定デッキから3枚引いて任意の2枚を選択獲得'
  },
  {
    id: '40s_50s',
    name: '40〜50代（熟練・効果倍増）',
    initial4L: { labor: 3, learn: 2, love: 1, leisure: 1 },
    initialSkills: { interpersonal: 4, thinking: 4, execution: 3, flexibility: 3 },
    drawRuleText: '指定デッキから2枚引いて任意の1枚を選択獲得（効果2倍！）'
  }
];

export const COURSES: CourseConfig[] = [
  {
    id: 'venture',
    name: 'ベンチャーコース',
    description: 'マス獲得スキルpt +1。展開がスピーディでトラブルや挑戦機会が多い環境。'
  },
  {
    id: 'enterprise',
    name: '大手企業コース',
    description: '「学び」デッキを引いた際ドロー枚数 +1。充実した制度と安定した成長機会。'
  }
];
