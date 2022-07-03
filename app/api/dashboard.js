import client from './configApi';
import { token } from './authApi';
export default {
  getValueChart(params) {
    const url = `/drugstore/summary/sales`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getValueDashBoard(params) {
    const url = `/drugstore/summary/overview`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getTopBestSell(params) {
    const url = `/drugstore/summary/sales/product`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  }
};
