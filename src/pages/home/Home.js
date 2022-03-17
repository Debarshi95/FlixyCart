/* eslint-disable react/no-array-index-key */
import React, { useEffect, useReducer } from 'react';
import { RowSection, Banner } from '../../components';
import { getProducts } from '../../services/flixycartApi';
import { productReducer } from './reducers/productReducer';
import { loadProductActions } from '../../constants/actions';
import './Home.scss';

const Home = () => {
  const [productState, dispatch] = useReducer(productReducer, { loading: true, product: [] });

  useEffect(() => {
    document.title = 'Flixycart | Your store for latest books';

    dispatch({ type: loadProductActions.REQUEST_GET_PRODUCTS });

    getProducts()
      .then((res) => {
        dispatch({
          type: loadProductActions.REQUEST_GET_PRODUCTS_SUCCESS,
          payload: res.data.result,
        });
      })
      .catch((err) =>
        dispatch({
          type: loadProductActions.REQUEST_GET_PRODUCTS_SUCCESS,
          payload: err.message,
        })
      );
  }, []);

  return (
    <div className="Home__root w-full min-h-screen d-flex flex-col">
      <Banner />
      <section className="Home__section">
        <RowSection
          title="Trending"
          titleAlign="center"
          books={productState.product?.slice(0, 4)}
          id="trending"
        />
        <RowSection
          title="Top Sellers"
          titleAlign="center"
          books={productState.product?.slice(4, 8)}
        />
        <RowSection
          title="Books on Sale"
          titleAlign="left"
          books={productState.product?.slice(6, 10).reverse()}
        />
      </section>
    </div>
  );
};

export default Home;
