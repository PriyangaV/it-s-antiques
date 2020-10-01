import React from 'react';
import { Hero, FeaturedProducts, Offers } from '../components';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Hero>
        <Link to="/products" className="btn btn-primary btn-hero">
          our collections
        </Link>
      </Hero>
      <FeaturedProducts />
      <Offers />
      <footer>
        <p>
          &copy; copyright - whichever year it is now -{' '}
          <span> It's Antique </span> All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Home;
