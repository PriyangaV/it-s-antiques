import React from 'react';
// react-router-dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import {
  About,
  Cart,
  Checkout,
  Error,
  Home,
  Login,
  ProductDetails,
  Products
} from './pages';
// components
import { Header, Alert, PrivateRoute, ScrollButton } from './components';

// Strapi / Stripe
// strapi.io - headless cms
// stripe - payment processor
// claudinary.io
// heroku - backend
// netlify - frontend

// react hooks
// - useReducer
// - more structure, separate concerns
// - refactor cart context

// state <==> ui - not available

// state -> ui -> actions -> reducer -> state(from the beginning)
// reducer - it's a function that takes two arguments, (state and action)
// - const [state, dispatch] = useReducer(reducer, initialState)
// WE CANNOT MUTATE THE WHOLE STATE, return new state

// heroku git:clone -a myapp
// add extra fields
// git push -u heroku master
// add more products

// Redux is required some practice

const App = () => {
  return (
    <Router>
      <Header />
      <Alert />
      <ScrollButton />
      <Switch>
        <Route path="/" exact children={<Home />} />
        <Route path="/about" exact children={<About />} />
        <Route path="/cart" exact children={<Cart />} />
        <PrivateRoute path="/checkout" exact children={<Checkout />} />
        <Route path="/login" exact children={<Login />} />
        <Route path="/products" exact children={<Products />} />
        <Route path="/products/:id" exact children={<ProductDetails />} />
        <Route path="*" exact children={<Error />} />
      </Switch>
    </Router>
  );
};

export default App;
