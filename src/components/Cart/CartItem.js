import React, { useContext } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { CartContext } from '../../context/cart';

const CartItem = ({ id, title, price, image, amount }) => {
  // cart context
  const { removeItem, increaseAmount, decreaseAmount } = useContext(
    CartContext
  );
  // const url = image;
  const url = image && image.url;
  return (
    <article className="cart-item">
      <img src={url} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button className="cart-btn remove-btn" onClick={() => removeItem(id)}>
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => increaseAmount(id)}
        >
          <FaAngleUp />
        </button>
        <p className="item-amount">{amount}</p>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => decreaseAmount(id, amount)}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
