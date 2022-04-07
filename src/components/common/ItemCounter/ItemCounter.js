import React from 'react';
import cn from 'classnames';
import { TiMinus, TiPlus } from 'react-icons/ti';
import Typography from '../Typography/Typography';
import './ItemCounter.scss';

const ItemCounter = ({ initialCount, itemId, onCartCountChange, className, ...props }) => {
  const handleIncrementCount = (e) => {
    e.preventDefault();
    if (onCartCountChange) {
      onCartCountChange({ id: itemId, quantity: 1 });
    }
  };
  const handleDecrementCount = async (e) => {
    e.preventDefault();
    if (onCartCountChange) {
      onCartCountChange({ id: itemId, quantity: 1, type: 'DECREMENT' });
    }
  };

  return (
    <div
      className={cn('ItemCounter__root d-flex items-center content-between', className)}
      {...props}
    >
      <button type="button" className="ItemCounter__button" onClick={handleDecrementCount}>
        <TiMinus />
      </button>

      <Typography variant="p" className="ItemCounter__text text-bold" size="xs">
        {initialCount}
      </Typography>
      <button type="button" className="ItemCounter__button" onClick={handleIncrementCount}>
        <TiPlus />
      </button>
    </div>
  );
};

ItemCounter.defaultProps = {
  initialCount: 0,
  onCartCountChange: null,
};

export default ItemCounter;
