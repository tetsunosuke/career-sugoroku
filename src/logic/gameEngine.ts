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
  generation: GenerationConfig,
  course: CourseConfig
): PlayerState {
  return {
    character,
    generation,
    course,
    position: 0,
    stats4L: { ...generation.initial4L },
    skills: { ...generation.initialSkills }
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

  // CHAR_C (リツコ) の変換補正
  if (character.id === 'CHAR_C') {
    pt += 1;
  }

  // RIASEC 1.5倍補正
  if (character.favoredSkill === skill) {
    pt = Math.floor(pt * 1.5);
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
export function getDrawCount(gen: GenerationConfig, course: CourseConfig, deckType: DeckType): { drawCount: number; selectCount: number; multiplier: number } {
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

  return { drawCount, selectCount, multiplier };
}

/**
 * 協力プロジェクトの達成条件を満たしているかチェック
 */
export function canCompleteProject(skills: PortableSkills, project: CoOpProject): boolean {
  if (project.isCompleted) return false;
  
  for (const [skillKey, reqVal] of Object.entries(project.reqSkills)) {
    const key = skillKey as SkillType;
    if ((skills[key] || 0) < (reqVal || 0)) {
      return false;
    }
  }
  return true;
}
