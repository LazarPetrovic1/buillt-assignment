import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../store/reducers";
import { IItemReducer, ProductItem, User, alert, auth, items } from "../store/types";
import { ProductCard } from "../components";
import { currency } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { alertFactory, getItems, url } from "../utils";

function Cart() {
  const user = useSelector<RootReducer, User | null>(state => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector<RootReducer, boolean | null>(state => state.auth.isAuthenticated);
  const allitems = useSelector<RootReducer, IItemReducer>(state => state.items);
  const { cartItems: itemsInCart, totalCost, discount } = allitems; 
  
  const executePayment = async () => {
    const itemInfo = itemsInCart.map(iic => ({ id: iic.id, amountOrdered: iic.amountOrdered }))
    const body = JSON.stringify({ id: user?.id, cost: totalCost, items: itemInfo });
    const res = await url.post('/users/pay', body);
    if (res.data.msg) {
      const alertItem = alertFactory("error", res.data.msg);
      dispatch({ type: alert.SET_ALERT, payload: alertItem });
    }
    const alertItem = alertFactory("success", "Transaction executed successfully.");
    dispatch({ type: auth.EXECUTE_TRANSACTION, payload: res.data });
    dispatch({ type: alert.SET_ALERT, payload: alertItem });
    dispatch({ type: items.EMPTY_CART });
    const newItems = await getItems();
    dispatch({ type: items.GET_ITEMS, payload: newItems });
  };
  return (
    <Box sx={{ m: 4, display: "flex", flexFlow: 'row wrap', justifyContent: 'space-between' }}>
      <Box sx={{ display: "flex", flexFlow: 'column wrap', flex: 1, gap: "0.5rem" }}>
        {(itemsInCart && Array.isArray(itemsInCart)) ? itemsInCart?.map(item => (
          <ProductCard key={item.id} {...item} productInCart />
        )) :
        <Typography variant="h1" component="h1">No items in cart yet</Typography>}
      </Box>
      <Card sx={{ height: 'fit-content' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "0.5rem" }}>
            <Typography sx={{ fontSize: '12px' }}>Ukupno</Typography>
            <Typography sx={{ fontSize: '12px' }}>{totalCost} <sup>{currency}</sup></Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "0.5rem" }}>
            <Typography sx={{ fontSize: '12px' }}>Ušteda</Typography>
            <Typography sx={{ fontSize: '12px' }}>{discount} <sup>{currency}</sup></Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "0.5rem" }}>
            <Typography sx={{ fontSize: '12px' }}>Isporuka Daily Express*</Typography>
            <Typography sx={{ fontSize: '12px' }}>Besplatna</Typography>
          </Box>
          <hr />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "0.5rem" }}>
            <Typography sx={{ fontSize: '12px' }}>Ukupno za uplatu*</Typography>
            <Typography sx={{ fontSize: '12px' }}>{totalCost} <sup>{currency}</sup></Typography>
          </Box>
          <Typography sx={{ fontSize: '12px' }}>Cena je sa uključenim PDV-om</Typography>
        </CardContent>
        <CardActions>
          {!isAuthenticated ? (
            <Button
              onClick={() => navigate('/login')} fullWidth
              sx={{
                "&:hover": { backgroundColor: "#111" },
                borderRadius: "40px",
                backgroundColor: 'black',
                color: "white"
            }}>Prijavi se za brže plaćanje</Button>
          ) : (
            <Button
              onClick={() => executePayment()} fullWidth
              sx={{
                "&:hover": { backgroundColor: "#111" },
                borderRadius: "40px",
                backgroundColor: 'black',
                color: "white"
            }}>Plati porudžbinu</Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

export default Cart;