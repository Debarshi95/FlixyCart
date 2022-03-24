import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './Button.scss';

const buttonComponents = {
  link: Link,
  button: 'button',
  div: 'div',
};
const Button = ({ component, text, variant, className, children, ...props }) => {
  const Component = buttonComponents[component];

  return (
    <Component
      className={cn('Button__root', className, {
        [`Button--${variant}`]: true,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

Button.defaultProps = {
  children: '',
  variant: 'contained',
  to: '/',
  className: '',
  component: 'link',
};
export default Button;
