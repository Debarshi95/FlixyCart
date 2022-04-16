import React, { createContext, useEffect, useMemo, useContext, useState, useCallback } from 'react';

import { getCart, removeFromCart, updateCart } from 'services/flixycartApi';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const res = await getCart();
        setCart(res.result);
      } catch (error) {
        toast.error('Oops!!Some error occurred');
      }
    };
    getCartDetails();
  }, []);

  const handleUpdateCart = useCallback(async ({ type, id, quantity }) => {
    try {
      const res = await updateCart({ type, id, quantity });
      setCart(res.result);
    } catch (error) {
      toast.error('Oops!!Couldn\t update cart');
    }
  }, []);

  const handleRemoveFromCart = useCallback(async (id) => {
    try {
      const res = await removeFromCart(id);
      console.log({ res });
      setCart(res.result);
    } catch (error) {
      toast.error('Oops!!Couldn\t update cart');
    }
  }, []);

  const value = useMemo(
    () => ({ cart, handleUpdateCart, handleRemoveFromCart }),
    [cart, handleUpdateCart, handleRemoveFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default ProductProvider;
