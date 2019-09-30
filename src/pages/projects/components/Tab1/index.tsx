/*
 * @Author: bruce.lc
 * @Date: 2019-09-19 22:38:59
 * @Last Modified by: bruce.lc
 */
import React from 'react';
import { Table } from 'antd';

// style
import style from './index.less';

// mock数据
import {
  particiProgress,
  moduleProgress,
  addDemand,
  changeDemand,
} from '../../mock/tab1';

// tslint:disable-next-line:no-empty-interface
interface Iprops {

}

const Tab1: React.SFC<Iprops> = (data: Iprops) => {

  const moduleProgressColumns = [
    {
      title: '模块',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
    },
  ];

  const particiProgressColumns = [
    {
      title: '人员',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '工作量评估',
      dataIndex: 'amount',
      key: 'progress',
    },
    {
      title: '完成度',
      dataIndex: 'progress',
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

  return (
    <div className={style.tab1}>
      <div className={style.top}>
        <div className={style.left} >
          <h3>总体进度</h3>
          <div>图表站位</div>
        </div>
        <div className={style.middle}>
          <h3>项目风险</h3>
          <div className={style.content}>
            <Table
              columns={moduleProgressColumns}
              dataSource={moduleProgress}
              pagination={false}
            />

            <Table
              columns={particiProgressColumns}
              dataSource={particiProgress}
              pagination={false}
            />
          </div>
        </div>
        <div className={style.right}>
          <h3>总体工作量变化</h3>
          <div>图标站位</div>
        </div>
      </div>

      <div className={style.bottom}>
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
      </div>
    </div>
  );
};

export default Tab1;
