import * as at from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: at.AUTH_START,
  };
}

export const authSuccess = (idToken, userId) => {
  return {
    type: at.AUTH_SUCCESS,
    idToken,
    userId
  };
}

export const authFail = (error) => {
  return {
    type: at.AUTH_FAIL,
    error
  };
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCk9bMuW0Eka8Cw6_MCEM2jYpxhKHrmPAU';
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCk9bMuW0Eka8Cw6_MCEM2jYpxhKHrmPAU';
    }
    axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    })
      .then((res) => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  }
}
