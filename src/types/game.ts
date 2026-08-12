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
}

export type Generation = '20s' | '30s' | '40s_50s';

export interface GenerationConfig {
  id: Generation;
  name: string;
  initial4L: FourLStats;
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
  title: string;
  deck: DeckType;
  stats: Partial<FourLStats>;
  description: string;
}

export interface BoardTile {
  id: number;
  name: string;
  category: string;
  deck: DeckType | 'choice';
  skillPt: number;
  effectDescription: string;
  isSpecialSkillAlloc?: SkillType; // 例: 10番マス柔軟強制
  canChangeCourse?: boolean;       // 例: 9番マスコース変更
  directCubeReward?: boolean;       // 例: 12番マス直獲得
}

export interface CoOpProject {
  id: string;
  title: string;
  reqSkills: Partial<PortableSkills>;
  reward4L: Partial<FourLStats>;
  isCompleted: boolean;
  description: string;
}

export type GamePhase =
  | 'SETUP'
  | 'ROLL'
  | 'MOVING'
  | 'DRAW_SELECTION'
  | 'SKILL_ALLOCATION'
  | 'PROJECT_CHECK'
  | 'GAME_OVER';

export interface GameLog {
  turn: number;
  message: string;
  type: 'info' | 'move' | 'card' | 'skill' | 'project' | 'warn';
  timestamp: string;
}

export interface PlayerState {
  character: Character;
  generation: GenerationConfig;
  course: CourseConfig;
  position: number;
  stats4L: FourLStats;
  skills: PortableSkills;
}
