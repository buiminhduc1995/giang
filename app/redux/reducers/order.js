import {
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_MORE_SUCCESS,
    GET_MY_ORDER_LIST_SUCCESS,
    GET_MY_ORDER_LIST_MORE_SUCCESS, 
    GET_FINISHED_ORDER_LIST_SUCCESS, 
    GET_FINISHED_ORDER_LIST_MORE_SUCCESS,
    GET_DASDBOARD_SUCCESS,
    CHANGE_TYPE_ORDER_LIST,
    UPDATE_ORDER,
    ORDER, CANCEL_ORDER
  } from "../types";

  
  const initialState = {
    orderList: null,
    myOrderList: null,
    finishedOrderList: null,
    totalPageOrderList: 0,
    totalPageMyOrderList: 0,
    totalPageFinishedOrderList: 0,
    timeUpdate: null,
    numPickupOrder: null,
    numDoneOrder: null,
    typeOrderBy: '',
    isfreshOrder:false,
    dataOrder:null
  };
  
  export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ORDER_LIST_SUCCESS: {
        return {...state, orderList: action.orderList, totalPageOrderList: action.totalPageOrderList}
      }
      case GET_ORDER_LIST_MORE_SUCCESS: {
        return {...state, orderList: [...state.orderList].concat(action.orderList), totalPageOrderList: action.totalPageOrderList}
      }
      case GET_MY_ORDER_LIST_SUCCESS: {
        return {...state, myOrderList: action.myOrderList, totalPageMyOrderList: action.totalPageMyOrderList}
      }
      case GET_MY_ORDER_LIST_MORE_SUCCESS: {
        return {...state, myOrderList: [...state.myOrderList].concat(action.myOrderList), totalPageMyOrderList: action.totalPageMyOrderList}
      }
      case GET_FINISHED_ORDER_LIST_SUCCESS: {
        return {...state, finishedOrderList:action.finishedOrderList, totalPageFinishedOrderList: action.totalPageFinishedOrderList}
      }
      case GET_FINISHED_ORDER_LIST_MORE_SUCCESS: {
        return {...state, finishedOrderList: [...state.finishedOrderList].concat(action.finishedOrderList), totalPageFinishedOrderList: action.totalPageFinishedOrderList}
      }
      case GET_DASDBOARD_SUCCESS: {
        return {...state, timeUpdate: action.timeUpdate, numPickupOrder: action.numPickupOrder, numDoneOrder: action.numDoneOrder}
      }
      case CHANGE_TYPE_ORDER_LIST: {
        return {...state, typeOrderBy: action.typeOrderBy}
      }
      case UPDATE_ORDER: 
        return {...state, isfreshOrder:action.isfreshOrder}
      case ORDER:
        return {...state, dataOrder:action.data}
      case CANCEL_ORDER:
        return {...state,dataOrder:null}
      default:
        return state;
    }
  }