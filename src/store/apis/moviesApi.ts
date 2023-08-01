import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../types/Movie';
import Config from 'react-native-config';
import { ListResponse } from '../../types/ListResponse';

export const moviesApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders(headers) {
      if (Config.API_KEY) headers.set('Authorization', `Bearer ${Config.API_KEY}`);
      return headers;
    },
  }),
  tagTypes: ['Movie'],
  endpoints: (builder) => ({
    getMovies: builder.query<ListResponse<Movie>, string>({
      query: (queryText) => `/search/movie?query=${queryText}`,
      providesTags: ['Movie'],
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
