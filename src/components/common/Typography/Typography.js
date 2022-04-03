import React from 'react';
import cn from 'classnames';
import './Typography.scss';

const variants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  div: 'div',
};
const Typography = ({ variant, className, size, textbold, ...props }) => {
  const Component = variants[variant] || 'p';
  return (
    <Component
      className={cn('Typography__root', className, {
        [`Typography--${size}`]: true,
        'text-bold': textbold,
      })}
      {...props}
    />
  );
};
Typography.defaultProps = {
  size: 'md',
  textbold: false,
};

export default Typography;
