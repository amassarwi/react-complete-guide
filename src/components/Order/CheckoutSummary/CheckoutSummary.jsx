import React from 'react';
import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = ({ingredients}) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger"
              clicked>Cancel</Button>
      <Button btnType="Danger"
              clicked>Continue</Button>
    </div>
  );
}

export default checkoutSummary;
