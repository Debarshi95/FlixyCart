import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Footer, Loader, PrivateRoute } from '../components';

const LazyHome = React.lazy(() => import('./home/Home'));
const LazySignin = React.lazy(() => import('./auth/Signin/Signin'));
const LazySignup = React.lazy(() => import('./auth/Signup/Signup'));
const LazyCart = React.lazy(() => import('./cart/Cart'));

const App = () => {
  return (
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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
