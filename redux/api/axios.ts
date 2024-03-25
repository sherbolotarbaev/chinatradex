import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 15000,
  withCredentials: true,
});

// instance.interceptors.request.use(async (config) => {
//   return config;
// });

export default instance;
