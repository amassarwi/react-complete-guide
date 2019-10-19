import React from 'react';
import styles from './Order.module.css';

const order = ({ingredients, price}) => {
  const ingredientsList = [];
  for (let ingredientName in ingredients) {
    ingredientsList.push({
      amount: ingredients[ingredientName],
      name: ingredientName,
    })
  }

  let ingredientsOutput = ingredientsList.map(ig => {
    return <span 
      style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
      key={ig.name}>{ig.name} ({ig.amount})</span>
  })

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {price}</strong></p>
    </div>
  );
}

export default order;
