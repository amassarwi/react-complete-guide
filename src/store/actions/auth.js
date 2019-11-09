import * as at from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: at.AUTH_START,
  };
}

export const authSuccess = (authData) => {
  return {
    type: at.AUTH_SUCCESS,
    authData,
  };
}

export const authFail = (error) => {
  return {
    type: at.AUTH_FAIL,
    error
  };
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCk9bMuW0Eka8Cw6_MCEM2jYpxhKHrmPAU`, {
      email,
      password,
      returnSecureToken: true,
    })
      .then((res) => {
        dispatch(authSuccess(res.data));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  }
}
