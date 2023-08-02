import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

let reactotron = null;

if (__DEV__) {
  reactotron = Reactotron.configure().useReactNative().use(reactotronRedux()).connect();

  console.tron = Reactotron.log;
}

export default reactotron;
