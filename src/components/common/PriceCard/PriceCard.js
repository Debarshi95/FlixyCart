import React, { memo, useCallback } from 'react';
import cn from 'classnames';
import toast from 'react-hot-toast';
import { Typography, Button } from 'components';
import { calculateTotalPrice } from 'utils/helperFuncs';
import './PriceCard.scss';

const PriceCard = ({ cart, className, headerTitle, buttonText, showDiscountToast, onClick }) => {
  const actualPrice = Math.floor(calculateTotalPrice(cart.products));

  const calculateFinalPrice = useCallback(() => {
    let finalPrice = actualPrice;
    if (actualPrice > 2400) {
      finalPrice -= 999;
      if (showDiscountToast) {
        toast.success('Discount of Rs.999 applied', {
          id: 'wqwq',
        });
      }
    }
    return finalPrice;
  }, [actualPrice, showDiscountToast]);

  const finalPrice = calculateFinalPrice();

  return (
    <div className={cn('PriceCard__root', className)}>
      <Typography variant="p" size="ssm">
        {headerTitle}
      </Typography>
      <hr />

      {cart?.products && (
        <Typography variant="div">
          <Typography variant="p" size="xs">
            Price({cart.products.length} Items) - <span>Rs. {finalPrice}</span>
          </Typography>
        </Typography>
      )}
      <Typography variant="p" size="xs">
        Discount - {actualPrice >= 2400 ? 999 : 0}
      </Typography>
      <Typography variant="p" size="xs">
        Delivery Charges - Free
      </Typography>
      <hr />
      {cart?.products && (
        <Typography variant="p" size="xs">
          Total amount - {finalPrice}
        </Typography>
      )}
      <hr />
      <Typography variant="p" size="xs" className="my-1" textbold>
        {actualPrice >= 2400
          ? "You'll save Rs.999 on this order"
          : 'Flat discount of Rs. 999/- above value of Rs.2400/-'}
      </Typography>
      <Button
        component="button"
        variant="outlined"
        className="Cart__button w-full text-bold"
        onClick={() => onClick(finalPrice)}
      >
        {buttonText}
      </Button>
    </div>
  );
};
PriceCard.defaultProps = {
  onClick: () => null,
  showDiscountToast: true,
};
export default memo(PriceCard);
