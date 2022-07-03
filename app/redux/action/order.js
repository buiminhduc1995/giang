import Api from '../../api';
import {
  GET_MY_ORDER_LIST_MORE_SUCCESS,
  GET_MY_ORDER_LIST_SUCCESS,
  GET_FINISHED_ORDER_LIST_MORE_SUCCESS,
  GET_FINISHED_ORDER_LIST_SUCCESS,
  CHANGE_TYPE_ORDER_LIST,
  HOME,
} from "../types";

export function getMyOrderListAction(drg_store_id, order_by) {
  return dispatch => new Promise((resolve, reject) => {
    Api.orderApi.getPickupOrder(drg_store_id, order_by, 1).then(res => {
      dispatch({
        type: GET_MY_ORDER_LIST_SUCCESS,
        myOrderList: res.data.data,
        totalPageMyOrderList: res.data.total_page
      });
      resolve();
    }).catch(error => {
      let mError = "";
      if (error.response) {
        mError = error.response.data
      } else {
        mError = error.message
      }
      reject({ error: mError })
    })
  })
}

export function getMyOrderListMoreAction(drg_store_id, order_by, page) {
  return dispatch => new Promise((resolve, reject) => {
    Api.orderApi.getPickupOrder(drg_store_id, order_by, page).then(async res => {
      if (res.data.data.length > 0)
        dispatch({
          type: GET_MY_ORDER_LIST_MORE_SUCCESS,
          myOrderList: res.data.data,
          totalMyPageOrderList: res.data.total_page
        });
      resolve();
    }).catch(error => {
      let mError = "";
      if (error.response) {
        mError = error.response.data
      } else {
        mError = error.message
      }
      reject({ error: mError })
    })
  })
}
export function getFinishedOrderListAction(drg_store_id) {
  return dispatch => new Promise((resolve, reject) => {
    Api.orderApi.getOrdersFinished(drg_store_id, 1).then(res => {
      dispatch({
        type: GET_FINISHED_ORDER_LIST_SUCCESS,
        finishedOrderList: res.data.data,
        totalPageFinishedOrderList: res.data.total_page
      });
      resolve();
    }).catch(error => {
      let mError = "";
      if (error.response) {
        mError = error.response.data
      } else {
        mError = error.message
      }
      reject({ error: mError })
    })
  })
}

export function getFinishedOrderListMoreAction(drg_store_id, page) {
  return dispatch => new Promise((resolve, reject) => {
    Api.orderApi.getOrdersFinished(drg_store_id, page).then(res => {
      if (res.data.data.length > 0)
        dispatch({
          type: GET_FINISHED_ORDER_LIST_MORE_SUCCESS,
          finishedOrderList: res.data.data,
          totalPageFinishedOrderList: res.data.total_page
        });
      resolve();
    }).catch(error => {
      let mError = "";
      if (error.response) {
        mError = error.response.data
      } else {
        mError = error.message
      }
      reject({ error: mError })
    })
  })
}

export function changeOrderByListOrder(type) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: CHANGE_TYPE_ORDER_LIST,
      typeOrderBy: type
    });
    resolve();
  })
}
export function changeTab(tabName) {
  return dispatch => dispatch({
    type: HOME,
    data: { tabType: tabName }
  })
}