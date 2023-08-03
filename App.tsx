import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Router from './src/navigation';
import { store } from './src/store/store';
import RNBootSplash from 'react-native-bootsplash';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true, duration: 500 });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider>
        <PaperProvider>
          <Router />
        </PaperProvider>
      </ToastProvider>
    </Provider>
  );
}
