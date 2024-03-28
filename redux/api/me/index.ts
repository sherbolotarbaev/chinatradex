import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<GetMeResponse, GetMeRequest>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['me'],
    }),

    editMe: build.mutation<EditMeResponse, EditMeRequest>({
      query: (body) => ({
        url: '/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['me'],
    }),
  }),
});
export const { useGetMeQuery, useEditMeMutation } = api;
export default api;
