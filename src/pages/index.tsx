import React, { PureComponent } from 'react';

import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';

import styles from './index.less';

export default class App extends PureComponent {

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <Link to="/products">go to /products</Link><br />
        <Link to="/login">go to /login</Link>
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
}
