import React from "react";

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ({ingredients}) => {
  const transformedInredients = Object.keys(ingredients)
    .map((ingredientKey) => {
      return [
        ...Array(ingredients[ingredientKey])
      ].map((_, i) => <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />);
    });
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedInredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
