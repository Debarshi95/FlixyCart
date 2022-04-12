import { productActions } from 'constants/actions';

const productReducer = (state, action) => {
  switch (action.type) {
    case productActions.REQUEST_GET_PRODUCTS:
      return { ...state, loading: true };

    case productActions.SUCCESS_GET_PRODUCTS:
      return { ...state, loading: false, products: action.payload };

    case productActions.FAILURE_GET_PRODUCTS:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;
