import React, { useState } from 'react';
import cn from 'classnames';
import Typography from '../../common/Typography/Typography';
import './PriceSlider.scss';

const PriceSlider = ({ min, max, className, sliderClassName, sliderProps, ...props }) => {
  const [value, setValue] = useState(min);

  const handleOnChange = (e) => {
    const { onChange = null } = sliderProps;
    setValue(e.target.value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn('PriceSlider__root', className)} {...props}>
      <input
        type="range"
        className={cn('PriceSlider__input d-block', sliderClassName)}
        min={min}
        max={max}
        value={value}
        {...sliderProps}
        onChange={handleOnChange}
      />
      <Typography variant="p" size="xs" textbold className="px-half" align="center">
        Rs. {value}
      </Typography>
    </div>
  );
};

PriceSlider.defaultProps = {
  min: 99,
  max: 999,
  sliderProps: null,
  sliderClassName: '',
};

export default PriceSlider;
