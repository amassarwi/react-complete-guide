import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"},
];

const buildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price,
  purchasable
}) => (
  <div className={styles.BuildControls}>
    <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
    {controls.map((control) => (
      <BuildControl disabled={disabled[control.type]} key={control.key} label={control.label} added={() => ingredientAdded(control.type)} removed={() => ingredientRemoved(control.type)} />
    ))}
    <button className={styles.OrderButton}
            disabled={!purchasable}
    >
      Order now
      </button>
  </div>
);

export default buildControls;
