import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import ProductProvider from './context/products';
import CartProvider from './context/cart';
import UserProvider from './context/user';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
