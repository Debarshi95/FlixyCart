import { loadProductActions } from '../../../constants/actions';

const productReducer = (state, action) => {
  const { REQUEST_GET_PRODUCTS, REQUEST_GET_PRODUCTS_FAILURE, REQUEST_GET_PRODUCTS_SUCCESS } =
    loadProductActions;
  switch (action.type) {
    case REQUEST_GET_PRODUCTS:
      return { ...state, loading: true };
    case REQUEST_GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case REQUEST_GET_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default: {
      return state;
    }
  }
};

export { productReducer };
