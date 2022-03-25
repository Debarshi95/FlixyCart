import generateApiClient from '../utils/generateClient';

const flixyCartApi = generateApiClient(process.env.REACT_APP_BASE_URL);

const getProducts = () => flixyCartApi.get(`/books`);
const signIn = (data) => flixyCartApi.post('/auth/login', { ...data });

export { getProducts, signIn };
