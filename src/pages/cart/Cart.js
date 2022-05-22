import React from 'react';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, BookCard, ItemCounter, PriceCard } from 'components';
import { getItem, setItem } from 'utils/helperFuncs';
import { useCart } from 'providers';
import './Cart.scss';

const Cart = () => {
  const { cart, handleUpdateCart, handleRemoveFromCart: removeFromCart } = useCart();
  const sm = useMediaQuery({ maxWidth: '600px' });

  const navigate = useNavigate();

  const onCartCountChange = async ({ type, id, quantity }) => {
    await handleUpdateCart({ type, id, quantity });
  };

  const handleRemoveFromCart = async (e, id) => {
    e.preventDefault();
    await removeFromCart(id);
    e.stopPropagation();
  };

  const moveToWishlist = (e, item) => {
    e.preventDefault();
    let wishlistData = [];
    const prevData = getItem('wishlist');

    const itemExists = prevData?.find((prevItem) => prevItem._id === item._id);
    if (!itemExists && prevData) {
      wishlistData = [...prevData, item];
    } else {
      wishlistData.push(item);
    }
    setItem('wishlist', wishlistData);
    handleRemoveFromCart(e, item._id);
    toast.success('Moved to Wishlist!!');
  };

  return (
    <div>
      <Typography variant="h6" className="text-center mb-1">
        My Cart
      </Typography>
      {cart?.products?.length ? (
        <div className="Cart__wrapper">
          <div className="Cart__productContainer">
            {cart?.products?.map((product) => (
              <BookCard
                book={product}
                orientation="row"
                imageProps={{ width: '100%', height: '100%', smheight: '17rem' }}
                cardHeight={sm ? '30' : '22'}
                className="mb-1 p-1"
                imageUrl={product.bookId.image}
                key={product.bookId._id}
              >
                <div className="d-flex flex-col content-between h-full">
                  <Typography variant="h5" size="sm">
                    {product.bookId.title}
                  </Typography>
                  <Typography variant="p" size="sm" className="Typography--ellipsis">
                    {product.bookId.description}
                  </Typography>
                  <Typography variant="div" className="d-flex items-center">
                    <Typography variant="p" className="mr-1 text-10" textbold size="xs">
                      Quantity :
                    </Typography>
                    <ItemCounter
                      initialCount={product.quantity}
                      itemId={product.bookId._id}
                      onCartCountChange={onCartCountChange}
                    />
                  </Typography>
                  <Typography variant="h6" size={sm ? 'xs' : 'sm'}>
                    Rs. {product.bookId.price}
                  </Typography>

                  <div className="d-flex flex-col">
                    <Button
                      component="button"
                      className="Cart__button w-full text-bold"
                      onClick={(e) => moveToWishlist(e, product.bookId)}
                    >
                      Move to Wishlist
                    </Button>
                    <Button
                      component="button"
                      variant="outlined"
                      className="Cart__button w-full text-bold"
                      onClick={(e) => handleRemoveFromCart(e, product.bookId._id)}
                    >
                      Remove from Cart
                    </Button>
                  </div>
                </div>
              </BookCard>
            ))}
          </div>
          <div className="Cart__priceCard">
            <PriceCard
              cart={cart}
              headerTitle="Price Details"
              onClick={() => navigate('/checkout')}
              buttonText="Checkout"
            />
          </div>
        </div>
      ) : (
        <Typography variant="h5" className="Typography--500 my-4" align="center">
          Cart is empty!!
        </Typography>
      )}
    </div>
  );
};

export default Cart;
