import type { Character, GenerationConfig, CourseConfig } from '../types/game';

export const CHARACTERS: Character[] = [
  {
    id: 'CHAR_R',
    name: 'リキヤ',
    riasecType: 'R（現実的）',
    favoredSkill: 'execution',
    description: '現場での即戦力と実務遂行能力に優れる技術思考スペシャリスト。',
    perkText: '「実行」スキル獲得 pt +1 ボーナス ＆ 移動・労働時の体力消費20%軽減',
    avatarUrl: '/images/rikiya.jpg'
  },
  {
    id: 'CHAR_I',
    name: 'イオリ',
    riasecType: 'I（研究的）',
    favoredSkill: 'thinking',
    description: '本質を問い、緻密な構造化と課題発見を得意とするアナリスト。',
    perkText: '「思考」スキル獲得 pt +1 ボーナス ＆ 学びカードの受講費50%割引',
    avatarUrl: '/images/iori.jpg'
  },
  {
    id: 'CHAR_A',
    name: 'アオイ',
    riasecType: 'A（芸術的）',
    favoredSkill: 'flexibility',
    description: '固定概念に囚われず、変化に適応し枠を超えるクリエイター。',
    perkText: '「柔軟」スキル獲得 pt +1 ボーナス ＆ 余暇（Leisure）の体力回復量1.5倍',
    avatarUrl: '/images/aoi.jpg'
  },
  {
    id: 'CHAR_S',
    name: 'ソウタ',
    riasecType: 'S（社会的）',
    favoredSkill: 'interpersonal',
    description: '他者の感情に寄り添い、信頼と巻き込みで協働を促すファシリテーター。',
    perkText: '「対人」スキル獲得 pt +1 ボーナス ＆ 愛（Love）獲得時に体力+10回復ボーナス',
    avatarUrl: '/images/sota.jpg'
  },
  {
    id: 'CHAR_E',
    name: 'エイジ',
    riasecType: 'E（企業的）',
    description: '事業の機会を見出し、人を巻き込んで価値を生み出すアントレプレナー。',
    perkText: '協力プロジェクト達成時、全4L+1 ＆ 報酬資金+5万円ボーナス',
    avatarUrl: '/images/eiji.jpg'
  },
  {
    id: 'CHAR_C',
    name: 'チヒロ',
    riasecType: 'C（慣習的）',
    description: '確実で無駄のないプロセスとリスク管理で組織を安定させるスペシャリスト。',
    perkText: '4L→スキル変換効率+1 ＆ 毎ターン基本手当+2万円獲得',
    avatarUrl: '/images/chihiro.jpg'
  }
];

export interface ExtendedGenerationConfig extends GenerationConfig {
  initialMoney: number;
  initialHealth: { current: number; max: number };
}

export const GENERATIONS: ExtendedGenerationConfig[] = [
  {
    id: '20s',
    name: '20代（自己発見・吸収）',
    initial4L: { labor: 1, learn: 1, love: 1, leisure: 1 },
    initialSkills: { interpersonal: 1, thinking: 1, execution: 2, flexibility: 2 },
    initialMoney: 15, // 15万円
    initialHealth: { current: 100, max: 100 },
    drawRuleText: '指定デッキから2枚引いてそのまま2枚獲得（初期資金15万 / 体力100）'
  },
  {
    id: '30s',
    name: '30代（選択と集中）',
    initial4L: { labor: 2, learn: 1, love: 2, leisure: 1 },
    initialSkills: { interpersonal: 2, thinking: 3, execution: 3, flexibility: 2 },
    initialMoney: 35, // 35万円
    initialHealth: { current: 90, max: 90 },
    drawRuleText: '指定デッキから3枚引いて任意の2枚を選択獲得（初期資金35万 / 体力90）'
  },
  {
    id: '40s_50s',
    name: '40〜50代（熟練・効果倍増）',
    initial4L: { labor: 3, learn: 2, love: 1, leisure: 1 },
    initialSkills: { interpersonal: 4, thinking: 4, execution: 3, flexibility: 3 },
    initialMoney: 60, // 60万円
    initialHealth: { current: 80, max: 80 },
    drawRuleText: '指定デッキから2枚引いて任意の1枚を選択獲得・効果2倍（初期資金60万 / 体力80）'
  }
];

export const COURSES: CourseConfig[] = [
  {
    id: 'venture',
    name: 'ベンチャーコース',
    description: 'マス獲得スキルpt +1。仕事の報酬資金が高い(+3万)が、多忙で体力消費も大きい(-10HP)。'
  },
  {
    id: 'enterprise',
    name: '大手企業コース',
    description: '「学び」ドロー枚数 +1。充実した福利厚生（毎ターン体力+5回復＆基本給安定）。'
  }
];
