import { CHANGE_SELECTED_TAB, CHANGE_SCROLLTAB_ORDER_SCREEN } from '../types';

//thay doi tab o man hinh chinh ban dau
export function changeTabNavigator(name) {
  return dispatch =>
    dispatch({
      type: CHANGE_SELECTED_TAB,
      selectedTabNavigator: name,
    });
}
//thay doi scrolltab o man hinh providerScreen
export function changeScrollTab(number) {
  return dispatch =>
    dispatch({
      type: CHANGE_SCROLLTAB_ORDER_SCREEN,
      scrollTabOrderScreenNumber: number,
    });
}
