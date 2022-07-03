import * as types from '../types';

const defaultUserState = {
  dataUser: {
    info: {},
    store: {},
    list_employees: [],
  },
  isLogged: false,
  saveLogged: false,
  token: '',
  pointWallet: '',
  isHaveSubStore: false,
  userSaved: {
    username: '',
    password: '',
  },
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case types.LOGGED: {
      return {
        ...state,
        isLogged: true,
        dataUser: action.data,
        saveLogged: action.saveLogged,
        userSaved: action.userSaved,
        token: action.data.token,
        isHaveSubStore: action.data.sub_stores.length > 0 ? true : false,
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        isLogged: false,
        dataUser: {
          info: null,
          store: null,
        },
      };
    }
    case types.GET_POINT_WALLET:
      return { ...state, pointWallet: action.pointWallet };
    default:
      return state;
  }
}
