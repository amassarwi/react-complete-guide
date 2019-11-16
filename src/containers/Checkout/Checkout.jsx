import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({purchased, ings, match, history}) => {

  const checkoutCancelledHandler = () => {
    history.goBack();
  }

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data');
  }

    let summary = <Redirect to="/" />
    if (ings) {
      const purchasedRedicret = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedicret}
          <CheckoutSummary 
          ingredients={ings}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCancelled={checkoutCancelledHandler} />
          <Route 
            path={match.path + '/contact-data'}
            component={ContactData} />
        </div>
      );
    }
    return (
        summary
    );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
