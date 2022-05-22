import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Accordion, BookCard, Button, PriceCard, Typography } from 'components';
import { useCart } from 'providers';
import { getUserAddress, placeOrder } from 'services/flixycartApi';
import './Checkout.scss';

const ITEMS = 'ITEMS';
const ADDRESS = 'ADDRESS';

const Checkout = () => {
  const [selectedCard, setSelectedCard] = useState(ITEMS);
  const [userAddress, setUserAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getUserAddress();
        setUserAddress(res.result);
      } catch (error) {
        toast.error('Some error occurred while getting address');
      }
    };

    fetchAddress();
  }, []);

  const handleCardToggle = (item) => {
    if (selectedCard === item) {
      setSelectedCard(null);
    } else {
      setSelectedCard(item);
    }
  };

  const handlePlaceOrder = async () => {
    if (selectedAddress === '') {
      return toast.error('Please select an address');
    }
    try {
      const data = await placeOrder(selectedAddress, cart.id);
      toast.success(data?.message);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);
    } catch (error) {
      toast.error("Couldn't place order!! Some error occurred");
    }
    return null;
  };

  return (
    <div className="Checkout__root">
      <Typography variant="h6" className="text-center my-1">
        Checkout
      </Typography>
      <div className="Checkout__mainWrapper">
        <div className="Checkout__accordion">
          <Accordion onToggle={() => handleCardToggle(ITEMS)} title="Items Overview">
            <div className={selectedCard === ITEMS ? 'open-out' : 'open-in'}>
              {cart?.products?.map((product) => (
                <BookCard
                  book={product}
                  orientation="row"
                  imageProps={{ width: '14rem', height: '14rem' }}
                  cardHeight="17"
                  className="p-1"
                  imageUrl={product.bookId.image}
                  key={product.bookId._id}
                >
                  <div className="d-flex flex-col content-between h-full">
                    <Typography variant="h5" size="xs">
                      {product.bookId.title}
                    </Typography>
                    <Typography variant="p" size="xs" className="Typography--ellipsis">
                      {product.bookId.description}
                    </Typography>
                    <Typography variant="div" className="d-flex items-center">
                      <Typography variant="p" className="text-10" textbold size="xs">
                        Quantity : {product.quantity}
                      </Typography>
                    </Typography>
                    <Typography variant="h6" size="xs">
                      Rs. {product.bookId.price}
                    </Typography>
                  </div>
                </BookCard>
              ))}
            </div>
          </Accordion>
          <Accordion onToggle={() => handleCardToggle(ADDRESS)} title="Address">
            <div className={selectedCard === ADDRESS ? 'open-out' : 'open-in'}>
              {userAddress?.map((address, idx) => (
                <div
                  className={cn('Checkout__addressCard', {
                    'addressCard-selected': selectedAddress === address._id,
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    'mb-2': idx === userAddress?.length - 1,
                  })}
                  key={address._id}
                >
                  <Typography>{address?.name}</Typography>
                  <Typography size="xs" className="text-12">
                    <span className="text-bold">Address</span> {address?.addressLine}
                  </Typography>
                  <Typography size="xs" className="text-12">
                    <span className="text-bold">State</span> {address?.state}
                  </Typography>
                  <Typography size="xs" className="text-12">
                    <span className="text-bold">Pin</span> {address?.pin}
                  </Typography>
                  <Button className="my-1" onClick={() => setSelectedAddress(address._id)}>
                    {selectedAddress === address._id ? 'Selected' : 'Select'}
                  </Button>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
        <PriceCard
          cart={cart}
          className="Checkout__orderCard"
          buttonText="Place Order"
          onClick={handlePlaceOrder}
          headerTitle="Order summary"
          showDiscountToast={false}
        />
      </div>
    </div>
  );
};

export default Checkout;
