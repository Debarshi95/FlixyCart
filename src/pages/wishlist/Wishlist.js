import { BookCard, Button, Typography } from 'components';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { updateCart } from 'services/flixycartApi';
import { clearItem, getItem, setItem } from 'utils/helperFuncs';
import './Wishlist.scss';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(getItem('wishlist'));
  const sm = useMediaQuery({ maxWidth: '600px' });

  const handleRemoveFromWishlist = (e, id) => {
    e.preventDefault();
    const filteredProducts = wishlist.filter((item) => item._id !== id);

    const prevData = getItem('wishlist');

    if (prevData) {
      clearItem('wishlist');
    }

    setItem('wishlist', [...filteredProducts]);
    setWishlist([...filteredProducts]);
  };

  const handleMoveToCart = async (e, id) => {
    e.preventDefault();
    try {
      await updateCart({ id, quantity: 1 });
      handleRemoveFromWishlist(e, id);
      toast.success('Moved to Cart!!');
    } catch (error) {
      toast.error("Oops!!Couldn't move to cart");
    }
  };

  return (
    <div className="Wishlist__root">
      <Typography variant="h6" className="text-center mb-1">
        Wishlist
      </Typography>

      <div className="Wishlist__Container">
        {wishlist?.map((product) => (
          <BookCard
            book={product}
            orientation="col"
            imageProps={{ width: '100%', height: '15rem' }}
            cardHeight={sm ? 'auto' : '28'}
            cardWidth={sm ? 'full' : '18'}
            className="mr-1 p-1"
            key={product._id}
            style={{ overflow: 'hidden' }}
          >
            <div className="d-flex flex-col content-between h-full">
              <Typography variant="h5" size="sm">
                {product.title}
              </Typography>
              <Typography variant="div" className="d-flex items-center">
                <Typography variant="p" className="mr-1 text-10" textbold size="xs">
                  Quantity :
                </Typography>
              </Typography>
              <Typography variant="h6" size={sm ? 'xs' : 'sm'}>
                Rs. {product.price}
              </Typography>

              <div className="d-flex flex-col">
                <Button
                  component="button"
                  className="Cart__button w-full"
                  boldText
                  onClick={(e) => handleMoveToCart(e, product._id)}
                >
                  Move to Cart
                </Button>
                <Button
                  component="button"
                  variant="outlined"
                  className="Cart__button w-full"
                  boldText
                  onClick={(e) => handleRemoveFromWishlist(e, product._id)}
                >
                  Remove from Wishlist
                </Button>
              </div>
            </div>
          </BookCard>
        ))}
      </div>

      {!wishlist.length && (
        <Typography variant="h5" className="Typography--500 my-4" align="center">
          Wishlist is empty!!
        </Typography>
      )}
    </div>
  );
};

export default Wishlist;
