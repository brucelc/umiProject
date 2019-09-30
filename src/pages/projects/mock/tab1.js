
const allProgress =  0.3; // 总体进度

const moduleProgress = [ // 模块进度
  {
    name: '模块1',
    progress: 0.2,
  },
  {
    name: '模块2',
    progress: 0.2,
  },
  {
    name: '模块3',
    progress: 0.2,
  },
  {
    name: '模块4',
    progress: 0.2,
  }
];

const particiProgress = [ // 参与人进度与工作量
  {
    name: '人员1',
    amount: 20,
    progress: 0.2,
  },
  {
    name: '人员2',
    amount: 20,
    progress: 0.2,
  },
  {
    name: '人员3',
    amount: 20,
    progress: 0.2,
  },
  {
    name: '人员4',
    amount: 20,
    progress: 0.2,
  },
];

const addDemand = [ // 新增需求
  {
    name: '模块1',
    describe: '描述描述描述描述',
    change: 2,
  },
  {
    name: '模块2',
    describe: '描述描述描述描述',
    change: 2,
  },
  {
    name: '模块3',
    describe: '描述描述描述描述',
    change: 2,
  },
  {
    name: '模块4',
    describe: '描述描述描述描述',
    change: 2,
  },
];

const changeDemand = [ // 变更需求
  {
    name: '模块1',
    describe: '描述描述描述描述',
    reason: '变更原因',
    change: 2,
  },
  {
    name: '模块2',
    describe: '描述描述描述描述',
    reason: '变更原因',
    change: 2,
  },
  {
    name: '模块3',
    describe: '描述描述描述描述',
    reason: '变更原因',
    change: 2,
  },
  {
    name: '模块4',
    describe: '描述描述描述描述',
    reason: '变更原因',
    change: 2,
  },
];


export {
  allProgress,
  moduleProgress,
  addDemand,
  particiProgress,
  changeDemand,
};
