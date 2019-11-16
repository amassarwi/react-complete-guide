import React, { useEffect } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = ({ token, userId, orders, loading, onFetchOrders }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let ordersComponent = <Spinner />
  if (!loading) {
    ordersComponent = orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price} />
    ))
  }
  return (ordersComponent);
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
