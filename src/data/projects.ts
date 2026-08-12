import type { CoOpProject } from '../types/game';

export const COOP_PROJECTS: CoOpProject[] = [
  {
    id: 'proj_dx',
    title: '全社DX推進プロジェクト',
    reqSkills: { thinking: 3, execution: 3 },
    reward4L: { labor: 2, learn: 2 },
    isCompleted: false,
    description: '全社のレガシーシステム刷新とデータ駆動型カルチャーを構築する。'
  },
  {
    id: 'proj_global',
    title: 'グローバル新拠点立ち上げ',
    reqSkills: { interpersonal: 4, execution: 3, flexibility: 2 },
    reward4L: { labor: 3, leisure: 1 },
    isCompleted: false,
    description: '海外新拠点の現地チームを立ち上げ、異文化での事業拡大を成功させる。'
  },
  {
    id: 'proj_talent',
    title: '次世代人材育成プラットフォーム',
    reqSkills: { interpersonal: 3, thinking: 2, flexibility: 2 },
    reward4L: { learn: 2, love: 2 },
    isCompleted: false,
    description: '社員が自律的に学び合い、強みを引き出し合う共創コミュニティを作る。'
  }
];
