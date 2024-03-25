import axios from './axios';

export async function ping() {
  try {
    return (await axios.get('/ping')).data;
  } catch (error: any) {
    throw {
      msg: error.response.data.message,
    };
  }
}
