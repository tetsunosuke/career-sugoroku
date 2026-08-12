import type { CoOpProject } from '../types/game';

export const COOP_PROJECTS: CoOpProject[] = [
  {
    id: 'proj_dx',
    title: '全社DX推進プロジェクト',
    reqSkills: { thinking: 2, execution: 2 },
    reward4L: { labor: 3, learn: 3 },
    isCompleted: false,
    description: '全社のレガシーシステム刷新とデータ駆動型カルチャーを構築する。'
  },
  {
    id: 'proj_global',
    title: 'グローバル新拠点立ち上げ',
    reqSkills: { interpersonal: 2, execution: 2, flexibility: 1 },
    reward4L: { labor: 3, leisure: 2 },
    isCompleted: false,
    description: '海外新拠点の現地チームを立ち上げ、異文化での事業拡大を成功させる。'
  },
  {
    id: 'proj_talent',
    title: '次世代人材育成プラットフォーム',
    reqSkills: { interpersonal: 2, thinking: 1, flexibility: 1 },
    reward4L: { learn: 3, love: 3 },
    isCompleted: false,
    description: '社員が自律的に学び合い、強みを引き出し合う共創コミュニティを作る。'
  }
];
