import React from 'react';
import styles from './index.less';

const PrimaryLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default PrimaryLayout;
