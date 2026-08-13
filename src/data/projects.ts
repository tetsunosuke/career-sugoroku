import type { CoOpProject } from '../types/game';

export const COOP_PROJECTS: CoOpProject[] = [
  {
    id: 'proj_dx',
    title: '全社DX推進プロジェクト',
    reqSkills: { thinking: 2, execution: 2 },
    reqMoney: 10,  // 必要資金: 10 CR
    reqHealth: 20, // 必要体力: 20
    reward4L: { labor: 3, learn: 3 },
    rewardMoney: 25,  // 報酬資金: 25 CR
    rewardHealth: 10, // 体力回復: +10
    isCompleted: false,
    description: '全社のレガシーシステム刷新とデータ駆動型カルチャーを構築。（必要資金10 CR / 体力20 / 報酬+25 CR）'
  },
  {
    id: 'proj_global',
    title: 'グローバル新拠点立ち上げ',
    reqSkills: { interpersonal: 2, execution: 2, flexibility: 1 },
    reqMoney: 15,  // 必要資金: 15 CR
    reqHealth: 30, // 必要体力: 30
    reward4L: { labor: 3, leisure: 2 },
    rewardMoney: 40,  // 報酬資金: 40 CR
    rewardHealth: 15,
    isCompleted: false,
    description: '海外新拠点の現地チームを立ち上げ、異文化での事業拡大を成功させる。（必要資金15 CR / 体力30 / 報酬+40 CR）'
  },
  {
    id: 'proj_talent',
    title: '次世代人材育成プラットフォーム',
    reqSkills: { interpersonal: 2, thinking: 1, flexibility: 1 },
    reqMoney: 5,   // 必要資金: 5 CR
    reqHealth: 15, // 必要体力: 15
    reward4L: { learn: 3, love: 3 },
    rewardMoney: 15,  // 報酬資金: 15 CR
    rewardHealth: 20,
    isCompleted: false,
    description: '社員が自律的に学び合い、強みを引き出し合う共創コミュニティを作る。（必要資金5 CR / 体力15 / 報酬+15 CR）'
  }
];
