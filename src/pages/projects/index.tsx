/*
 * @Author: bruce.lc
 * @Date: 2019-08-01 15:43:21
 * @Last Modified by: bruce.lc
 */
import React, { PureComponent } from 'react';

import { mtop } from '../../utils/request';

// component
import Tab1 from './components/Tab1';

// style
import style from './index.less';

interface Iprops {

}

export default class Projects extends PureComponent<Iprops> {


  componentDidMount() {
    mtop('po.overview.progress.all', { sprintId: 1 }).then(res => {
      console.log('res', res);
    });
  }

  render() {
    return (
      <div className={style.main}>
        <Tab1 />
      </div>
    );
  }
}
