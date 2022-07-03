import { ADD_PRODUCT_ORDER, DELETE_PRODUCT_ORDER, UPDATE_PRODUCT_ORDER, RESET_PRODUCT_ORDER } from '../types';

//Danh sach thuoc order den nha cung cap/cong ty duoc
export function addProductOrder(productSelected) {
  return dispatch =>
    dispatch({
      type: ADD_PRODUCT_ORDER,
      productSelected: productSelected,
    });
}
export function deleteProductOrder(productSelected) {
  return dispatch =>
    dispatch({
      type: DELETE_PRODUCT_ORDER,
      productSelected: productSelected,
    });
}
export function updateProductOrder(productSelected, index) {
  return dispatch =>
    dispatch({
      type: UPDATE_PRODUCT_ORDER,
      productSelected: productSelected,
      index: index,
    });
}
export function resetProductOrder() {
  return dispatch =>
    dispatch({
      type: RESET_PRODUCT_ORDER,
    });
}
