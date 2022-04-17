import React from 'react';
import Typography from 'components/common/Typography/Typography';

const NotFound = () => {
  return (
    <div className="h-screen w-full d-flex content-center items-center">
      <Typography variant="p" size="md" align="center" className="Typography--primary">
        404 | Page not found
      </Typography>
    </div>
  );
};

export default NotFound;
