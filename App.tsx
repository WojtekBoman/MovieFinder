import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Router from './src/navigation';
import { store } from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </Provider>
  );
}
