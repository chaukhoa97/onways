import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import {
  faCartPlus,
  faCartShopping,
  faHeart,
  faStar,
  faTrash,
  faUser,
  faLock,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './Redux/store';
import reportWebVitals from './reportWebVitals';
library.add(
  far,
  faStar,
  faTrash,
  faCartShopping,
  faCartPlus,
  faHeart,
  faUser,
  faLock,
  faUserPen
);
axios.defaults.baseURL = 'https://react-e8310-default-rtdb.firebaseio.com/';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
