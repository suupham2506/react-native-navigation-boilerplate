import React from 'react';
import {Navigation} from 'react-native-navigation';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {AppearanceProvider} from 'react-native-appearance';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from 'src/redux/store';
import {appLoad} from 'redux/ConfigReducer';

// import screens here
import App from 'screen/App';

const SCREENS = [
  {
    name: 'app',
    Component: App,
  },
];

const registerScreens = () => {
  return SCREENS.map(({name, Component}) => {
    Navigation.registerComponent(
      `com.rnn.${name}`,
      () => (props) => (
        <Provider store={store}>
          <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
            <AppearanceProvider>
              <Component {...props} />
            </AppearanceProvider>
          </PersistGate>
        </Provider>
      ),
      () => Component,
    );
  });
};

const Stack = () => {
  const loadIntial = () => {
    try {
      registerScreens();
      store.dispatch(appLoad());
    } catch (error) {
      throw error;
    }
  };

  Navigation.events().registerAppLaunchedListener(() => {
    try {
      loadIntial();
    } catch (error) {}
  });
};

export default Stack;
