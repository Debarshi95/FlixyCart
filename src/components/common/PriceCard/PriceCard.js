import React, { memo } from 'react';
import cn from 'classnames';
import toast from 'react-hot-toast';
import { Typography, Button } from 'components';
import { calculateTotalPrice } from 'utils/helperFuncs';
import './PriceCard.scss';

const PriceCard = ({ cart, className, headerTitle, buttonText, onClick }) => {
  const total = Math.floor(calculateTotalPrice(cart.products));

  const calculateFinalPrice = () => {
    let totalPrice = total;
    if (total > 2400) {
      totalPrice = total - 999;
      toast.success('Discount of Rs.999 applied', {
        id: 'wqwq',
      });
    }
    return totalPrice;
  };

  return (
    <div className={cn('PriceCard__root', className)}>
      <Typography variant="p" size="ssm">
        {headerTitle}
      </Typography>
      <hr />

      {cart?.products && (
        <Typography variant="div">
          <Typography variant="p" size="xs">
            Price({cart.products.length} Items) - <span>Rs. {total}</span>
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
        <Typography variant="p" size="xs">
          {' '}
          Total amount - {calculateFinalPrice()}
        </Typography>
      )}
      <hr />
      <Typography variant="p" size="xs" className="my-1" textbold>
        {' '}
        {total >= 2400
          ? "You'll save Rs.999 on this order"
          : 'Make cart price above 2400 to be eligible for discount'}
      </Typography>
      <Button
        component="button"
        variant="outlined"
        className="Cart__button w-full text-bold"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};
PriceCard.defaultProps = {
  onClick: () => null,
};
export default memo(PriceCard);
