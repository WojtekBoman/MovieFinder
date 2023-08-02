import { configureStore } from '@reduxjs/toolkit';
import Reactotron from '../configuration/ReactotronConfig';
import { moviesApi } from './apis/moviesApi';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
  enhancers: [Reactotron.createEnhancer()],
});
