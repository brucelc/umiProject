import React, { PureComponent } from 'react';
import router from 'umi/router';

import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';

export default class App extends PureComponent {
  constructor(props: any) {
    super(props);
    // 判断是否登陆
    // if (!localStorage.getItem('umiUser')) {
    //   router.push('/login');
    // }
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <Link to="/products">go to /products</Link>
        <ul className={styles.list}>
          <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">
              {formatMessage({ id: 'index.start' })}
            </a>
          </li>
        </ul>
      </div>
    );
  }
};
