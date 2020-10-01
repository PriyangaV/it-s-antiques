import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';
import url from '../utils/URL';
// import { featuredProducts, paginate, flattenProduct } from '../utils/helpers';
import { featuredProducts, paginate } from '../utils/helpers';

export const ProductContext = createContext();

// Provider, Consumer, useContext()

// state change
// props change

// useEffect();
// let's perform side effects - data fetching, window event listener
// by default runs after every render
// cb as first parameter
// returns cleanup function to avoid memory leaks, so cannot be async
// second argument - array of values(dependencies)

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  // extra state values
  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all',
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then(({ data }) => {
      // const products = flattenProduct(data);

      // sorted and paginated data to products comp
      setSorted(paginate(data));
      setProducts(data);

      const featured = featuredProducts(data); // only featured products
      setFeatured(featured);
      setLoading(false);
    });
    return () => {};
  }, []);

  useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);

    // logic
    const { search, category, shipping, price } = filters;

    if (category !== 'all') {
      newProducts = newProducts.filter((item) => item.category === category);
    }

    if (shipping !== false) {
      newProducts = newProducts.filter(
        (item) => item.free_shipping === shipping
      );
    }

    if (search !== '') {
      newProducts = newProducts.filter((item) => {
        let title = item.title.toLowerCase().trim();
        return title.includes(search) ? item : null;
      });
    }

    if (price !== 'all') {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 650;
        } else {
          return item.price > 650;
        }
      });
    }

    setPage(0);
    setSorted(paginate(newProducts));
    return () => {};
  }, [filters, products]);

  const changePage = (index) => setPage(index);
  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;

    let filterValue;

    if (type === 'checkbox') {
      filterValue = e.target.checked;
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }

    setFilters({ ...filters, [filter]: filterValue });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        featured,
        loading,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
