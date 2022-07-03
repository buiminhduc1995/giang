import client from './configApi';
import { token } from './authApi';
const limit = 10;

export default {
  getPointWallet(drg_store_id, token) {
    const url = `/point/wallet/${drg_store_id}`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateRewardPoint(params) {
    const url = `/point/flow`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(respone => respone);
  },
};
