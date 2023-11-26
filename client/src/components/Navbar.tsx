import AppBar from '@mui/material/AppBar';
import logo from '../assets/logo.svg'
import cart from '../assets/cart.svg'
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../store/reducers';
import { ProductItem, alert, auth } from '../store/types';
import { IC } from '../styled';
import { useState } from 'react';
import { makeStyles } from "@mui/styles";
import { alertFactory } from '../utils';

const useStyles = makeStyles({
  menuButton: { minWidth: "40px", position: 'relative', display: 'inline-block', margin: 0, padding: 0 },
});

const fixerStyles = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  alignItems: "center"
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const itemsInCart = useSelector<RootReducer, ProductItem[]>(state => state.items.cartItems);
  const isAuthenticated = useSelector<RootReducer, boolean | null>(state => state.auth.isAuthenticated);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const logout = () => {
    dispatch({ type: auth.LOGOUT });
    const alertItem = alertFactory("success", "Successfully logged out.");
    dispatch({ type: alert.SET_ALERT, payload: alertItem });
    handleClose();
    navigate("/login");
  };
  const move = (path: string) => {
    if (location.pathname === path) return handleClose();
    handleClose();
    navigate(path);
  }

  return (
    <AppBar sx={{ px: 5, background: "#F0F0F0", color: "black", ...fixerStyles }} position="static" color="primary">
      <Box sx={{ p: 2 }}>
        <Link to='/'>
          <img src={logo} alt="Builtt logo" width={87} height={38} />
        </Link>
      </Box>
      <Box sx={{ p: 2, cursor: 'pointer' }}>
        <Button
          size="small"
          id="nav-button"
          aria-controls={open ? 'nav-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className={classes.menuButton}
        >
          <IC>{itemsInCart.length}</IC>
          <img src={cart} alt="Cart" width={23} height={23} />
        </Button>
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'nav-button',
          }}
        >
          <MenuItem onClick={() => move("/")}>Products</MenuItem>
          <MenuItem onClick={() => move("/cart")}>Cart</MenuItem>
          {isAuthenticated ? (
            <MenuItem onClick={logout}>Logout</MenuItem>
          ) : <MenuItem onClick={() => move('/login')}>Login</MenuItem>}
        </Menu>
      </Box>
    </AppBar>
  );
}

export default Navbar;