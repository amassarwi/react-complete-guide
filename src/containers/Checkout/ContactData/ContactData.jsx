import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = ({ ings, price, token, onOrderBurger, loading, userId }) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your country'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your e-mail'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ]
      },
      value: 'fastest',
      valid: true
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: ings,
      price: price,
      orderData: formData,
      userId: userId,
    };
    onOrderBurger(order, token);
  }

  const inputChangedHandler = (event, inputName) => {

    const updatedFormEl = updateObject(orderForm[inputName], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputName].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputName]: updatedFormEl,
    });
    let formIsValid = true;
    for (let inputName in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputName].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setIsFormValid(formIsValid);
  }

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  return (
    !loading ? <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      <form onSubmit={orderHandler}>
        {
          formElementsArray.map(el =>
            <Input
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              key={el.id}
              changed={(event) => inputChangedHandler(event, el.id)}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              errorMessage={`please enter valid ${el.id}`} />
          )
        }
        <Button btnType="Success"
          clicked={orderHandler}
          disabled={!isFormValid}>
          Order
          </Button>
      </form>
    </div> : <Spinner />
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
