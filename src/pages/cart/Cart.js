import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Typography, Button, BookCard } from '../../components';
import ItemCounter from '../../components/common/ItemCounter/ItemCounter';
import { calculateTotalPrice } from '../../utils/helperFuncs';
import { getCart, updateCart } from '../../services/flixycartApi';
import './Cart.scss';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const sm = useMediaQuery({ maxWidth: '600px' });

  useEffect(() => {
    const getCartDetails = async () => {
      const res = await getCart();
      if (res.status === 200) {
        setCart(res.data.result);
      }
    };
    getCartDetails();
  }, []);

  const onCartCountChange = useCallback(async ({ type, id, quantity }) => {
    const res = await updateCart({ type, id, quantity });
    if (res.status === 200) {
      setCart(res.data.result);
    }
  }, []);

  const priceCard = (
    <>
      <Typography variant="h6" textbold size="ssm">
        Price Details
      </Typography>
      <hr />

      {cart?.products && (
        <Typography variant="div">
          <Typography variant="p" size="xs">
            Price({cart.products.length} Items) -{' '}
            <span>Rs. {calculateTotalPrice(cart.products)}</span>
          </Typography>
        </Typography>
      )}
      <Typography variant="p" size="xs">
        {' '}
        Discount - 999
      </Typography>
      <Typography variant="p" size="xs">
        {' '}
        Delivery Charges - Free
      </Typography>
      <hr />
      {cart?.products && (
        <Typography variant="p" textbold size="xs">
          {' '}
          Total amount - {Math.floor(calculateTotalPrice(cart.products) - 999)}
        </Typography>
      )}
      <hr />
      <Typography variant="p" size="sm" className="my-1" textbold>
        {' '}
        You will save 999 in this order
      </Typography>
      <Button component="button" className="Cart__button w-full text-bold">
        Place Order
      </Button>
    </>
  );

  return (
    <div className="Cart__root">
      <Typography variant="h6" className="text-center mb-1">
        My Cart
      </Typography>
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
            >
              <div className="d-flex flex-col content-between h-full">
                <Typography variant="h5" size="ssm">
                  {product.bookId.title}
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
                <Typography variant="h6" size="sm">
                  Rs. {product.bookId.price}
                </Typography>

                <div className="d-flex flex-col">
                  <Button component="button" className="Cart__button w-full text-bold">
                    Move to Wishlist
                  </Button>
                  <Button
                    component="button"
                    variant="outlined"
                    className="Cart__button w-full text-bold"
                  >
                    Remove from Cart
                  </Button>
                </div>
              </div>
            </BookCard>
          ))}
        </div>
        <div className="Cart__priceCard">{priceCard}</div>
      </div>
    </div>
  );
};

export default Cart;
