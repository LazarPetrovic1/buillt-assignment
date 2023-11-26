// @ts-ignore
import cookie from 'cookie-cutter';
import { IAuthReducer, ReduxAction, auth } from '../types';

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: null,
  user: null,
  error: null
};

const AuthReducer = (state: IAuthReducer = initialState, { type, payload } : ReduxAction) => {
  switch (type) {
    case auth.CLEAR_PROFILE:
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      }
    case auth.EXECUTE_TRANSACTION:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        user: { ...state.user, balance: payload }
      };
    case auth.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case auth.LOGIN_SUCCESS:
    case auth.REGISTER_SUCCESS:
      cookie.set('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        isLoading: false,
        user: payload.user
      }
    case auth.REGISTER_FAIL:
    case auth.LOGIN_FAIL:
    case auth.LOGOUT:
    case auth.DELETE_ACCOUNT:
      cookie.set('token', null);
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null
      };
    case auth.AUTH_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
}

export default AuthReducer;