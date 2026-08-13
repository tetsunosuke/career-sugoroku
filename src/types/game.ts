export type FourLType = 'labor' | 'learn' | 'love' | 'leisure';

export interface FourLStats {
  labor: number;
  learn: number;
  love: number;
  leisure: number;
}

export type SkillType = 'interpersonal' | 'thinking' | 'execution' | 'flexibility';

export interface PortableSkills {
  interpersonal: number; // 対人
  thinking: number;      // 思考
  execution: number;     // 実行
  flexibility: number;   // 柔軟
}

export type CharacterId = 'CHAR_R' | 'CHAR_I' | 'CHAR_A' | 'CHAR_S' | 'CHAR_E' | 'CHAR_C';

export interface Character {
  id: CharacterId;
  name: string;
  riasecType: string;
  favoredSkill?: SkillType;
  description: string;
  perkText: string;
  avatarUrl: string;
}

export type Generation = '20s' | '30s' | '40s_50s';

export interface GenerationConfig {
  id: Generation;
  name: string;
  initial4L: FourLStats;
  initialSkills: PortableSkills;
  drawRuleText: string;
}

export type CourseType = 'venture' | 'enterprise';

export interface CourseConfig {
  id: CourseType;
  name: string;
  description: string;
}

export type DeckType = 'work' | 'learn' | 'life' | 'any';

export interface Card4L {
  id: string;
  deck: DeckType;
  stats: Partial<FourLStats>;
  moneyEffect?: number;  // 資金変動 (例: +5万 / -3万)
  healthEffect?: number; // 体力変動 (例: +10 / -15)
  title?: string;
  description?: string;
}

export interface SkillRequirement {
  skill: SkillType;
  threshold: number;
  bonusDrawCount: number;
  description: string;
}

export interface BoardTile {
  id: number;
  name: string;
  category: string;
  deck: DeckType | 'choice';
  skillPt: number;
  moneyEffect?: number;
  healthEffect?: number;
  effectDescription: string;
  isSpecialSkillAlloc?: SkillType; // 例: 10番マス柔軟強制
  canChangeCourse?: boolean;       // 例: 9番マスコース変更
  directCubeReward?: boolean;       // 例: 12番マス直獲得
  skillCondition?: SkillRequirement; // ポータブルスキル条件判定によるドローボーナス
}

export interface CoOpProject {
  id: string;
  title: string;
  reqSkills: Partial<PortableSkills>;
  reqMoney?: number;
  reqHealth?: number;
  reward4L: Partial<FourLStats>;
  rewardMoney?: number;
  rewardHealth?: number;
  isCompleted: boolean;
  description: string;
}

export type GamePhase =
  | 'SETUP'
  | 'ROLL'
  | 'MOVING'
  | 'TILE_ARRIVAL'
  | 'DRAW_SELECTION'
  | 'SKILL_ALLOCATION'
  | 'PROJECT_CHECK'
  | 'BURNOUT_REST'
  | 'GAME_OVER';

export interface GameLog {
  turn: number;
  message: string;
  type: 'info' | 'move' | 'card' | 'skill' | 'project' | 'warn';
  timestamp: string;
}

export type ActionStance = 'normal' | 'hardwork' | 'vacation';

export interface PlayerState {
  character: Character;
  generation: GenerationConfig;
  course: CourseConfig;
  position: number;
  stats4L: FourLStats;
  skills: PortableSkills;
  money: number; // 資金 (CR)
  health: {
    current: number; // 現在の体力
    max: number;     // 最大体力
  };
  paidLeaves: {
    used: number; // 消化した有給回数
    max: number;  // 全体での上限回数（3回）
  };
}
