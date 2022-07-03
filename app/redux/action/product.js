import { UPDATE_FAVORITE_PRODUCT } from '../types'

export function onUpdateFavoriteAction() {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: UPDATE_FAVORITE_PRODUCT
    });
    resolve();
  })
}