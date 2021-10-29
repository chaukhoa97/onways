import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AccountPage from './Page/AccountPage';
import CartPage from './Page/CartPage';
import HomePage from './Page/HomePage';
import ProductsPage from './Page/ProductsPage';
import './scss/App.scss';

function App() {
  const itemsRef = useRef([]);
  useEffect(() => {
    axios
      .get('items.json')
      .then((items) => (itemsRef.current = items.data))
      .then(() => console.log(itemsRef.current));
  }, []);

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
