import { vnPay } from '../api/configApi';
import client from './configApi';
import { token } from './authApi';
export default {
  renderQRcode(params) {
    let url = `/api/payment/vnpay/qrcode`;
    return vnPay
      .post(url, params, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  checkStatusPay(params) {
    let url = `/api/payment/vnpay/checkTrans`;
    return vnPay
      .post(url, params, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  checkPartnerVNPay(drg_store_id) {
    let url = `/drugstore/store/check/vnpay?drg_store_id=${drg_store_id}`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  }
}
