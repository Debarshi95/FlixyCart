import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Typography } from 'components';

const Accordion = ({ children, onToggle, title }) => {
  return (
    <section>
      <div className="rounded-md flex-1">
        <div className="Checkout__toggleHeader">
          <Typography>{title}</Typography>
          <div role="button" aria-hidden onClick={onToggle}>
            <BsPlusCircle cursor="pointer" />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Accordion;
