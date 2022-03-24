import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from '../components';

const LazyHome = React.lazy(() => import('./home/Home'));
const LazySignin = React.lazy(() => import('./auth/Signin/Signin'));
const LazySignup = React.lazy(() => import('./auth/Signup/Signup'));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<h2>Loading..</h2>}>
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<h2>Loading..</h2>}>
              <LazySignin />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<h2>Loading..</h2>}>
              <LazySignup />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
