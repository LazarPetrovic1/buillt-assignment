import { Dispatch } from "redux";
import { auth } from "../types";
import { AxiosRequestConfig } from 'axios';
import { url } from '../../utils';
const rootConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = ({ email, password } : { email: string, password: string }) =>
  async (dispatch : Dispatch) : Promise<any> => {
    const body = JSON.stringify({ email, password });
    try {
      const res = await url.post(`/users/login`, body, rootConfig as AxiosRequestConfig);
      if (res.data.token && res.data.user)
        dispatch({
          type: auth.LOGIN_SUCCESS,
          payload: res.data,
        });
      else dispatch({ type: auth.LOGIN_FAIL, payload: res.data });
      return res.data;
    } catch (e) {
      dispatch({ type: auth.CLEAR_PROFILE });
      dispatch({ type: auth.AUTH_ERROR, payload: e });
    }
}