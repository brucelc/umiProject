/*
 * @Author: bruce.lc
 * @Date: 2019-09-19 22:38:59
 * @Last Modified by: bruce.lc
 */
import React from 'react';
import { Table } from 'antd';

// component
import AllProgress from '../AllProgress';
import AllTimeChanges from '../AllTimeChanges';

// style
import style from './index.less';

// mock数据
import {
  allProgressData,
  particiProgress,
  moduleProgress,
  addDemand,
  changeDemand,
} from '../../mock/tab1';

// tslint:disable-next-line:no-empty-interface
interface Iprops {
  allProgress: any,
  modulesTimes: any,
  ownersTimes: any,
  clientTimes: any,
}

const allProgressColumns = [
  {
    title: '明细',
    dataIndex: 'name',
    width: 70,
    key: 'name',
  },
  {
    title: '工作量',
    dataIndex: 'time',
    width: 80,
    key: 'time',
  },
  {
    title: '完成量',
    dataIndex: 'real',
    width: 80,
    key: 'real',
  },
  {
    title: '进度',
    dataIndex: 'progress',
    width: 70,
    key: 'progress',
  },
];


const addDemandColumns = [
  {
    title: '模块',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '需求描述',
    dataIndex: 'describe',
    key: 'describe',
  },
  {
    title: '工作量变更',
    dataIndex: 'change',
    key: 'change',
  },
];

const changeDemandColumns = [
  {
    title: '需求描述',
    dataIndex: 'describe',
    key: 'describe',
  },
  {
    title: '变更原因',
    dataIndex: 'reason',
    key: 'reason',
  },
  {
    title: '工作量变更',
    dataIndex: 'change',
    key: 'change',
  },
];

const Tab1: React.SFC<Iprops> = (data: Iprops) => {
  const moduleProgressColumns = (allProgress) => [
    {
      title: '模块',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '工作量',
      dataIndex: 'time',
      key: 'time',
      width: 80,
    },
    {
      title: '预计完成量',
      dataIndex: 'plainTimes',
      key: 'plainTimes',
      width: 100,
    },
    {
      title: '实际完成量',
      dataIndex: 'real',
      key: 'real',
      width: 100,
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 70,
      render: (current) => {
        return (
          <div
            className={Number(current.replace('%', '')) - Number(allProgress) < 1 ?
            style.warning : ''}
          >{current}</div>
        );
      },
    },
  ];
  const getParticiProgressColumns = (allProgress) => {
    return [
      {
        title: '人员',
        dataIndex: 'name',
        key: 'name',
        width: 90,
      },
      {
        title: '工作量',
        dataIndex: 'time',
        key: 'time',
        width: 80,
      },
      {
        title: '预计完成量',
        dataIndex: 'plainTimes',
        key: 'plainTimes',
        width: 100,
      },
      {
        title: '实际完成量',
        dataIndex: 'real',
        key: 'real',
        width: 100,
      },
      {
        title: '进度',
        dataIndex: 'progress',
        key: 'progress',
        width: 70,
        render: (current, record) => {
          console.log('record', record);
          return (
            <div
              className={Number(record.plainTimes) - Number(record.real) > 1 ?
              style.warning : ''}
            >{current}</div>
          );
        },
      },
    ];
  };


  const {
    allProgress,
    modulesTimes,
    ownersTimes,
    clientTimes,
  } = data;

  console.log('allProgress', allProgress);

  return (
    <div className={style.tab1}>
      <div className={style.top}>
        <div className={style.left} >
          <h3>总体进度</h3>
          <AllProgress allProgress={allProgress} />
        </div>
        <div className={style.middle}>
          <h3>项目工作量明细</h3>
          <div className={style.content}>
            <Table
              columns={allProgressColumns}
              dataSource={clientTimes.map(val => ({
                ...val,
                name: val.title,
                progress: `${val.progress}%`,
              }))}
              bordered={true}
              pagination={false}
            />

            <Table
              columns={moduleProgressColumns(allProgress.progress)}
              dataSource={modulesTimes.map(val => ({
                ...val,
                name: val.title,
                progress: `${val.progress}%`,
              }))}
              bordered={true}
              pagination={false}
            />

            <Table
              columns={getParticiProgressColumns(allProgress.progress)}
              dataSource={ownersTimes.map(val => ({
                ...val,
                name: val.title,
                progress: `${val.progress}%`,
              }))}
              bordered={true}
              pagination={false}
            />


          </div>
        </div>
        {/* <div className={style.right}>
          <h3>总体工作量变化</h3>
          <AllTimeChanges />
        </div> */}
      </div>

      {/* <div className={style.bottom}>
        <h3>今日变化</h3>
        <div className={style.content}>
          <div>
            <h4>新增需求</h4>
            <Table
              columns={addDemandColumns}
              dataSource={addDemand}
              pagination={false}
            />
          </div>
          <div>
            <h4>变更需求</h4>
            <Table
              columns={changeDemandColumns}
              dataSource={changeDemand}
              pagination={false}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Tab1;
