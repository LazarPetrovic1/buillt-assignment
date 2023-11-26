import { AlertColor } from '@mui/material'
import { AlertItem, CartItem, ProductItem } from '../store/types'
import url from './axios'

export { default as url } from './axios'
export { default as setAuthToken } from './setAuthToken'
export { default as truncate } from './truncate'

export const alertFactory = (severity: AlertColor, msg: string) : AlertItem => ({
  id: crypto.randomUUID(),
  severity, msg
})

export const getPrice = (a : number, v : CartItem) => (v?.discount) ? a + ((v?.amountOrdered ? v?.amountOrdered : 1) * (v.price - v?.discount)) : a + ((v?.amountOrdered ? v?.amountOrdered : 1) * v.price);
export const getFullPrice = (a : number, v : CartItem) => a + ((v?.amountOrdered ? v?.amountOrdered : 1) * v.price);

export const getItems = async () : Promise<ProductItem[]> => {
  const res = await url.get("/items");
  // changing the code on the client-side only to propagate discounts
  // would have done it earlier, but I forgot and it's Sunday night
  // the discount will be 10% on all odd ID items
  const newItems = res.data.map((item : ProductItem) => item.id % 2 === 0 ? item : { ...item, discount: item.price * 1/10 })
  return newItems;
}
