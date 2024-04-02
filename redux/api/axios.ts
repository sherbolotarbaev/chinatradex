import { cookies } from 'next/headers';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 15000,
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const session = cookies().get('session');

  if (session) {
    config.headers.set('authorization', `Bearer ${encodeURIComponent(session.value)}`);
  }

  return config;
});

export default instance;
