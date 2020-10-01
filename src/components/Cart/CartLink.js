import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/cart';
const CartLink = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-link-container">
      <NavLink to="/cart" exact activeClassName="selected">
        cart
      </NavLink>
      <span className="cart-link-total">{cartItems}</span>
    </div>
  );
};

export default CartLink;
