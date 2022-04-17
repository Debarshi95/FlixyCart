import React from 'react';
import Button from 'components/common/Button/Button';
import CardImage from 'components/common/CardImage/CardImage';
import Typography from 'components/common/Typography/Typography';
import './Banner.scss';

const Banner = () => {
  return (
    <div className="Banner__root w-full">
      <CardImage alt="Banner" url="/assets/images/banner.jpg" />
      <div className="h-full d-flex">
        <div className="Banner__container">
          <Typography variant="h1" size="xl">
            Buy your best books
          </Typography>
          <Typography variant="h5" className="my-1 Typography--500" size="mmd" align="center">
            Best and top selling books in the world
          </Typography>
          <div className="Banner__buttonsContainer d-flex">
            <Button variant="contained" component="link" to="/books" className="Banner__button">
              See Books
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
