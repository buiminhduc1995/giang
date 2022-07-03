import { CHANGE_SCROLLTAB_ORDER_SCREEN, CHANGE_SELECTED_TAB } from '../types';
import { TAB } from '../../constants';

const initialState = {
  selectedTabNavigator: TAB.DRUG_STORE_TAB,
  scrollTabOrderScreenNumber: 0,
};

export default function navigate(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_TAB: {
      return {
        ...state,
        selectedTabNavigator: action.selectedTabNavigator,
      };
    }
    case CHANGE_SCROLLTAB_ORDER_SCREEN: {
      return {
        ...state,
        scrollTabOrderScreenNumber: action.scrollTabOrderScreenNumber,
      };
    }
    default:
      return state;
  }
}
