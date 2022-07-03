import client from './configApi';
import { token } from './authApi';
import {MED_ORDER_POOL_STATUS} from '../constants/index';
const limit = 10;


export default {

  // Get list order unPickup
  getListOrder(drg_store_id, drg_store_id_ncc, order_by, page, per_page) {
    const url = `/medlink/orderpool/list?page=${page}&per_page=${per_page || limit}`;
    let params = null;
    console.log("token", token);
    if (drg_store_id_ncc !== null) {
      params = {
        "drg_store_id": drg_store_id,
        "status": MED_ORDER_POOL_STATUS.NEW,
        "order_by": order_by,
        "drg_store_id_ncc": drg_store_id_ncc
      };
    } else {
      params = {
        "drg_store_id": drg_store_id,
        "status": MED_ORDER_POOL_STATUS.NEW,
        "order_by": order_by
      };
    }
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // Get list order pickup
  getPickupOrder(drg_store_id, order_by, page, per_page) {
    const url = `/medlink/orderpool/list?page=${page}&per_page=${per_page || limit}`;
    const params = {
      "drg_store_id": drg_store_id,
      "status": MED_ORDER_POOL_STATUS.PICKUP,
      "order_by": order_by
    };
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // get Order details unfinished
  getOrderDetails(med_order_pool) {
    const url = `/medlink/oderpool/${med_order_pool}`;
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // Get order details finished
  getOrderHistoryDetails(med_order_pool) {
    const url = `/medlink/oderpool/his/${med_order_pool}`;
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // Get order list finished
  getOrdersFinished(drg_store_id, page, per_page) {
    const url = `/medlink/orderpool/list?page=${page}&per_page=${per_page || limit}`;
    const params = {
      "drg_store_id": drg_store_id,
      "status": MED_ORDER_POOL_STATUS.DONE
    };
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },
  // Accept Order
  acceptOrder(drg_store_id, drg_store_code, med_order_id) {
    const url = `/medlink/orderpool/status/update`;
    const params = {
      "drg_store_id": drg_store_id,
      "drg_store_code": drg_store_code,
      "med_order_id": med_order_id,
      "status": MED_ORDER_POOL_STATUS.PICKUP
    };
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // CancelOrder
  cancelOrder(drg_store_id, drg_store_code, med_order_id, providerName, cancel_reason, cancel_detail) {
    const url = `/medlink/orderpool/status/update`;
    const status = cancel_reason == MED_ORDER_POOL_STATUS.PICKUP ? MED_ORDER_POOL_STATUS.CANCEL : MED_ORDER_POOL_STATUS.REJECT
    console.log("status", status);
    const params = {
      "drg_store_id": drg_store_id,
      "drg_store_code": drg_store_code,
      "med_order_id": med_order_id,
      "provider_name": providerName,
      "cancel_reason": cancel_reason,
      "cancel_detail": cancel_detail,
      "status": status
    };
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  //Finished Order
  finishedOrder(drg_store_id, drg_store_code, med_order_id) {
    let url = `/medlink/orderpool/status/update`;
    let params = {
      "drg_store_id": drg_store_id,
      "drg_store_code": drg_store_code,
      "med_order_id": med_order_id,
      "status": MED_ORDER_POOL_STATUS.DONE
    };
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  getListOrderByDistance(params) {
    const url = `/medlink/orderpool/list-distance?page=${page}&per_page=${per_page || limit}`
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // order product
  orderProducts(drug_id, store_id, provider_code, totalNumber) {
    const url = `/medlink/store/order-products`;
    const params = {
      "drug_id": drug_id,
      "store_id": store_id,
      "provider_code": provider_code,
      "totalNumber": totalNumber
    };
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },
  // detail campaign
  getDetailCampaign(product_id) {
    const url = `/drugstore/campaign/${product_id}`;
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  //
  orderProduct(params) {
    let url = `/drugstore/supply/create`;
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

}