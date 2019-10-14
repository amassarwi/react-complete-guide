import React from 'react';

import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ({closed, open}) => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
