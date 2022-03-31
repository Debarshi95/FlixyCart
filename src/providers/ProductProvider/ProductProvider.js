import React, { createContext, useEffect, useMemo, useReducer, useContext } from 'react';
import productReducer from '../../pages/product/reducer/productReducer';
import { productActions } from '../../constants/actions';
import { getProducts } from '../../services/flixycartApi';

const initialState = {
  products: null,
  error: null,
  loading: true,
};

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const { FAILURE_GET_PRODUCTS, REQUEST_GET_PRODUCTS, SUCCESS_GET_PRODUCTS } = productActions;

    const fetchProducts = async () => {
      dispatch({ type: REQUEST_GET_PRODUCTS });
      try {
        const res = await getProducts();
        if (res.status === 200) {
          dispatch({ type: SUCCESS_GET_PRODUCTS, payload: res.data.result });
        }
      } catch (error) {
        dispatch({ type: FAILURE_GET_PRODUCTS, payload: error?.message });
      }
    };

    fetchProducts();
  }, []);

  const value = useMemo(() => ({ productState }), [productState]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
