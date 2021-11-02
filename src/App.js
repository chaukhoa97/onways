import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import CartPage from './Page/CartPage';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';
import ProductDetailPage from './Page/ProductDetailPage';
import ProductsPage from './Page/ProductsPage';
import ProfilePage from './Page/ProfilePage';
import { itemsActions } from './Redux/items';
import './scss/App.scss';

function App() {
  const dispatch = useDispatch('asdpojasopdjaspodjop');
  useEffect(() => {
    axios
      .get('items.json')
      .then((res) => dispatch(itemsActions.firstFetch(res.data)));
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
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
        {isLoggedIn ? (
          <ProfilePage></ProfilePage>
        ) : (
          <Redirect to="/account/login" />
        )}
      </Route>
      <Route path="/account/login" exact>
        {isLoggedIn ? <Redirect to="/account" /> : <LoginPage></LoginPage>}
      </Route>
      <Route path="/cart" exact>
        <CartPage></CartPage>
      </Route>
    </Switch>
  );
}

export default App;
