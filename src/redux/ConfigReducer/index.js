import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Navigation} from 'react-native-navigation';
import {MAPPED_ICONS} from 'RNN';
import Colors from 'theme/Colors';

const BOTTOM_TABS_CONFIG = [
  {
    idStack: 'TaskTab',
    name: 'Task',
    icon: 'ios-list-outline',
    selectedIcon: 'ios-list',
    topTitle: 'Task Management',
    bottomTitle: 'Task',
    topSubtitle: 'Manage your tasks easily',
    topColor: 'saddlebrown',
  },
  {
    idStack: 'FoodTab',
    name: 'Food',
    icon: 'ios-fast-food-outline',
    selectedIcon: 'ios-fast-food',
    topTitle: 'Food & Drink',
    bottomTitle: 'Food',
    topSubtitle: 'Explore culinary world',
    topColor: 'cadetblue',
  },
  {
    idStack: 'LoveTab',
    name: 'Love',
    icon: 'ios-heart-outline',
    selectedIcon: 'ios-heart',
    topTitle: 'Love memory',
    bottomTitle: 'Love',
    topSubtitle: 'Save the moment',
    topColor: 'crimson',
  },
  {
    idStack: 'ChatTab',
    name: 'Chat',
    icon: 'ios-chatbox-outline',
    selectedIcon: 'ios-chatbox',
    topTitle: 'Chat',
    bottomTitle: 'Chat',
    topSubtitle: 'Connect with all your friends',
    topColor: 'steelblue',
  },
  {
    idStack: 'ProfileTab',
    name: 'Profile',
    icon: 'ios-person-outline',
    selectedIcon: 'ios-person',
    topTitle: 'Profile',
    bottomTitle: 'Profile',
    topSubtitle: 'About you',
    topColor: 'slategray',
  },
];

export const appLoad = createAsyncThunk(
  'config/appLoad',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {token} = getState().auth;
      const {skipIntro} = getState().config;
      if (token) {
        Navigation.setRoot({
          root: {
            bottomTabs: {
              id: 'BottomTabs',
              children: BOTTOM_TABS_CONFIG.map(
                ({
                  idStack,
                  name,
                  icon,
                  selectedIcon,
                  topTitle,
                  bottomTitle,
                  topSubtitle,
                  topColor,
                }) => {
                  return {
                    stack: {
                      id: idStack,
                      children: [
                        {
                          component: {
                            id: name,
                            name,
                            options: {
                              statusBar: {
                                backgroundColor: topColor,
                                style: 'light',
                              },
                              topBar: {
                                visible: true,
                                animate: true,
                                drawBehind: false,
                                title: {
                                  text: topTitle,
                                  color: Colors.white,
                                },
                                subtitle: {
                                  text: topSubtitle,
                                  color: Colors.white,
                                },
                                background: {
                                  color: topColor,
                                },
                              },
                            },
                          },
                        },
                      ],
                      options: {
                        bottomTab: {
                          icon: MAPPED_ICONS[icon],
                          selectedIcon: MAPPED_ICONS[selectedIcon],
                          text: bottomTitle,
                          selectedIconColor: topColor,
                          iconColor: Colors.black,
                          textColor: Colors.black,
                          selectedTextColor: topColor,
                        },
                      },
                    },
                  };
                },
              ),
            },
          },
        });
      } else {
        if (skipIntro) {
          Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      id: 'Login',
                      name: 'Login',
                    },
                  },
                ],
              },
            },
          });
        } else {
          Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      id: 'OnBoarding',
                      name: 'OnBoarding',
                    },
                  },
                ],
              },
            },
          });
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const configSlice = createSlice({
  name: 'config',
  initialState: {
    skipIntro: false,
  },
  reducers: {
    setSkipIntro: (state, actions) => {
      state.skipIntro = actions.payload;
    },
  },
});

const {actions, reducer: configReducer} = configSlice;

export const {setSkipIntro} = actions;

export default configReducer;
