import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: '',
      },
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    }

    axios.post('/orders.json', order)
      .then(() => {
        this.setState({loading: false,});
        this.props.history.push('/');
      })
      .catch(err => this.setState({loading: true,}))
  }

  inputChangedHandler = (event, inputName) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormEl = {
      ...updatedOrderForm[inputName]
    };

    updatedFormEl.value = event.target.value;
    updatedOrderForm[inputName] = updatedFormEl;
    this.setState({ orderForm : updatedOrderForm });
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    return (
      !this.state.loading ?  <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {
            formElementsArray.map(el => 
              <Input 
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                key={el.id}
                changed={(event) => this.inputChangedHandler(event, el.id)} />
            )
          }
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
