import React, { createContext, useMemo, useCallback, useReducer, useContext } from 'react';
import { sortActions } from '../../constants/actions';
import { filterReducer } from '../../pages/product/reducer/filterReducer';

const initialState = {
  fastDeliveryOnly: false,
  categories: null,
  inStock: false,
  sortBy: null,
  ratedBy: null,
  price: null,
};

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const [filteredState, dispatch] = useReducer(filterReducer, initialState);

  const getSortedProducts = useCallback((productList, sortBy) => {
    if (sortBy) {
      if (sortBy === sortActions.HIGH_TO_LOW) {
        return productList.sort((a, b) => b.price - a.price);
      }
      if (sortBy === sortActions.LOW_TO_HIGH) {
        return productList.sort((a, b) => a.price - b.price);
      }
    }
    return productList;
  }, []);

  const getFilteredProducts = useCallback(
    (productList, { fastDeliveryOnly, inStockOnly, categories, ratedBy, price }) => {
      return productList
        .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
        .filter((item) => (inStockOnly ? item.inStock : true))
        .filter((item) =>
          categories ? categories.some((category) => item.categories.includes(category)) : true
        )
        .filter((item) => (ratedBy ? item.rating >= ratedBy : true))
        .filter((item) => (price ? item.price <= price : true));
    },
    []
  );

  const value = useMemo(
    () => ({ filteredState, getSortedProducts, getFilteredProducts, dispatch }),
    [filteredState, getFilteredProducts, getSortedProducts]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
