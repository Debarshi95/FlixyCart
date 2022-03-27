import generateApiClient from '../utils/generateClient';

const flixyCartApi = generateApiClient(process.env.REACT_APP_BASE_URL);

const getProducts = () => flixyCartApi.get(`/books`);
const signIn = (data) => flixyCartApi.post('/auth/login', { ...data });
const signUp = (data) => flixyCartApi.post('/auth/register', { ...data });
const signout = () => flixyCartApi.post('/logout');

export { getProducts, signIn, signUp, signout };
