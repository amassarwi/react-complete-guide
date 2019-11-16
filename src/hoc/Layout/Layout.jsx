import React, { useState } from 'react';
import { connect } from 'react-redux'; 

import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ({isAuthenticated, children}) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }
    return (
      <Aux>
        <Toolbar 
          isAuth={isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer 
          isAuth={isAuthenticated}
          open={showSideDrawer} 
          closed={sideDrawerClosedHandler} />
        <div>Toolbar, Siderdrawer, backdrop</div>
        <main className={styles.Content}>
          {children}
        </main>
      </Aux>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
