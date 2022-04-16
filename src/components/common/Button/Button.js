import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './Button.scss';

const buttonComponents = {
  link: Link,
  button: 'button',
  div: 'div',
};
const Button = ({ component, text, variant, className, children, boldText, ...props }) => {
  const Component = buttonComponents[component];

  return (
    <Component
      className={cn('Button__root', className, {
        [`Button--${variant}`]: true,
        'Button--disabled': props.disabled,
        'text-bold': boldText,
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
  className: '',
  component: 'button',
  text: '',
  disabled: false,
  boldText: 'false',
};
export default Button;
