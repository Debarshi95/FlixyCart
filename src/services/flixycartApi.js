import generateApiClient from '../utils/generateClient';

const flixyCartApi = generateApiClient(process.env.REACT_APP_BASE_URL);
console.log(process.env.BASE_URL);
const getProducts = () => flixyCartApi.get(`/books`);

export { getProducts };
