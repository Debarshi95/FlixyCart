import React from 'react';
import { FaHeart } from 'react-icons/fa';
import Typography from 'components/common/Typography/Typography';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="Footer__root">
      <Typography
        variant="h6"
        size="xs"
        className="Typography--600 py-2 d-flex items-center content-center"
      >
        Made with <FaHeart /> by Debarshi
      </Typography>
    </div>
  );
};

export default Footer;
