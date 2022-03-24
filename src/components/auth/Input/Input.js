import React from 'react';
import './Input.scss';

const Input = ({ type, hasLabel, className, label, htmlFor, ...props }) => {
  const InputComp = <input type={type} className={`Input__root ${className}`} {...props} />;

  return hasLabel ? (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      {InputComp}
    </>
  ) : (
    InputComp
  );
};

Input.defaultProps = {
  type: 'text',
  hasLabel: false,
  label: '',
};

export default Input;
