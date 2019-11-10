import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import { auth, setAuthRedirectPath } from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false
      },
    },
    isSignup: true,
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      })
    });
    this.setState({
      controls: updatedControls,
    });
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      }
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formEl) => (
      <Input 
        key={formEl.id}
        elementType={formEl.config.elementType}
        elementConfig={formEl.config.elementConfig}
        value={formEl.config.value}
        changed={(event) => this.inputChangedHandler(event, formEl.id)}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
        errorMessage={`please enter valid ${formEl.id}`} />
    ));

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p>
        {this.props.error.message}
      </p>);
    }

    let authRedirect = null;
    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={styles.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="submit" btnType="Success">Submit</Button>
        </form>
        <Button 
          clicked={this.switchAuthModeHandler}
          btnType="Danger">Switch to {this.state.isSignup ? 'Signin' : 'Signup'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
