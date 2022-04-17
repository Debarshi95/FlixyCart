import React from 'react';
import toast from 'react-hot-toast';
import BookCard from 'components/common/BookCard/BookCard';
import Typography from 'components/common/Typography/Typography';
import { useCart } from 'providers';
import './RowSection.scss';

const RowSection = ({ title, align, books, ...props }) => {
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

  return (
    <section className="flex-1 RowSection__root" {...props}>
      <Typography variant="h4" align={align} className="RowSection__title">
        {title}
      </Typography>
      <div className="RowSection__row">
        {books?.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            cardHeight="auto"
            imageProps={{ width: '100%', height: '18rem' }}
            buttonProps={{
              onClick: handleButtonClick,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default RowSection;
