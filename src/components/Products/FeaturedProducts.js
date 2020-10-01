import React, { useContext } from 'react';
import { ProductList, Loading } from '../../components';
import { ProductContext } from '../../context/products';

const FeaturedProducts = () => {
  const { loading, featured } = useContext(ProductContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <ProductList title="Vintage begins here" products={featured}></ProductList>
  );
};

export default FeaturedProducts;
