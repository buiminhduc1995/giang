import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers/index';
import { AsyncStorage, Platform, StatusBar } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunkMiddleware from 'redux-thunk';
import appConfig from '../../config/index';
import { MAIN_COLOR } from '../../constants';

const client = axios.create(appConfig.axios);

const axiosMW = axiosMiddleware(client);

const middleWares = [thunkMiddleware, axiosMW, appConfig.dev && logger].filter(Boolean);
const store = createStore(
  reducers,
  compose(
    autoRehydrate(),
    applyMiddleware(...middleWares),
  ),
);
console.disableYellowBox = true;
const config = {
  storage: AsyncStorage,
  // blacklist : ['nav', 'map', 'staticData', 'language', 'doctor', 'clinic', 'appointments', 'listFavorite']
  whitelist: ['user', 'dataPersist'],
};

export const persistor = persistStore(store, config, () => {
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(false);
    StatusBar.setBackgroundColor(MAIN_COLOR);
  }
});

export default store;
