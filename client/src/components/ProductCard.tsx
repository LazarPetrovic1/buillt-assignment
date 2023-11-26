import Card from '@mui/material/Card';
import { CardMedia, CardContent, Typography, ButtonGroup, Button } from '@mui/material';
import { currency } from '../utils/constants';
import { alertFactory, truncate } from '../utils';
import { useState } from 'react';
import reduce from '../assets/reduce.svg'
import add from '../assets/add.svg'
import loyalty from '../assets/loyalty.svg'
import { ProductAction, CartProductActions } from '../styled';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, ProductItem, alert, items } from '../store/types';
import { RootReducer } from '../store/reducers';

type HelperProps = { productInCart: boolean; children: JSX.Element; };
// productInCart checks whether the route is `/` or `/cart`, not if the item is in `state.items.cartItems`
type ProductCardProps = CartItem & { discount?: number; productInCart?: boolean; }

function ActionWrappers({ productInCart, children } : HelperProps) {
  return productInCart ? <>{children}</> : <div style={{ position: 'relative' }}>{children}</div>
}

function ActionControl({ productInCart, children } : HelperProps) {
  return productInCart ? <div style={{ display: 'flex', alignSelf: 'end' }}>{children}</div> : <>{children}</>
}

function ProductCard({ id, name, price, quantity, image, discount, amountOrdered, productInCart = false } : ProductCardProps) {
  const [userQuantity, setUserQuantity] = useState(() => {
    if (productInCart && amountOrdered) return amountOrdered;
    return 1;
  });
  const cart = useSelector<RootReducer, ProductItem[]>(state => state.items.cartItems);
  const dispatch = useDispatch();
  const addToCart = () => {
    const newItem : CartItem = {
      id, name, price, image, discount, quantity, amountOrdered: userQuantity
    }
    dispatch({ type: items.ADD_TO_CART, payload: newItem });
    const alertItem = alertFactory("success", "Item added to cart successfully.")
    dispatch({ type: alert.SET_ALERT, payload: alertItem });
  }
  const removeFromCart = () => dispatch({ type: items.REMOVE_FROM_CART, payload: id });
  const isItemInCart = cart.find(item => item.id.toString() === id.toString())
  const cardStyles = productInCart ? { display: 'flex', mr: 2 } : { mb: 2, width: 250, minHeight: 275, border: isItemInCart ? "2px solid lightblue" : "inherit" }
  const imageStyles = productInCart ? { minHeight: 200, minWidth: 200 } : { minHeight: 200 }
  const ProductActionsComponent = productInCart ? CartProductActions : ProductAction;

  const changeQuantity = (val: number) => {
    if (productInCart) dispatch({ type: items.CHANGE_QUANTITY, payload: { id, val } });
    setUserQuantity(prev => prev + val);
  };

  const buttons = (
    <ButtonGroup aria-label="radius button group" sx={{ mr: 2 }}>
      <Button
        style={{ borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px" }}
        title="Decrement quantity (-1)"
        onClick={() => changeQuantity(-1)} disabled={userQuantity <= 1}
      >
        <img src={reduce} alt="Decrement quantity (-1)" />
      </Button>
      <Button sx={{ userSelect: 'none' }}>{userQuantity}</Button>
      <Button
        style={{ borderTopRightRadius: "40px", borderBottomRightRadius: "40px" }}
        title="Increment quantity (+1)"
        onClick={() => changeQuantity(1)}
        /* @ts-ignore */
        disabled={userQuantity >= parseInt(quantity)}
      >
        <img src={add} alt="Increment quantity (+1)" />
      </Button>
    </ButtonGroup>
  );
  
  return (
    <Card sx={cardStyles}>
      <ActionWrappers productInCart={productInCart}>
        <>
          <CardMedia sx={imageStyles} image={image} title="Product Card" />
          <ProductActionsComponent>
            <div>
              {productInCart && <Typography gutterBottom variant="h5" component="h5">{name}</Typography>}
              {/* {productInCart && <Typography gutterBottom component="span">{price}<sup>{currency}</sup></Typography>} */}
            </div>
            <ActionControl productInCart={productInCart}>
              <>
                {buttons}
                {productInCart ? <Typography onClick={removeFromCart} sx={{ cursor: 'pointer', borderBottom: '1px solid black' }}>Ukloni</Typography> : (
                  <img
                    style={{ cursor: "pointer" }}
                    src={loyalty}
                    alt="Add to cart"
                    title="Add to cart"
                    onClick={addToCart}
                  />
                )}
              </>
            </ActionControl>
          </ProductActionsComponent>
        </>
      </ActionWrappers>
      <CardContent>
        {!productInCart && <Typography gutterBottom variant="h5" component="h5">{truncate(name, 40)}</Typography>}
        {productInCart && typeof discount === 'number' ? (
          <>
            <Typography gutterBottom component="span">{Math.round(price - discount)}<sup>{currency}</sup></Typography> <br />
            <Typography gutterBottom component="span" sx={{ textDecoration: 'line-through', color: 'orange' }}>{price} <sup>{currency}</sup></Typography>
          </>
        ) : (
          <Typography gutterBottom component="span">{price}<sup>{currency}</sup></Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductCard;