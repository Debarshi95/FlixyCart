import { ErrorBoundary } from 'components';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { AuthProvider, CartProvider, ProductProvider, ThemeProvider } from './providers';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          {(user) => (
            <ProductProvider>
              <CartProvider user={user}>
                <App />
              </CartProvider>
            </ProductProvider>
          )}
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
