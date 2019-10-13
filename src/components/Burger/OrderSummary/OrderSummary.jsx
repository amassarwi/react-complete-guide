import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = ({ingredients, purchaseCanceled, purchaseContinue, price}) => {
  const ingredientSummary = Object.keys(ingredients)
    .map((ingKey) => {
      return <li key={ingKey}><span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {ingredients[ingKey]}</li>
    })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button type="Danger" clicked={purchaseCanceled}>
        Cancel
      </Button>
      <Button type="Success" clicked={purchaseContinue}>
        Continue
      </Button>
    </Aux>
  );
}

export default orderSummary;
