import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirectPath } from '../../store/actions';

const BurgerBuilder = ({history}) => {
  const [purchasing, setPurchasing] = useState(false);

  const {isAuthenticated, error, price, ings} = useSelector(state => {
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null,
    };
  });

  const dispatch = useDispatch();

  const onIngredientAdded = (ingName) => dispatch(addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(purchaseInit());
  const onSetAuthRedirectPath =  (path) => dispatch(setAuthRedirectPath(path));

  const updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingKey => ingredients[ingKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    history.push('/checkout');
    onInitPurchase();
  }

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

    const disabledInfo = {
      ...ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if(ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdded} 
            ingredientRemoved={onIngredientRemoved} 
            disabled={disabledInfo} 
            price={price}
            purchasable={updatePurchasable(ings)}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}
          />
        </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        price={price} 
        />;
    }
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);
