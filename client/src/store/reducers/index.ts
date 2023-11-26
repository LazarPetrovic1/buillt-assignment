import { combineReducers } from "redux";
import auth from "./auth";
import alerts from './alerts'
import items from './items'
import { AlertItem, IAuthReducer, IItemReducer } from "../types";

export interface RootReducer {
  auth: IAuthReducer,
  alerts: AlertItem[],
  items: IItemReducer
}

const rootReducer = combineReducers({ auth, alerts, items });
export default rootReducer;