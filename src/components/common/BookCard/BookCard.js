import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import CardImage from '../CardImage/CardImage';
import Typography from '../Typography/Typography';
import './BookCard.scss';

const BookCard = ({ children, book }) => {
  return (
    <Link to={`/book/${book._id}`}>
      <div className="BookCard__root">
        <CardImage url={book.image} width="100%" height="70%" />
        <div className="BookCard__content">
          {children || (
            <>
              <div className="text-black">
                <Typography variant="h6" className="BookCard__title text-10">
                  {book.title}
                </Typography>
                <div className="d-flex">
                  {book.categories.map((item, idx) => (
                    <p key={idx} className="Typography--primary Typography--xs">
                      {item}{' '}
                    </p>
                  ))}
                </div>
                <Typography variant="p" className="text-black text-bold Typography--xs">
                  {book.author}
                </Typography>
              </div>
              <div className="d-flex content-between items-center">
                <Button
                  variant="contained"
                  component="button"
                  className="BookCard__button mr-1 text-bold"
                >
                  Add To Cart
                </Button>
                <Typography variant="h6">Rs {book.price}</Typography>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
