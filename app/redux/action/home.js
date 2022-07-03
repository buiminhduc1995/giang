import Api from '../../api';
import {GET_DASDBOARD_SUCCESS, GET_ORDER_LIST_MORE_SUCCESS, GET_ORDER_LIST_SUCCESS} from "../types";
import {DateFormatDashboard} from "../../utils/DateFormat";

export function getDataHomeAction(drg_store_id, order_by) {
  return dispatch => new Promise((resolve, reject) => {
    Api.authApi.getDashboard(drg_store_id, null, order_by).then(([dashboardRes, listRes]) => {
      dispatch({
        type: GET_DASDBOARD_SUCCESS,
        timeUpdate: DateFormatDashboard(dashboardRes.headers.date),
        numPickupOrder: dashboardRes.data.num_pickup_med_order_pools_list,
        numDoneOrder: dashboardRes.data.num_done_med_order_pools_list,
      });
      dispatch({
        type: GET_ORDER_LIST_SUCCESS,
        orderList: listRes.data.data,
        totalPageOrderList: listRes.data.total_page
      });
      resolve();
    }).catch(error => {
      let mError = "";
      if (error.response) {
        mError = error.response.data
      } else {
        mError = error.message
      }
      reject({error: mError})
    })
  })
}

export function getOrderListMoreAction(drg_store_id, order_by, page, currentPoint) {
  return dispatch => new Promise((resolve, reject) => {
    Api.orderApi.getListOrder(drg_store_id, null, order_by, page).then(res => {
      if (res.data.data.length > 0) {
        dispatch({
          type: GET_ORDER_LIST_MORE_SUCCESS,
          orderList: res.data.data,
          totalPageOrderList: res.data.total_page
        });
        resolve();
      }
    }).catch(error => {
      let mError = "";
      if (error.response) {
        mError = error.response.data
      } else {
        mError = error.message
      }
      reject({error: mError})
    })
  })
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a.distance;
  const genreB = b.distance;

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}

export function getOrderListAction(drg_store_id, order_by, currentPoint) {
  return dispatch => new Promise((resolve, reject) => {
    Api.orderApi.getListOrder(drg_store_id, null, order_by, 1).then(res => {
      let orderList = [];
      if (res.data.data.length > 0) {
        if (order_by === 'distance') {
          let data = res.data.data;
          data.map((item, index) => {
            let target = item.pos_lat.length > 0 ? `${item.pos_lat}, ${item.pos_long}` : item.address1 + ' ' + item.district;
            Api.mapApi.getDirections(
              `${currentPoint.latitude},${currentPoint.longitude}`, target
            ).then(response => {
              if (response !== false) {
                orderList = [...orderList, {...item, distance: response.distance}]
              } else {
                orderList = [...orderList, {...item, distance: 0}]
              }
              if (index === res.data.total - 1) {
                dispatch({
                  type: GET_ORDER_LIST_SUCCESS,
                  orderList: orderList.sort(compare),
                  totalPageOrderList: res.data.total_page
                });
                resolve();
              }
            });
          });
        } else  {
          dispatch({
            type: GET_ORDER_LIST_SUCCESS,
            orderList: res.data.data,
            totalPageOrderList: res.data.total_page
          });
          resolve();
        }
      }
    }).catch(error => {
      let mError = "";
      if (error.response) {
        mError = error.response.data
      } else {
        mError = error.message
      }
      reject({error: mError})
    })
  })
}