import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

const Button = ({
  text,
  loading,
  loadingText,
  variant,
  className,
  children,
  to,
  link,
  ...props
}) => {
  const TextComp = <p className="Button__text">{loading ? loadingText : children}</p>;

  return (
    <div role="button" {...props} className={`Button__root Button__${variant} ${className}`}>
      {link ? (
        <Link to={to} className="Button__linkText">
          {children}
        </Link>
      ) : (
        TextComp
      )}
    </div>
  );
};

Button.defaultProps = {
  loadingText: 'Loading...',
  loading: false,
  children: '',
  variant: 'contained',
  link: false,
  to: '/',
};
export default Button;
