
import {
  LOGIN, HOME,LOGOUT
} from '../types';

const initialAuthState = {
  data:{
    tabType:'HOME_TAB'
  }
};
export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        data: action.data
      };
    case LOGOUT:
      return {
        ...state,
        data:{tabType:'HOME_TAB'}
      }
    case HOME:
      return {
        ...state,
        data: action.data
      };
    // case ORDER:
    //   return {
    //     ...state,
    //     data1: action.data
    //   };
    // case ORDER_PROVIDER:
    //   return {
    //     ...state,
    //     data2: action.data
    //   };
    // case ORDER_IN_ORDER_DETAIL:
    //   return {
    //     ...state,
    //     data3: action.data
    //   };
    // case ORDER_IN_ORDER_FAVORITE:
    //   return {
    //     ...state,
    //     data4: action.data
    //   };
    default:
      return state;
  }
}