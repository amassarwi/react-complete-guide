import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"},
];

const buildControls = (props) => (
  <div className={styles.BuildControls}>
    {controls.map((control) => (
      <BuildControl key={control.key} label={control.label} />
    ))}
  </div>
);

export default buildControls;
