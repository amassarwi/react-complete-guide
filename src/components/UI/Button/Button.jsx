import React from 'react';

import styles from './Button.module.css';

const button = ({children, clicked, type, disabled}) => (
  <button className={[styles.Button, styles[type]].join(' ')} 
          onClick={clicked}
          disabled={disabled}
  >
    {children}
  </button>
);

export default button;
