import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({isAuth}) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">
      Orders
    </NavigationItem>
    {
      !isAuth ? <NavigationItem link="/auth">
        Authenticate
      </NavigationItem> : <NavigationItem link="/auth">
        Authenticate
      </NavigationItem>
    }
    
  </ul>
);

export default navigationItems;
