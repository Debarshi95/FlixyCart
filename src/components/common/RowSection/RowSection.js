import React from 'react';
import toast from 'react-hot-toast';
import { updateCart } from '../../../services/flixycartApi';
import BookCard from '../BookCard/BookCard';
import Typography from '../Typography/Typography';
import './RowSection.scss';

const RowSection = ({ title, align, books, ...props }) => {
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
              onClick: (e) => {
                e.preventDefault();
                updateCart({ id: book._id, quantity: 1 });
                toast.success('Added to Cart!!');
              },
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default RowSection;
