import React from 'react';

import styles from './BuildControl.module.css';

const buildControl = ({label}) => (
  <div className={styles.BuildControl}>
    <div>{label}</div>
    <button className={styles.Less}>Less</button>
    <button className={styles.More}>More</button>
  </div>
);

export default buildControl;
