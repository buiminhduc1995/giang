import { combineReducers } from 'redux';
import auth from '../reducers/auth.js';
import user from '../reducers/user.js';
import configReducer from '../reducers/config';
import order from '../reducers/order';
import company from '../reducers/company';
import product from '../reducers/product';
import notify from '../reducers/notify';
import social from '../reducers/social';
import dataPersist from '../reducers/dataPersist';
import inventory from '../reducers/inventory';
import orderToProvider from '../reducers/orderToProvider';
import navigation from '../reducers/navigation';
import { RESET_APP } from '../types/index.js';
const AppReducer = combineReducers({
  auth,
  user,
  configReducer,
  order,
  company,
  product,
  notify,
  social,
  dataPersist,
  inventory,
  orderToProvider,
  navigation,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    state = undefined;
  }
  return AppReducer(state, action);
};

export default rootReducer;
