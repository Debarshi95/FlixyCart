import React from 'react';
import { FaHeart } from 'react-icons/fa';
import Typography from '../Typography/Typography';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="Footer__root">
      <Typography variant="h6">
        {' '}
        Made with <FaHeart /> by Debarshi
      </Typography>
    </div>
  );
};

export default Footer;
