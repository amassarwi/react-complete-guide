import React from 'react';

import styles from './NavigationItem.module.css';

const navigationItem = ({children, link, active}) => (
  <li className={styles.NavigationItem}>
    <a href={link}
       className={active ? styles.active : null}>
      {children}
    </a>
  </li>
);

export default navigationItem;
