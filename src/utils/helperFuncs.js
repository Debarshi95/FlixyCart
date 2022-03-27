export const setItem = (key = '', data = null) => {
  const itemExists = JSON.parse(localStorage.getItem(key));
  if (itemExists) {
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
