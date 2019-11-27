import moment from 'moment';

const mapping = {
  plainTimes: '预计工时',
  realTimes: '实际工时',
  progress: '进度(%)',
  module: '模块',
  owner: '指派给',
};

const client = [
  {
    name: '前端',
    type: 'frontEnd',
    member: ['希曼', '暨康', '霄强', '韩学良'],
  },
  {
    name: '后端',
    type: 'backEnd',
    member: ['迦妮', '晓禹', '楚岸', '呼伦', '成丰', '王剑威'],
  },
];

const clientPlat = ['前端', '后端', '总计'];

const planDays = 22;
const startDate = '2019-10-09';

// const clinetLineName = [
//   {
//     text: '前端进度',
//     key: 'frontEnd',
//   },
//   {
//     text: '后端进度',
//     key: 'backEnd',
//   },
//   {
//     text: '总体进度',
//     key: 'all',
//   },
// ];

const getAllProgress = (taskArray) => {
  const allTimes: any = taskArray.reduce((pre, cur) => {
    return pre + Number(cur.plainTime) * 100;
  }, 0);
  const realTimes: any = taskArray.reduce((pre, cur) => {
    return pre + ((Number(cur.plainTime) * Number(cur.progress) / 100)) * 100;
  }, 0);

  const allProgress = {
    title: '总计',
    time: allTimes / 100,
    real: realTimes / 100,
    progress: (realTimes / allTimes * 100).toFixed(2),
  };
  return allProgress;
};

const getClientProgress = (taskData) => {
  const clientTimes: any = client.map(val => {
    const all = taskData.reduce((pre, cur) => {
      return val.member.includes(cur.owner) ? pre + Number(cur.plainTime) * 100 : pre;
    }, 0);
    const real = taskData.reduce((pre, cur) => {
      return val.member.includes(cur.owner) ?
        pre + (Number(cur.plainTime) * Number(cur.progress) / 100) * 100 : pre;
    }, 0);
    return {
      title: val.name,
      type: val.type,
      time: all / 100,
      real: real / 100,
      progress: (real / all * 100).toFixed(2),
    };
  });
  const allProgress = getAllProgress(taskData);
  return clientTimes.concat([allProgress]);
};

const getOwnerProgress = (taskArray = []) => {
  const owners = Array.from(new Set(taskArray.map(val => val.owner)));
  const date = taskArray[0].createTime;
  const ownersTimes: any = owners.map(val => {
    const all = taskArray.reduce((pre, cur) => {
      return cur.owner === val ? pre + Number(cur.plainTime) * 100 : pre;
    }, 0);
    const real = taskArray.reduce((pre, cur) => {
      return cur.owner === val ?
        pre + (Number(cur.plainTime) * Number(cur.progress) / 100) * 100 : pre;
    }, 0);
    return {
      title: val,
      time: all / 100,
      real: real / 100,
      progress: (real / all * 100).toFixed(2),
      plainTimes: (all / 100 / 29 * (moment(date).diff(moment(startDate), 'days') + 1)).toFixed(2),

    };
  });
  return ownersTimes.sort((a1, b1) => b1.time - a1.time);
};

const getModuleProgress = (taskArray) => {
  const modules = Array.from(new Set(taskArray.map(val => val.modules)));
  const modulesTimes: any = modules.map(val => {
    const all = taskArray.reduce((pre, cur) => {
      return cur.modules === val ? pre + Number(cur.plainTime) : pre;
    }, 0);
    const real = taskArray.reduce((pre, cur) => {
      return cur.modules === val ?
        pre + Number(cur.plainTime) * Number(cur.progress) / 100 : pre;
    }, 0);
    return {
      title: val,
      time: all.toFixed(1),
      real: real.toFixed(1),
      progress: (real / all * 100).toFixed(2),
      plainTimes: (all / 29 * (moment().diff(moment(startDate), 'days') + 1)).toFixed(2),
    };
  });
  return modulesTimes.sort((a1, b1) => b1.time - a1.time);
};

// 每天增长进度
const getIncreaseNums = (clientPlat, clineData) => {
  return clientPlat.map(val => {
    const arr = clineData.filter(v11 => v11.showName === val);
    return arr.map((v11, index) => {
      return {
        ...v11,
        nums: index === 0 ? 0 : Number(arr[index].nums) * 100 - Number(arr[index - 1].nums) * 100,
      };
    });
  }).flat().map(v22 => ({
    ...v22,
    nums: v22.nums > 0 ? v22.nums / 100 : 0,
  }));
};

const transferData = (data) => {
  // 统计总体进度
  const taskArray = [...data]; // 总任务列表

  const allProgress = getAllProgress(taskArray);

  // 按模块进度
  const modulesTimes = getModuleProgress(taskArray);

  // 按人员进度
  const ownersTimes = getOwnerProgress(taskArray);

  // 按前后端区分
  const clientTimes = getClientProgress(taskArray);

  // console.log('keys', clientTimes, ownersTimes, modulesTimes, taskArray);

  return {
    allProgress,
    modulesTimes,
    ownersTimes,
    clientTimes,
  };
};

const transferLindData = (data) => {
  const temp = Array.from(new Set(data.map(val => val.createTime)));

  const clineData = [];
  const ownersData = [];
  const moduleData = [];
  temp.forEach(val => {
    const clineTimes = getClientProgress(data.filter(v22 => v22.createTime === val));
    const ownersTimes = getOwnerProgress(data.filter(v22 => v22.createTime === val));
    const moduleTimes = getModuleProgress(data.filter(v22 => v22.createTime === val));

    ownersTimes.forEach(v11 => {
      ownersData.push({
        date: val,
        showName: v11.title,
        nums: v11.progress,
      });
    });
    clineTimes.forEach(v11 => {
      clineData.push({
        date: val,
        showName: v11.title,
        nums: v11.progress,
      });
    });
    moduleTimes.forEach(v11 => {
      moduleData.push({
        date: val,
        showName: v11.title,
        nums: v11.progress,
      });
    });

  });

  const modules = Array.from(new Set(data.map(val => val.modules)));
  const owners = Array.from(new Set(data.map(val => val.owner)));

  const increaseClineData = getIncreaseNums(clientPlat, clineData);
  const increaseModuleData = getIncreaseNums(modules, moduleData);
  const increaseOwnerData = getIncreaseNums(owners, ownersData);


  console.log('data22', moduleData, increaseModuleData, increaseOwnerData);
  return {
    clineData,
    ownersData,
    moduleData,

    increaseClineData,
    increaseModuleData,
    increaseOwnerData,
  };

};

export {
  transferData,
  transferLindData,
};
