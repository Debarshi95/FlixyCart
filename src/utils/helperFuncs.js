export const setItem = (key = '', data = null, shouldRemoveItem = false) => {
  const itemExists = JSON.parse(localStorage.getItem(key));
  if (shouldRemoveItem && itemExists) {
    localStorage.removeItem(key);
  }
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = (key = '') => {
  return JSON.parse(localStorage.getItem(key));
};

export const clearItem = (key = '') => {
  localStorage.removeItem(key);
};

export const calculateTotalPrice = (items = []) => {
  return items.reduce((acc, curr) => {
    const { bookId, quantity } = curr;
    acc += Number(bookId.price) * Number(quantity);
    return acc;
  }, 0);
};

export const getItemInCart = (id, products = []) => {
  return products?.find((product) => product.bookId._id === id);
};
