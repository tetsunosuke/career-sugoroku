import type {
  Character,
  GenerationConfig,
  CourseConfig,
  PlayerState,
  PortableSkills,
  FourLStats,
  SkillType,
  DeckType,
  Card4L,
  CoOpProject
} from '../types/game';
import { WORK_DECK, LEARN_DECK, LIFE_DECK } from '../data/decks';

export function createInitialPlayer(
  character: Character,
  generation: GenerationConfig & { initialMoney?: number; initialHealth?: { current: number; max: number } },
  course: CourseConfig
): PlayerState {
  const initialMoney = generation.initialMoney ?? 20;
  const initialHealth = generation.initialHealth ?? { current: 100, max: 100 };

  return {
    character,
    generation,
    course,
    position: 0,
    stats4L: { ...generation.initial4L },
    skills: { ...generation.initialSkills },
    money: initialMoney,
    health: { ...initialHealth },
    paidLeaves: { used: 0, max: 3 }
  };
}

/**
 * RIASECキャラ得意スキル1.5倍（端数切り捨て）補正
 */
export function computeSkillPoints(
  character: Character,
  skill: SkillType,
  basePt: number,
  course: CourseConfig
): number {
  let pt = basePt;
  
  // ベンチャーコース補正：獲得スキルpt +1
  if (course.id === 'venture') {
    pt += 1;
  }

  // CHAR_C (チヒロ) の変換補正
  if (character.id === 'CHAR_C') {
    pt += 1;
  }

  // RIASEC 得意スキル +1 ボーナス
  if (character.favoredSkill === skill) {
    pt += 1;
  }

  return Math.max(1, pt);
}

/**
 * デッキから指定枚数をランダムにドロー
 */
export function getDeckCards(deckType: DeckType, count: number): Card4L[] {
  let pool: Card4L[] = [];
  if (deckType === 'work') pool = WORK_DECK;
  else if (deckType === 'learn') pool = LEARN_DECK;
  else if (deckType === 'life') pool = LIFE_DECK;
  else pool = [...WORK_DECK, ...LEARN_DECK, ...LIFE_DECK];

  // シャッフルして取得
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * 年代およびコースに基づいたドロー枚数を決定
 */
export function getDrawCount(
  gen: GenerationConfig,
  course: CourseConfig,
  deckType: DeckType,
  skills?: PortableSkills,
  tile?: BoardTile
): { drawCount: number; selectCount: number; multiplier: number; skillBonusApplied: boolean; skillBonusText?: string } {
  let drawCount = 2;
  let selectCount = 2;
  let multiplier = 1;

  if (gen.id === '20s') {
    drawCount = 2;
    selectCount = 2;
    multiplier = 1;
  } else if (gen.id === '30s') {
    drawCount = 3;
    selectCount = 2;
    multiplier = 1;
  } else if (gen.id === '40s_50s') {
    drawCount = 2;
    selectCount = 1;
    multiplier = 2; // 効果2倍！
  }

  // 大手企業コース：「学び」デッキドロー枚数 +1
  if (course.id === 'enterprise' && (deckType === 'learn' || deckType === 'any')) {
    drawCount += 1;
  }

  // ポータブルスキルの条件判定によるドロー加算
  let skillBonusApplied = false;
  let skillBonusText: string | undefined = undefined;

  if (skills && tile && tile.skillCondition) {
    const { skill, threshold, bonusDrawCount, description } = tile.skillCondition;
    if ((skills[skill] || 0) >= threshold) {
      drawCount += bonusDrawCount;
      skillBonusApplied = true;
      skillBonusText = description;
    }
  }

  return { drawCount, selectCount, multiplier, skillBonusApplied, skillBonusText };
}

/**
 * 協力プロジェクトの達成条件を満たしているかチェック (スキル, 資金, 体力)
 */
export function canCompleteProject(player: PlayerState, project: CoOpProject): boolean {
  if (project.isCompleted) return false;
  
  // 1. 必要スキルのチェック
  for (const [skillKey, reqVal] of Object.entries(project.reqSkills)) {
    const key = skillKey as SkillType;
    if ((player.skills[key] || 0) < (reqVal || 0)) {
      return false;
    }
  }

  // 2. 必要資金のチェック
  if (project.reqMoney && player.money < project.reqMoney) {
    return false;
  }

  // 3. 必要体力のチェック
  if (project.reqHealth && player.health.current < project.reqHealth) {
    return false;
  }

  return true;
}

/**
 * ランダムに1つのポータブルスキルを取得 (Labor獲得時の偶発的成長)
 */
export function getRandomSkill(): { key: SkillType; label: string } {
  const skills: { key: SkillType; label: string }[] = [
    { key: 'interpersonal', label: '対人' },
    { key: 'thinking', label: '思考' },
    { key: 'execution', label: '実行' },
    { key: 'flexibility', label: '柔軟' }
  ];
  const idx = Math.floor(Math.random() * skills.length);
  return skills[idx];
}
