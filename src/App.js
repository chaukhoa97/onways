import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import CartPage from './Page/CartPage';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';
import ProductDetailPage from './Page/ProductDetailPage';
import ProductsPage from './Page/ProductsPage';
import { itemsActions } from './Redux/items';
import UserPage from './Page/UserPage';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import AdminPage from './Page/AdminPage';

import './scss/App.scss';
import { syncUser, userActions } from './Redux/user';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('items.json')
      .then((res) => dispatch(itemsActions.firstFetch(res.data)));
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const localId = useSelector((store) => store.auth.localId);
  useEffect(() => {
    dispatch(syncUser(localId));
  }, [dispatch, localId]);
  const isAdmin = useSelector((state) => state.user.isAdmin);

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

      <Route path="/user" exact>
        {isLoggedIn ? (
          <Redirect to="/user/profile" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/user/:mode">
        {isLoggedIn ? <UserPage></UserPage> : <Redirect to="/login" />}
      </Route>
      <Route path="/login" exact>
        {isLoggedIn ? <Redirect to="/user" /> : <LoginPage></LoginPage>}
      </Route>
      <Route path="/cart" exact>
        <CartPage></CartPage>
      </Route>
      <Route path="/admin">
        {isAdmin ? <AdminPage></AdminPage> : <Redirect to="/user" />}
      </Route>
    </Switch>
  );
}

export default App;
