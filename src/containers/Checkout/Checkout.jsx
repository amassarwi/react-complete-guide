import React , { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let [key, value] of query.entries()) {
      ingredients[key] = +value;
    }

    this.setState({ingredients: ingredients});
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler} />
      </div>
    );
  }
}

export default Checkout;
