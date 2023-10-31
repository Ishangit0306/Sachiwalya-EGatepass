import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';
import { persistor, store } from './src/stores/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <PaperProvider>
          <RootSiblingParent>
            <AppNavigation />
          </RootSiblingParent>
        </PaperProvider>
      </Provider>
    </PersistGate>
  );
};

export default App;
