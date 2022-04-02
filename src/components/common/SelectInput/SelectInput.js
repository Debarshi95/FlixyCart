import React from 'react';
import cn from 'classnames';
import './SelectInput.scss';

const SelectInput = ({ type, className, children, labelProps, labelClassName, ...props }) => {
  return (
    <label
      htmlFor={props.id || props.name}
      className={cn('SelectInput__root', labelClassName)}
      {...labelProps}
    >
      <input type={type} className={cn('SelectInput__input', className)} {...props} />
      {children}
    </label>
  );
};
SelectInput.defaultProps = {
  type: 'checkbox',
  className: '',
  children: '',
  labelProps: null,
  labelClassName: '',
};
export default SelectInput;
