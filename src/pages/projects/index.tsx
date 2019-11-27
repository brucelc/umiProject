/*
 * @Author: bruce.lc
 * @Date: 2019-08-01 15:43:21
 * @Last Modified by: bruce.lc
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { axios } from '../../utils/request';
import {
  transferData,
  transferLindData,
} from './utils';

// component
import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';

// style
import style from './index.less';

interface Iprops {

}

export default class Projects extends PureComponent<Iprops> {
  state = {
    updateTime: '',
    allProgress: {},
    modulesTimes: [],
    ownersTimes: [],
    clientTimes: [],
    list: [],
    clineData: [],
    ownersData: [],
    moduleData: [],

    increaseClineData: [],
    increaseModuleData: [],
    increaseOwnerData: [],
  }

  componentDidMount() {
    axios({
      url: 'http://localhost:8081/program',
    }).then(res => {
      console.log('res', res);
      const { list = [] } = res;
      const date = list[list.length - 1].createTime;
      console.log('list', list[list.length - 1].createTime);
      // const date = "2019-10-10";
      const todayData = list.filter(val => val.createTime === date);
      console.log('todayData', todayData.filter(val => val.owner === '暨康'));
      const {
        allProgress,
        modulesTimes,
        ownersTimes,
        clientTimes,
      } = transferData(todayData.filter(val => val.status !== '已取消'));

      console.log('todayData', todayData, allProgress, ownersTimes);

      const {
        clineData,
        ownersData,
        moduleData,
        increaseClineData,
        increaseModuleData,
        increaseOwnerData,
      } = transferLindData(list.filter(val => val.status !== '已取消'));
      this.setState({
        updateTime: date,
        allProgress,
        modulesTimes,
        ownersTimes,
        clientTimes,
        list,
        clineData,
        ownersData,
        moduleData,

        increaseClineData,
        increaseModuleData,
        increaseOwnerData,
      });
    });
  }

  render() {
    const {
      updateTime,
      allProgress,
      modulesTimes,
      ownersTimes,
      clientTimes,
      clineData,
      ownersData,
      moduleData,

      increaseClineData,
      increaseModuleData,
      increaseOwnerData,
    } = this.state;

    const start = '2019-11-07';
    const end = '2019-11-20';
    return (
      <div className={style.main}>
        <div className={style.dates}>
          <div>
            <span>提测日期</span>
            <span>{start}</span>
          </div>
          <div>
            <span>上线日期</span>
            <span>{end}</span>
          </div>
          <div>
            <span>距离提测日期还剩:</span>
            <span>{moment(start).diff(moment(), 'days')}天(包括周六日)</span>
          </div>
          {/* <div>
            <span>距离提测</span>
            <span>{moment(start).diff(moment(), 'days')}</span>
          </div> */}
        </div>
        <div className={style.tips}>数据更新时间:{updateTime}&nbsp;&nbsp;(橙色代表低于预估值)</div>

        <Tab1
          allProgress={allProgress}
          modulesTimes={modulesTimes}
          ownersTimes={ownersTimes}
          clientTimes={clientTimes}
        />
        <Tab2
          clineData={clineData}
          ownersData={ownersData}
          moduleData={moduleData}
          increaseClineData={increaseClineData}
          increaseModuleData={increaseModuleData}
          increaseOwnerData={increaseOwnerData}
        />
      </div>
    );
  }
}
