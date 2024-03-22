import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    uploadPhoto: build.mutation<UploadPhotoResponse, UploadPhotoRequest>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/upload/photo',
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['upload'],
    }),
  }),
});
export const { useUploadPhotoMutation } = api;
export default api;
