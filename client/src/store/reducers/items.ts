import { getFullPrice, getPrice } from "../../utils";
import { CartItem, IItemReducer, ReduxAction, items } from "../types";
const initialState : IItemReducer = {
  items: null,
  item: null,
  isLoading: null,
  error: null,
  cartItems: [],
  totalCost: 0,
  discount: 0,
  fullPrice: 0
};

const ItemsReducer = (state: IItemReducer = initialState, { type, payload } : ReduxAction) => {
  switch (type) {
    case items.EMPTY_CART:
      return {
        ...state,
        cartItems: [],
        totalCost: 0,
        discount: 0,
        fullPrice: 0
      }
    case items.GET_ITEMS:
      return {
        ...state,
        items: payload,
        isLoading: false,
        error: null
      }
    case items.ADD_TO_CART:
      const isInCart : boolean = !!(state.cartItems.find((x: CartItem) => x.id === payload.id));
      if (isInCart) {
        const newCartItems = state.cartItems.map((x: CartItem) => x.id === payload.id ? { ...x, quantity: x.quantity + 1 } : x);
        const newPrice = Math.round(newCartItems.reduce(getPrice, 0));
        const fullPrice = Math.round(newCartItems.reduce(getFullPrice, 0));
        const discount = Math.round(fullPrice - newPrice);
        return {
          ...state,
          cartItems: newCartItems,
          totalCost: newPrice,
          discount, fullPrice
        }
      } else {
        const newCartItems = [payload, ...state.cartItems]
        const newPrice = Math.round(newCartItems.reduce(getPrice, 0));
        const fullPrice = Math.round(newCartItems.reduce(getFullPrice, 0));
        const discount = Math.round(fullPrice - newPrice);
        return {
          ...state,
          cartItems: newCartItems,
          totalCost: newPrice,
          discount, fullPrice
        }
      }
    case items.REMOVE_FROM_CART: {
      const newCartItems = state.cartItems.filter(item => item.id !== payload);
      const newPrice = Math.round(newCartItems.reduce(getPrice, 0));
      const fullPrice = Math.round(newCartItems.reduce(getFullPrice, 0));
      const discount = Math.round(fullPrice - newPrice);
      return {
        ...state,
        cartItems: newCartItems,
        isLoading: false,
        error: null,
        totalCost: newPrice,
        discount, fullPrice
      }
    }
    case items.CHANGE_QUANTITY: {
      const newCartItems = state.cartItems.map(item => item.id === payload.id ? ({
        ...item, amountOrdered: item.amountOrdered + payload.val }) : item);
      const newPrice = Math.round(newCartItems.reduce(getPrice, 0));
      const fullPrice = Math.round(newCartItems.reduce(getFullPrice, 0));
      const discount = Math.round(fullPrice - newPrice);
      
      return {
        ...state,
        cartItems: newCartItems,
        isLoading: false,
        error: null,
        totalCost: newPrice,
        discount, fullPrice
      }
    }
    default:
      return state;
  }
}

export default ItemsReducer;