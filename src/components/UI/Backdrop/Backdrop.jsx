import React from 'react';

import styles from './Backdrop.module.css';

const backdrop = ({show, clicked}) => (
  show ? <div className={styles.Backdrop} onClick={clicked}></div> : null
);

export default backdrop;
