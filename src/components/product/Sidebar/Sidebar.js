import React from 'react';
import cn from 'classnames';
import SelectInput from '../../common/SelectInput/SelectInput';
import Typography from '../../common/Typography/Typography';
import { useFilter } from '../../../providers/FilterProvider/FilterProvider';
import { sortActions, ratings } from '../../../constants/actions';
import Button from '../../common/Button/Button';
import PriceSlider from '../PriceSlider/PriceSlider';
import './Sidebar.scss';

const Sidebar = ({ xs, showMobileSidebar, ...props }) => {
  const {
    filteredState: { sortBy, ratedBy, categories },
    dispatch,
  } = useFilter();

  const handleCheckBox = ({ payload = null }) => {
    if (payload === null) {
      return dispatch({ type: sortActions.CATEGORIES, payload });
    }

    if (categories?.includes(payload)) {
      const filteredCategories = categories.filter((category) => category !== payload);

      const actionPayload = filteredCategories.length > 0 ? filteredCategories : '';
      return dispatch({ type: sortActions.CATEGORIES, payload: actionPayload });
    }

    const actionPayload = categories ? [...categories, payload] : [payload];
    return dispatch({ type: sortActions.CATEGORIES, payload: actionPayload });
  };

  return (
    <aside
      className={cn('Sidebar__root', { 'Sidebar--mobile': xs, 'Sidebar--open': showMobileSidebar })}
      {...props}
    >
      <Typography variant="h6" className="text-center">
        FITLERS
      </Typography>

      <article>
        <Typography variant="p" className="Typography--xs text-bold">
          Price
        </Typography>
        <PriceSlider
          sliderProps={{
            onChange: (price) => {
              dispatch({ type: sortActions.PRICE, payload: Number(price) });
            },
          }}
        />
      </article>

      <article>
        <Typography variant="h6" className="Typography--xs">
          Sort By
        </Typography>
        <SelectInput
          type="radio"
          labelClassName="Typography--xs"
          labelProps={{ htmlFor: 'high-to-low' }}
          name="high-to-low"
          checked={sortBy === sortActions.HIGH_TO_LOW}
          onChange={() => dispatch({ type: sortActions.SORT, payload: sortActions.HIGH_TO_LOW })}
        >
          High To Low
        </SelectInput>
        <SelectInput
          type="radio"
          labelProps={{ htmlFor: 'low-to-high' }}
          name="low-to-high"
          labelClassName="Typography--xs"
          checked={sortBy === sortActions.LOW_TO_HIGH}
          onChange={() => dispatch({ type: sortActions.SORT, payload: sortActions.LOW_TO_HIGH })}
        >
          Low to High
        </SelectInput>
      </article>

      <article className="my-1">
        <Typography variant="h6" className="Typography--xs">
          Ratings
        </Typography>
        <SelectInput
          type="radio"
          labelProps={{ htmlFor: '4-5-and-above' }}
          labelClassName="Typography--xs"
          name="4-5-and-above"
          checked={ratedBy === ratings.FOUR_AND_HALF_STARS}
          onChange={() =>
            dispatch({ type: sortActions.RATINGS, payload: ratings.FOUR_AND_HALF_STARS })
          }
        >
          4.5 star and above
        </SelectInput>

        <SelectInput
          type="radio"
          labelProps={{ htmlFor: '4-and-above' }}
          labelClassName="Typography--xs"
          name="4-and-above"
          checked={ratedBy === ratings.FOUR_STARS}
          onChange={() => dispatch({ type: sortActions.RATINGS, payload: ratings.FOUR_STARS })}
        >
          4 star and above
        </SelectInput>

        <SelectInput
          type="radio"
          labelProps={{ htmlFor: '3-and-above' }}
          labelClassName="Typography--xs"
          name="3-and-above"
          checked={ratedBy === ratings.THREE_STARS}
          onChange={() => dispatch({ type: sortActions.RATINGS, payload: ratings.THREE_STARS })}
        >
          3 star and above
        </SelectInput>
      </article>

      <article>
        <Typography variant="h6" className="Typography--xs">
          Categories
        </Typography>
        <SelectInput
          type="checkbox"
          labelProps={{ htmlFor: 'non-ficiton' }}
          labelClassName="Typography--xs"
          name="non-ficiton"
          checked={categories?.includes('Non-Fiction')}
          onChange={() => handleCheckBox({ payload: 'Non-Fiction' })}
        >
          Non Fiction
        </SelectInput>

        <SelectInput
          type="checkbox"
          labelProps={{ htmlFor: 'novel' }}
          labelClassName="Typography--xs"
          name="novel"
          checked={categories?.includes('Novel')}
          onChange={() => handleCheckBox({ payload: 'Novel' })}
        >
          Novel
        </SelectInput>

        <SelectInput
          type="checkbox"
          labelProps={{ htmlFor: 'thriller' }}
          labelClassName="Typography--xs"
          name="thriller"
          checked={categories?.includes('Thriller')}
          onChange={() => handleCheckBox({ payload: 'Thriller' })}
        >
          Thriller
        </SelectInput>

        <SelectInput
          type="checkbox"
          labelProps={{ htmlFor: 'others' }}
          labelClassName="Typography--xs"
          name="others"
          onChange={() => handleCheckBox({ payload: null })}
        >
          All
        </SelectInput>
      </article>
      <Button
        variant="outlined Typography--primary w-8 text-bold my-1"
        onClick={() => dispatch({ type: sortActions.CLEAR })}
      >
        Clear
      </Button>
    </aside>
  );
};

export default Sidebar;
