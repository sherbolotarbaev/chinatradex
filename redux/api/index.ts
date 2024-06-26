import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers) => {
    const session = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('session='));

    if (session) {
      headers.set('Authorization', `Bearer ${session.split('=')[1]}`);
    }

    return headers;
  },
  credentials: 'include',
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['me', 'auth', 'upload'],
  endpoints: (builder) => ({}),
});
