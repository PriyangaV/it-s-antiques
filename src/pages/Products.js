import React, { useContext } from 'react';
import { ProductContext } from '../context/products';
import { Loading, Filters, PageProducts } from '../components';

const Products = () => {
  // const { products, loading } = useContext(ProductContext);
  const { loading } = useContext(ProductContext);
  if (loading) {
    return <Loading />;
  }
  // return <ProductList title="our products" products={sorted} />;
  return (
    <div className="allProducts">
      <Filters />
      <PageProducts />
    </div>
  );
};

export default Products;
