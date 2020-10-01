import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ProductContext } from '../context/products';
import { CartContext } from '../context/cart';
import { Loading } from '../components';

export default function ProductDetails() {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const history = useHistory();
  const product = products.find((item) => item.id === parseInt(id));

  if (products.length === 0) {
    return <Loading />;
  } else {
    const { title, image, price, description } = product;
    // const url = image;
    console.log(image);
    const url = image && image.url;

    return (
      <section className="single-product">
        <img src={url} alt={title} className="single-product-image" />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              // add to cart
              addToCart(product);
              history.push('/cart');
            }}
          >
            add to cart
          </button>
        </article>
      </section>
    );
  }
}
