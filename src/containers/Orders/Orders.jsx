import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders }  from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render () {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order 
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ))
    }
    return (orders);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(fetchOrders(token))
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    token: state.auth.token,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
