import React from 'react';

import styles from './Button.module.css';

const button = ({children, clicked, btnType, disabled}) => (
  <button className={[styles.Button, styles[btnType]].join(' ')} 
          onClick={clicked}
          disabled={disabled}
  >
    {children}
  </button>
);

export default button;
