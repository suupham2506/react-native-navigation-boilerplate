import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Navigation} from 'react-native-navigation';

export const appLoad = createAsyncThunk(
  'config/appLoad',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = null;
      if (!token) {
        Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.rnn.app',
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
                    name: 'com.rnn.app',
                  },
                },
              ],
            },
          },
        });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const configSlice = createSlice({
  name: 'config',
  initialState: {},
  reducers: {},
});

const {actions, reducer: configReducer} = configSlice;

export const {} = actions;

export default configReducer;
