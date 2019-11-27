import React from 'react';

// component
import LineChart from '../LineChart';

// style
import style from './index.less';

// mock
// import { data } from '../../mock/data';

interface Iprops {
  clineData: any,
  ownersData: any,
  moduleData: any,
  increaseClineData: any,
  increaseModuleData: any,
  increaseOwnerData: any,
}

export default class Tab2 extends React.PureComponent<Iprops> {
  render() {
    const {
      clineData,
      ownersData,
      moduleData,

      increaseClineData,
      increaseModuleData,
      increaseOwnerData,
    } = this.props;

    return (
      <div>
        <h3>总趋势图</h3>
        <div className={style.items}>
          <LineChart
            data={clineData.map(val => ({
              ...val,
              showName: `${val.showName}进度百分比`,
            }))}
            dashPropName={[]}
            unit="%"
          />
          <LineChart
            data={increaseClineData.map(val => ({
              ...val,
              showName: `${val.showName}增长量`,
            }))}
            dashPropName={[]}
            unit="%"
          />
        </div>
        <h3>按业务模块趋势图</h3>
        <div  className={style.items}>
          <LineChart
            data={moduleData}
            dashPropName={[]}
            unit="%"
          />
          <LineChart
            data={increaseModuleData}
            dashPropName={[]}
            unit="%"
          />
        </div>
        <h3>按人员趋势图</h3>
        <div  className={style.items}>
          <LineChart
            data={ownersData}
            dashPropName={[]}
            unit="%"
          />
          <LineChart
            data={increaseOwnerData}
            dashPropName={[]}
            unit="%"
          />
        </div>
      </div>
    );
  }
}
