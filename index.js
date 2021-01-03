/**
 * @format
 */
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {ActivityIndicator, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {AppearanceProvider} from 'react-native-appearance';
import {PersistGate} from 'redux-persist/integration/react';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {store, persistor} from 'redux/store';
import {appLoad} from 'redux/ConfigReducer';
import Colors from 'theme/Colors';
import Fonts from 'theme/Fonts';

// import screens here
import {OnBoarding, Home, Login, Chat, Food, Love, Profile, Task} from 'screen';

const SCREENS = [
  {
    name: 'OnBoarding',
    Component: OnBoarding,
  },
  {
    name: 'Home',
    Component: Home,
  },
  {
    name: 'Login',
    Component: Login,
  },
  {
    name: 'Chat',
    Component: Chat,
  },
  {
    name: 'Food',
    Component: Food,
  },
  {
    name: 'Love',
    Component: Love,
  },
  {
    name: 'Profile',
    Component: Profile,
  },
  {
    name: 'Task',
    Component: Task,
  },
];

const APP_ICONS = {
  'ios-list-outline': [26, 'black', 'ionIcons'],
  'ios-list': [26, 'black', 'ionIcons'],
  'ios-heart-outline': [26, 'black', 'ionIcons'],
  'ios-heart': [26, 'black', 'ionIcons'],
  'ios-chatbox-outline': [26, 'black', 'ionIcons'],
  'ios-chatbox': [26, 'black', 'ionIcons'],
  'ios-fast-food-outline': [26, 'black', 'ionIcons'],
  'ios-fast-food': [26, 'black', 'ionIcons'],
  'ios-person-outline': [26, 'black', 'ionIcons'],
  'ios-person': [26, 'black', 'ionIcons'],
};

export const MAPPED_ICONS = {};

const registerScreens = () => {
  return SCREENS.map(({name, Component}) => {
    Navigation.registerComponent(
      name,
      () => (props) => {
        return (
          <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
              <AppearanceProvider>
                <Component {...props} />
              </AppearanceProvider>
            </PersistGate>
          </Provider>
        );
      },
      () => Component,
    );
  });
};

const setAppTheme = () => {
  Navigation.setDefaultOptions({
    bottomTab: {
      badgeColor: Colors.error,
      animateBadge: true,
      dotIndicator: {
        color: Colors.error,
        size: 10,
        visible: true,
        animate: true,
      },
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      selectedFontSize: 14,
    },
    bottomTabs: {
      animate: true,
      animateTabSelection: true,
      backgroundColor: Colors.white,
      elevation: 0,
      hideShadow: false,
      hideOnScroll: false,
      preferLargeIcons: false,
      tabsAttachMode: 'together',
      titleDisplayMode: 'showWhenActiveForce',
    },
    topBar: {
      animate: true,
      scrollEdgeAppearance: {
        background: {
          color: 'red',
        },
        active: true,
        noBorder: true,
      },
      borderHeight: 1,
      elevation: 0,
      hideOnScroll: false,
      hideNavBarOnFocusSearchBar: true,
      title: {
        fontSize: 16,
        fontFamily: Fonts.REGULAR,
      },
      subtitle: {
        fontSize: 14,
        fontFamily: Fonts.LIGHT,
      },
      backButton: {
        showTitle: false,
      },
    },
    statusBar: {
      style: 'light',
      animated: true,
      hideWithTopBar: true,
    },
    layout: {
      fitSystemWindows: true,
      orientation: ['portrait'],
    },
    sideMenu: {
      left: {},
      right: {},
      openGestureMode: 'entireScreen',
    },
    overlay: {
      interceptTouchOutside: true,
      handleKeyboardEvents: true,
    },
    modal: {
      swipeToDismiss: true,
    },
  });
};

const setAppIcon = async () => {
  try {
    const sources = await new Promise.all(
      Object.keys(APP_ICONS).map((iconName) => {
        switch (APP_ICONS[iconName][2]) {
          case 'fontAwesome':
            return FontAwesome.getImageSource(
              iconName,
              APP_ICONS[iconName][0],
              APP_ICONS[iconName][1],
            );
          case 'ionIcons':
            return IonIcons.getImageSource(
              iconName,
              APP_ICONS[iconName][0],
              APP_ICONS[iconName][1],
            );
          default:
            break;
        }
      }),
    );

    Object.keys(APP_ICONS).forEach((iconName, index) => {
      MAPPED_ICONS[iconName] = sources[index];
    });
  } catch (error) {
    throw error;
  }
  return true;
};

const initApp = async () => {
  setAppTheme();
  await setAppIcon();
  registerScreens();
  setTimeout(() => {
    store.dispatch(appLoad());
  }, 0);
};

Navigation.events().registerAppLaunchedListener(async () => {
  try {
    await initApp();
  } catch (error) {
    return Alert.alert(Config.APP_NAME, error?.message);
  }
});
