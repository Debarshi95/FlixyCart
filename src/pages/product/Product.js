import React from 'react';
import { useProducts } from '../../providers/ProductProvider/ProductProvider';
import { useFilter } from '../../providers/FilterProvider/FilterProvider';
import { BookCard, Sidebar } from '../../components';
import './Product.scss';

const Product = () => {
  const {
    productState: { products = [] },
  } = useProducts();
  const { filteredState, getSortedProducts, getFilteredProducts } = useFilter();

  console.log({ filteredState });
  const sortedProducts = getSortedProducts(products, filteredState.sortBy);

  const filteredProducts = getFilteredProducts(sortedProducts, filteredState);

  console.log({ filteredProducts, sortedProducts });
  return (
    <div className="Product__root w-full d-flex">
      <Sidebar />
      <section className="Product__itemContainer w-full">
        {filteredProducts.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </section>
    </div>
  );
};

export default Product;
