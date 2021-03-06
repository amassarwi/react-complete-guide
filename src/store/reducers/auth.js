import * as at from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authStart = (state, action) => updateObject(
  state,
  {loading: true, error: null}
);

const authSuccess = (state, action) => updateObject(
  state,
  {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  }
);

const authFail = (state, action) => updateObject(
  state,
  {
    error: action.error,
    loading: false,
  }
);

const authLogout = (state, action) => updateObject(
  state,
  {
    token: null,
    userId: null,
  }
);

const setAuthRedirectPath = (state, action) => updateObject(
  state,
  {
    authRedirectPath: action.url,
  }
);

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case at.AUTH_START: return authStart(state, action);
    case at.AUTH_SUCCESS: return authSuccess(state, action);
    case at.AUTH_FAIL: return authFail(state, action);
    case at.AUTH_LOGOUT: return authLogout(state, action);
    case at.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
};

export default reducer;
