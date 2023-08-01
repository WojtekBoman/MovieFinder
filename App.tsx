import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Router from './src/navigation';

export default function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}
