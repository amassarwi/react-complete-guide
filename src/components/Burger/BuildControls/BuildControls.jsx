import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"},
];

const buildControls = ({ingredientAdded, ingredientRemoved, disabled}) => (
  <div className={styles.BuildControls}>
    {controls.map((control) => (
      <BuildControl disabled={disabled[control.type]} key={control.key} label={control.label} added={() => ingredientAdded(control.type)} removed={() => ingredientRemoved(control.type)} />
    ))}
  </div>
);

export default buildControls;
