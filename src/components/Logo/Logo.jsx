import React from 'react';

import logoImg from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css';

const logo = ({children}) => (
  <div className={styles.Logo}>
    <img src={logoImg} alt="MyBurger" />
  </div>
);

export default logo;
