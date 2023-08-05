import { configureStore } from '@reduxjs/toolkit';
import Reactotron from '../configuration/ReactotronConfig';
import { moviesApi } from './apis/moviesApi';
import { rtkQueryErrorLogger } from './middleware';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger).concat(moviesApi.middleware),
  enhancers: [Reactotron.createEnhancer()],
});
