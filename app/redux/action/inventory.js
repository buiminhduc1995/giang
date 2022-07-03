
import {
  ADD_PRODUCT_DQG,
  ADD_PRODUCT_NEW_BUSINESS,
  DELETED_PRODUCT_NEW_BUSINESS,
  DELETED_PRODUCT_DQG,
  REMOVE_PRODUCT_ARRAY,
  ADD_PRODUCT_CHECK,
  REMOVE_PRODUCT_CHECK,
  ADD_PRODUCT_EXPORT,
  DELETE_PRODUCT_EXPORT,
  UPDATE_PRODUCT_EXPORT,
  RESET_PRODUCT_EXPORT,
  DELETED_PRODUCT_CHECK,
  ADD_INFORMATION_IMPORT,
} from '../types';
export function addProductDQG(payload) {
  return dispatch =>
    dispatch({
      type: ADD_PRODUCT_DQG,
      payload
    });
}
export function addProductNewBusiness(payload) {
  return dispatch =>
    dispatch({
      type: ADD_PRODUCT_NEW_BUSINESS,
      payload
    });
}
export function deletedProductBusiness(payload) {
  return dispatch => {
    dispatch({
      type: DELETED_PRODUCT_NEW_BUSINESS,
      payload
    });
  };
}
export function deletedProductDQG(payload) {
  return dispatch => {
    dispatch({
      type: DELETED_PRODUCT_DQG,
      payload
    });
  };
}
export function removeProduct(payload) {
  return dispatch => {
    dispatch({
      type: REMOVE_PRODUCT_ARRAY,
      payload
    });
  };
}
export function addProductCheck(payload) {
  return dispatch => {
    dispatch({
      type: ADD_PRODUCT_CHECK,
      payload
    });
  };
}
export function addInformationImport(payload) {
  return dispatch => {
    dispatch({
      type: ADD_INFORMATION_IMPORT,
      payload
    });
  };
}
export function removeProductCheck(payload) {
  return dispatch => {
    dispatch({
      type: REMOVE_PRODUCT_CHECK,
      payload
    })
  }
}
export function deletedProductCheck(payload) {
  return dispatch => {
    dispatch({
      type: DELETED_PRODUCT_CHECK,
      payload
    })
  }
}
//ExportInventory
export function addProductExport(productSelected) {
  return dispatch =>
    dispatch({
      type: ADD_PRODUCT_EXPORT,
      productSelected: productSelected,
    });
}
export function deleteProductExport(productSelected) {
  return dispatch =>
    dispatch({
      type: DELETE_PRODUCT_EXPORT,
      productSelected: productSelected,
    });
}
export function updateProductExport(productSelected, index) {
  return dispatch =>
    dispatch({
      type: UPDATE_PRODUCT_EXPORT,
      productSelected: productSelected,
      index: index,
    });
}
export function resetProductExport() {
  return dispatch =>
    dispatch({
      type: RESET_PRODUCT_EXPORT,
    });
}
