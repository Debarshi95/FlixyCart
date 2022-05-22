import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar, Loader, PrivateRoute, NotFound } from 'components';
import { FilterProvider } from 'providers';

const LazyHome = React.lazy(() => import('./home/Home'));
const LazySignin = React.lazy(() => import('./auth/Signin/Signin'));
const LazySignup = React.lazy(() => import('./auth/Signup/Signup'));
const LazyCart = React.lazy(() => import('./cart/Cart'));
const LazyBook = React.lazy(() => import('./product/Product/Product'));
const LazyWishlist = React.lazy(() => import('./wishlist/Wishlist'));
const LazyCheckout = React.lazy(() => import('./checkout/Checkout'));

const App = () => {
  return (
    <main className="app__root">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            index
            element={
              <Suspense fallback={<Loader />}>
                <LazyHome />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={<Loader />}>
                <LazySignin />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loader />}>
                <LazySignup />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loader />}>
                <PrivateRoute>
                  <LazyCart />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/books"
            element={
              <Suspense fallback={<Loader />}>
                <FilterProvider>
                  <LazyBook />
                </FilterProvider>
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<Loader />}>
                <PrivateRoute>
                  <LazyCheckout />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Suspense fallback={<Loader />}>
                <PrivateRoute>
                  <LazyWishlist />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </main>
  );
};

export default App;
