export const setItem = (data, key = '') => {
  const itemExists = JSON.parse(localStorage.getItem(key));
  if (itemExists) {
    localStorage.setItem(key, JSON.stringify({ ...itemExists, ...data }));
  }
};

export const getItem = (key = '') => {
  return JSON.parse(localStorage.getItem(key));
};
