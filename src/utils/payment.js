/* eslint-disable camelcase */
import { generatePayment } from 'services/flixycartApi';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

async function displayRazorpay({ onSuccess, onError }) {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    onError('Razorpay SDK failed to load. Are you online?');
    return;
  }

  // creating a new order
  const result = await generatePayment();

  if (!result) {
    onError('Server error. Are you online?');
    return;
  }

  // Getting the order details back
  const { amount, id, currency } = result || {};

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: amount.toString(),
    currency,
    name: 'FlixyCart',
    description: 'Test Transaction',
    order_id: id,
    async handler(response) {
      onSuccess(response.razorpay_payment_id);
    },
    prefill: {
      name: 'Test User',
      email: 'tesuser@xyz.com',
      contact: '9999999999',
    },
    theme: {
      color: '#61dafb',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

export { loadScript, displayRazorpay };
