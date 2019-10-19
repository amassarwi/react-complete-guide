import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Maxxi',
        address: {
          street: 'Testsdd',
          zipCode: '2232',
          country: 'Palestine'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(() => {
        this.setState({loading: false,});
        this.props.history.push('/');
      })
      .catch(err => this.setState({loading: true,}))
  }

  render () {
    return (
      !this.state.loading ?  <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
          <input className={styles.Input} type="email" name="email" placeholder="Your Mail" />
          <input className={styles.Input} type="text" name="street" placeholder="Street" />
          <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
          <Button type="Success"
                  clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      </div> : <Spinner />
    );
  }
}

export default ContactData;
