import generateApiClient from '../utils/generateClient';

const flixyCartApi = generateApiClient(process.env.REACT_APP_BASE_URL);

const getProducts = () => flixyCartApi.get(`/books`);
const signIn = (data) => flixyCartApi.post('/auth/login', { ...data });
const signUp = (data) => flixyCartApi.post('/auth/register', { ...data });
const signout = () => flixyCartApi.post('/logout');
const getCart = () => flixyCartApi.get(`/cart`);
const updateCart = (data, type = '') => flixyCartApi.post(`/cart`, { type, ...data });
const removeFromCart = (id) => flixyCartApi.delete(`/cart`, { data: { id } });

export { getProducts, signIn, signUp, signout, getCart, updateCart, removeFromCart };
