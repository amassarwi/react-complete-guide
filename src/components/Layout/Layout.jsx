import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ({ children }) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <div>Toolbar, Siderdrawer, backdrop</div>
    <main className={styles.Content}>
      {children}
    </main>
  </Aux>
);

export default layout;
