import React from 'react';
import { Link } from 'react-router-dom';
// impt
import PropTypes from 'prop-types';

// default img
import img from '../../assets/mainBcg.jpeg';

const Product = ({ id, title, price, image, description }) => {
  const url = image && image.url;
  // const url = image;
  return (
    <article className="product">
      <div className="img-container">
        <img src={url || img} alt={title} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title}</p>
        <p className="product-price">${price}</p>
      </div>
    </article>
  );
};

Product.propTypes = {
  // image: PropTypes.shape({
  //   url: PropTypes.object,
  // }).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
