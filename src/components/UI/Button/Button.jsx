import React from 'react';

import styles from './Button.module.css';

const button = ({children, clicked, type}) => (
  <button className={[styles.Button, styles[type]].join(' ')} 
          onClick={clicked}
  >
    {children}
  </button>
);

export default button;
