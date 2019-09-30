import React from 'react';

// style
import style from './index.less';

interface Iprops {

}

export default class TestAntd extends React.PureComponent<Iprops> {
  render() {
    return (
      <div className={style.content}>
        <div>12312</div>
      </div>
    );
  }
}
