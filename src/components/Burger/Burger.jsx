import React from "react";

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ({ingredients}) => {
  let transformedInredients = Object.keys(ingredients)
    .map((ingredientKey) => [
        ...Array(ingredients[ingredientKey])
    ]
    .map((_, i) => <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />))
    .reduce((arr, el) => arr.concat(el), []);
  if(transformedInredients.length === 0) {
    transformedInredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedInredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
