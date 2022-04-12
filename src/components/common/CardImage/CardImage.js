import React from 'react';
import { useMediaQuery } from 'react-responsive';

const CardImage = ({ url, alt, height, width, smheight }) => {
  const sm = useMediaQuery({ maxWidth: '600px' });

  const imgHeight = sm ? smheight : height;
  return (
    <div style={{ width, height: imgHeight }}>
      <img
        src={url}
        alt={alt || ''}
        className="w-full h-full"
        style={{ objectFit: 'fill', objectPosition: 'center' }}
      />
    </div>
  );
};

CardImage.defaultProps = {
  height: '100%',
  width: '100%',
  smheight: '18rem',
};

export default CardImage;
