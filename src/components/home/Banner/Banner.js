import React from 'react';
import Button from '../../common/Button/Button';
import CardImage from '../../common/CardImage/CardImage';
import Typography from '../../common/Typography/Typography';
import './Banner.scss';

const Banner = () => {
  return (
    <div className="Banner__root w-full">
      <CardImage alt="Banner" url="/assets/images/banner.jpg" />
      <div className="h-full d-flex">
        <div className="Banner__container">
          <Typography variant="h1">Buy your best books</Typography>
          <Typography variant="h5" className="my-1 text-center" style={{ fontWeight: 500 }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </Typography>
          <div className="Banner__buttonsContainer d-flex">
            <Button variant="contained" link to="/#trending" className="py-1 width-10">
              Buy Now
            </Button>
            <Button variant="outlined" link to="/books">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
