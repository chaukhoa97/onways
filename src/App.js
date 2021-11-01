import './scss/App.scss';
import ProductsPage from './Page/ProductsPage';
import { useEffect, useRef } from 'react';
import { Button } from 'antd';
import MainLayout from './Layout/MainLayout';
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom';
import HomePage from './Page/HomePage';
import AccountPage from './Page/AccountPage';
import CartPage from './Page/CartPage';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { itemsActions } from './Redux/items';
import ProductDetailPage from './Page/ProductDetailPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('items.json')
      .then((res) => dispatch(itemsActions.firstFetch(res.data)));
  }, [dispatch]);
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" exact>
        <HomePage></HomePage>
      </Route>
      <Route path="/products" exact>
        <ProductsPage></ProductsPage>
      </Route>
      <Route path="/products/:productId" exact>
        <ProductDetailPage></ProductDetailPage>
      </Route>
      <Route path="/account" exact>
        <AccountPage></AccountPage>
      </Route>
      <Route path="/cart" exact>
        <CartPage></CartPage>
      </Route>
    </Switch>
  );
}

export default App;
