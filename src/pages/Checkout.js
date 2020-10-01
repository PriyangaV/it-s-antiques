import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { EmptyCart } from '../components';
import { useHistory } from 'react-router-dom';
// react-stripe-elements
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';

import submitOrder from '../strapi/submitOrder';

const Checkout = (props) => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, alert, hideAlert } = useContext(UserContext);

  const history = useHistory();

  // state values
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;

  const handleSubmit = async (e) => {
    e.preventDefault();
    showAlert({ msg: 'submitting order... please wait' });
    const response = await props.stripe
      .createToken()
      .catch((err) => console.log(err));
    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });
      if (order) {
        showAlert({
          msg: 'your order is complete',
        });
        clearCart();
        history.push('/');
        return;
      } else {
        showAlert({
          msg: 'there was an error with your order, please try again!',
          type: 'danger',
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  };
  if (cart.length < 1) return <EmptyCart />;
  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>
          order total: <span>${total}</span>
        </h3>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Name on the card"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* end of single input */}
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">credit or debit card</label>
          <p className="stripe-info">
            test using this credit card: <span>1126 0761 0240 2812</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* end of card element */}
        {/* stripe elements */}
        <CardElement className="card-element"></CardElement>
        {/* stripe errors */}
        {error && <p className="form-empty">{error}</p>}
        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">please fill out the form</p>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            submit
          </button>
        )}
      </form>
    </section>
  );
};

const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_51HWycvL6z8ZYzotYPkEMvuxWhZo3H5GVPWXxMq0a6PlRil1so3F6oKCfBKv0CqdsQ1XdNsj3esjAClfipV7IGYVa00hg379VbD">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
