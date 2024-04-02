import { cookies } from 'next/headers';
import axios from '../axios';

export async function getMe(
  _req: GetMeRequest,
): Promise<GetMeResponse | 401 | undefined> {
  if (!cookies().get('session')) return;

  try {
    const response = await axios.get('/me');
    return response.data;
  } catch (error: any) {
    return 401;
  }
}
