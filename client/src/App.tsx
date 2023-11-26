// @ts-ignore
import cookie from 'cookie-cutter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Root, Cart } from './pages';
import { Alerts } from './components';
import { getItems, setAuthToken, url } from './utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProductItem, items } from './store/types';
import Navbar from './components/Navbar';

if (cookie.get('token')) setAuthToken(cookie.get('token'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function() {
      const newItems = await getItems();
      dispatch({ type: items.GET_ITEMS, payload: newItems });
    }())
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Alerts />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Root />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
