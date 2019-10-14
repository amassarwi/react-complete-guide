import React from 'react';

import styles from './DrawerToggle.module.css';

const drawerToggle = ({clicked}) => (
    <div className={styles.DrawerToggle} onClick={clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
);

export default drawerToggle;
