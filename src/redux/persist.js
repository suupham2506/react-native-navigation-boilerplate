import AsyncStorage from '@react-native-async-storage/async-storage';

const reduxPersist = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  version: 1,
  whitelist: ['config', 'auth'],
  blacklist: [],
};

export default reduxPersist;
