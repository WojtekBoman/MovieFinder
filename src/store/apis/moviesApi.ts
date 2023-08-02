import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieDetails } from '../../types/Movie';
import Config from 'react-native-config';
import { ListResponse } from '../../types/ListResponse';
import { createEntityAdapter } from '@reduxjs/toolkit';

const moviesAdapter = createEntityAdapter({
  selectId: (item: Movie) => item.id,
});

const moviesSelector = moviesAdapter.getSelectors();

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
    getMovies: builder.query({
      query: ({ queryText, page }: { queryText: string; page: number }) =>
        `/search/movie?query=${queryText}&page=${page}`,
      providesTags: ['Movie'],
      transformResponse: (response: ListResponse<Movie>) => {
        return moviesAdapter.addMany(moviesAdapter.getInitialState(), response.results);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.queryText}`;
      },
      merge(currentCacheData, responseData) {
        moviesAdapter.addMany(currentCacheData, moviesSelector.selectAll(responseData));
      },
    }),
    getMovie: builder.query<MovieDetails, number>({
      query: (id) => `/movie/${id}`,
      providesTags: ['Movie'],
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieQuery } = moviesApi;

export { moviesSelector, moviesAdapter };
