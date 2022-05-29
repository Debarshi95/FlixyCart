import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { useProducts } from 'providers/ProductProvider/ProductProvider';
import { useFilter } from 'providers/FilterProvider/FilterProvider';
import { BookCard, Button, Sidebar } from 'components';
import { useCart } from 'providers';
import './Product.scss';

const Product = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const xs = useMediaQuery({ maxWidth: '600px' });

  const {
    productState: { products = [] },
  } = useProducts();
  const { handleUpdateCart, handleRemoveFromCart } = useCart();

  const handleButtonClick = async (isAdded, id) => {
    try {
      if (isAdded) {
        await handleRemoveFromCart(id);
        toast.success('Removed from Cart!!');
      } else {
        await handleUpdateCart({ id, quantity: 1 });
        toast.success('Added to Cart!!');
      }
    } catch (error) {
      toast.error("Oops!! Couldn't add to cart!!");
    }
  };

  const { filteredState, getSortedProducts, getFilteredProducts } = useFilter();

  const sortedProducts = getSortedProducts(products, filteredState.sortBy);

  const filteredProducts = getFilteredProducts(sortedProducts, filteredState);

  const handleSidebarToggle = () => {
    if (xs) {
      setShowMobileSidebar(!showMobileSidebar);
    }
  };

  return (
    <div className="Product__root w-full">
      {xs && (
        <div className="d-flex content-end mx-1">
          <Button
            variant="outlined"
            component="button"
            className="w-10"
            onClick={handleSidebarToggle}
          >
            Filters
          </Button>
        </div>
      )}
      <div className="Product__wrapper">
        <Sidebar xs={xs} showMobileSidebar={showMobileSidebar} />
        <section className="Product__itemContainer w-full">
          {filteredProducts?.map((book) => (
            <BookCard
              book={book}
              key={book._id}
              imageProps={{ width: '100%', height: '65%' }}
              cardHeight={xs ? '27' : '24'}
              buttonProps={{
                onClick: handleButtonClick,
              }}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Product;
