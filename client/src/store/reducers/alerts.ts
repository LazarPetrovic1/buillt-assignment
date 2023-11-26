import { AlertItem, ReduxAction, alert } from "../types";


const initialState : AlertItem[] = [];

function AlertReducer(state = initialState, { type, payload } : ReduxAction) {
  switch (type) {
    case alert.SET_ALERT:
      return [...state, payload];
    case alert.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}

export default AlertReducer;