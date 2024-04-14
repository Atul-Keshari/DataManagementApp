

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/index';
import Navigation from './src/navigations/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
