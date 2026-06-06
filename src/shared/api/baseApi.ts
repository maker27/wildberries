import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { withBasePath } from '@/shared/config/basePath';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: withBasePath('/api'),
  }),
  tagTypes: ['Order'],
  endpoints: () => ({}),
});
