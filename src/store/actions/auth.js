import * as at from './actionTypes';

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
  }
}
