import { AlertColor } from "@mui/material";

export const auth = {
  REGISTER_SUCCESS: "auth/REGISTER_SUCCESS",
  REGISTER_FAIL: "auth/REGISTER_FAIL",
  USER_LOADED: "auth/USER_LOADED",
  AUTH_ERROR: "auth/AUTH_ERROR",
  LOGIN_SUCCESS: "auth/LOGIN_SUCCESS",
  LOGIN_FAIL: "auth/LOGIN_FAIL",
  LOGOUT: "auth/LOGOUT",
  DELETE_ACCOUNT: "auth/DELETE_ACCOUNT",
  CLEAR_PROFILE: "auth/CLEAR_PROFILE",
  EXECUTE_TRANSACTION: "auth/EXECUTE_TRANSACTION"
}

export const alert = {
  SET_ALERT: "alert/SET_ALERT",
  REMOVE_ALERT: "alert/REMOVE_ALERT",
}

export const items = {
  ADD_TO_CART: "items/ADD_TO_CART",
  REMOVE_FROM_CART: "items/REMOVE_FROM_CART",
  CHANGE_QUANTITY: "items/CHANGE_QUANTITY",
  GET_ITEMS: "items/GET_ITEMS",
  EMPTY_CART: "items/EMPTY_CART",
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ProductItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount?: number;
}

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount?: number;
  amountOrdered?: number;
}

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface IAuthReducer {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean | null;
  user: User | null;
  error: object | null;
}

export interface AlertItem {
  id: string;
  msg: string;
  severity: AlertColor;
}

export interface IItemReducer {
  items: ProductItem[] | null,
  item: ProductItem | null,
  isLoading: boolean | null,
  error: object | null,
  cartItems: CartItem[];
  totalCost: number;
  fullPrice: number;
  discount: number;
}