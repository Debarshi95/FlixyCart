import { sortActions } from '../constants/actions';

export const filterReducer = (state, action) => {
  switch (action.type) {
    case sortActions.CATEGORIES:
      return { ...state, categories: action.payload };

    case sortActions.TOGGLE_DELIVERY:
      return { ...state, fastDeliveryOnly: !state.fastDeliveryOnly };

    case sortActions.TOGGLE_INVENTORY:
      return { ...state, inStock: !state.inStock };

    case sortActions.SORT:
      return { ...state, sortBy: action.payload };

    case sortActions.RATINGS:
      return { ...state, ratedBy: action.payload };
    case sortActions.PRICE:
      return { ...state, price: action.payload };

    case sortActions.CLEAR:
      return {
        ...state,
        fastDeliveryOnly: false,
        categories: null,
        inStock: false,
        sortBy: null,
        ratedBy: null,
        price: null,
      };
    default:
      return state;
  }
};
