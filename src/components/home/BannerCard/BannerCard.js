import React from 'react';
import Typography from '../../common/Typography/Typography';

const BannerCard = ({ card }) => {
  return (
    <div className="d-flex font-inherit">
      <div className="d-flex content-evenly">
        <Typography>{card.icon}</Typography>
        <div>
          <Typography variant="h6">{card.titleText}</Typography>
          <Typography>{card.subTitleText}</Typography>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
