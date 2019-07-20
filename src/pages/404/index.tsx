import React from 'react'
import { Icon } from 'antd'
import styles from './index.less'

const Error = () => (
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>404 Not Found1</h1>
  </div>
)

export default Error
