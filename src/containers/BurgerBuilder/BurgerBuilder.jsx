import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirectPath } from '../../store/actions';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingKey => ingredients[ingKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
    this.props.onInitPurchase();
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded} 
            ingredientRemoved={this.props.onIngredientRemoved} 
            disabled={disabledInfo} 
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.props.price} 
        />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
