import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import './Loader.scss';

const COLOR = '#6a5ad4';

const Loader = () => {
  return (
    <div className="Loader__root">
      <HashLoader color={COLOR} />
    </div>
  );
};

export default Loader;
