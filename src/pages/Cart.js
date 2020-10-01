import React, { useContext } from 'react';
import { CartContext } from '../context/cart';
import { EmptyCart, CartItem } from '../components';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';

const Cart = () => {
  // let user = useContext(UserContext);
  const { cart, total } = useContext(CartContext);
  const { user } = useContext(UserContext);
  if (cart.length === 0) {
    return <EmptyCart />;
  } else {
    return (
      <div className="cart-items">
        <h2>Your Cart</h2>
        {cart.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
        <h2>total: ${total}</h2>
        {user.token ? (
          <Link to="/checkout" className="btn btn-primary btn-block">
            checkout
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary btn-block">
            login
          </Link>
        )}
      </div>
    );
  }
};

export default Cart;
