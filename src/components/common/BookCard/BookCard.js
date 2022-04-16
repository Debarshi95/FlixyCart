import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import Button from 'components/common/Button/Button';
import CardImage from 'components/common/CardImage/CardImage';
import Typography from 'components/common/Typography/Typography';
import { getItemInCart } from 'utils/helperFuncs';
import './BookCard.scss';
import { useCart } from 'providers';

const BookCard = ({
  children,
  className,
  orientation,
  book,
  imageProps,
  contentClassName,
  cardHeight,
  cardWidth,
  imageUrl,
  buttonProps,
  ...props
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const itemAdded = getItemInCart(book._id, cart.products);

    if (itemAdded) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [book._id, cart.products]);

  const handleCardClick = () => {
    if (buttonProps.onClick) {
      buttonProps.onClick(isAddedToCart, book._id);
    }
  };

  return (
    <div
      className={cn('BookCard__root d-flex', className, {
        [`flex-${orientation}`]: true,
        [`h-${cardHeight}`]: true,
        [`w-${cardWidth}`]: true,
      })}
      {...props}
    >
      <CardImage url={imageUrl || book.image} {...imageProps} />
      <div className={cn('BookCard__content', { contentClassName })}>
        {children || (
          <>
            <div>
              <Typography variant="h6" className="Typography--ellipsis" size="sm">
                {book.title}
              </Typography>
              <div className="d-flex">
                {book.categories.map((item, idx) => (
                  <p key={idx} className="Typography--primary Typography--xs">
                    {item}{' '}
                  </p>
                ))}
              </div>
              <div className="d-flex content-between">
                <Typography
                  variant="p"
                  className="Typography--ellipsis max-w-60"
                  textbold
                  size="xs"
                >
                  {book.author}
                </Typography>
                <Typography variant="p" textbold size="xs">
                  Rs {book.price}
                </Typography>
              </div>
            </div>

            <Button
              variant="contained"
              component="button"
              className="BookCard__button  text-bold w-full"
              {...buttonProps}
              onClick={handleCardClick}
            >
              {isAddedToCart ? 'Remove from cart' : 'Add to cart'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
BookCard.defaultProps = {
  imageProps: {
    width: '100%',
    height: '70%',
  },
  children: null,
  contentClassName: '',
  orientation: 'col',
  cardHeight: '24',
  cardWidth: 'auto',
};
export default memo(BookCard);
