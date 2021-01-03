import {Alert} from 'react-native';
import Config from 'react-native-config';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {signInWithEmailAndPassword} from 'service/FirebaseService';

// handle api
export const signIn = createAsyncThunk(
  'auth/signInWithEmailAndPassword',
  async (params) => {
    try {
      const response = await signInWithEmailAndPassword(params);
      return response;
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return Alert.alert(Config.APP_NAME, 'The email address is not valid');
        case 'auth/user-disabled':
          return Alert.alert(
            Config.APP_NAME,
            'The user corresponding to the given email has been disabled',
          );
        case 'auth/user-not-found':
          return Alert.alert(
            Config.APP_NAME,
            'There is no user corresponding to the given email',
          );
        case 'auth/wrong-password':
          return Alert.alert(
            Config.APP_NAME,
            'The password is invalid for the given email, or the account corresponding to the email does not have a password set',
          );
        default:
          break;
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    token: null,
  },
  reducers: {},
  extraReducers: {
    [signIn.fulfilled]: (state, {payload}) => {
      state.token = payload?.user?._user?.refreshToken;
      state.currentUser = payload?.user?._user;
    },
  },
});

export const {actions, reducer: authReducer} = authSlice;

export default authReducer;
