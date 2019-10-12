import React from 'react';
import Aux from '../../hoc/Aux/Aux';

import styles from './Layout.module.css';

const layout = ({ children }) => (
  <Aux>
    <div>Toolbar, Siderdrawer, backdrop</div>
    <main className={styles.Content}>
      {children}
    </main>
  </Aux>
);

export default layout;
