import React, { createContext, useState, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from './actions';

function getCartFromLocalStroge() {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
}

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // const [cart, setCart] = useState( getCartFromLocalStroge());

  // reducer hook
  const [cart, dispatch] = useReducer(reducer, getCartFromLocalStroge());

  // state hook
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  // remove item
  // const removeItem = id => setCart([...cart].filter(item => item.id !== id));
  //
  const removeItem = id => {
    dispatch({ type: REMOVE, payload: id });
  };

  // increase amount
  const increaseAmount = id => {
    // const newCart = [...cart].map(item => {
    //   return item.id === id
    //     ? { ...item, amount: item.amount + 1 }
    //     : { ...item };
    // });

    // setCart(
    //   [...cart].map(item => {
    //     return item.id === id
    //       ? { ...item, amount: item.amount + 1 }
    //       : { ...item };
    //   })
    // );
    dispatch({ type: INCREASE, payload: id });
  };
  // decrease amount
  const decreaseAmount = (id, amount) => {
    // if (amount === 1) {
    //   removeItem(id);
    //   return;
    // }
    if (amount === 1) {
      dispatch({ type: REMOVE, payload: id });
      return;
    }
    dispatch({ type: DECREASE, payload: id });

    // setCart(
    //   [...cart].map(item => {
    //     return item.id === id
    //       ? { ...item, amount: item.amount - 1 }
    //       : { ...item };
    //   })
    // );
  };

  // add to cart
  const addToCart = product => {
    // const { id, image, price, title } = product;
    // const url = image && image.url;
    // const item = [...cart].find(item => item.id === id);
    // if (item) {
    //   increaseAmount(id);
    //   return;
    // }
    // const newItem = { id, image: url, price, title, amount: 1 };
    // const newCart = [...cart, newItem];
    // setCart(newCart);
    let item = [...cart].find(item => item.id === product.id);
    if (item) {
      dispatch({ type: INCREASE, payload: product.id });
    } else {
      dispatch({ type: ADDTOCART, payload: product });
    }
  };

  // clear cart
  // const clearCart = () => setCart([]);
  const clearCart = () => {
    dispatch({ type: CLEARCART });
  };

  // useEffect
  useEffect(() => {
    // localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // cart items
    let newCartItem = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItem);

    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed());
    setTotal(newTotal);

    return () => {};
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
