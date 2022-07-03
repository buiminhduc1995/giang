import client from './configApi';
import { token } from './authApi';
const limit = 10;

export default {
  // Get list provider
  getProviderList(account_id, page, per_page) {
    const url = `/medlink/companies?account_id=${account_id}&page=${page}&per_page=${per_page || limit}`;
    console.log("token", token);
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // Get list provider
  getProviderDetail(company_id) {
    const url = `/medlink/company/${company_id}`;
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // Get list provider by code
  getProviderDetailByCode(company_code) {
    const url = `/medlink/company/code/${company_code}`;
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },

  // update favorite company
  updateFavoriteCompany(params) {
    let url = `/medlink/company/edit-favorite`;
    return client.post(url, params, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },
  // get list favorite provider
  getFavoriteProvider(account_id, page, per_page) {
    const url = `/medlink/company/list-favorite?account_id=${account_id}&page=${page}&per_page=${per_page || limit}`;
    return client.get(url, {
      apiName: arguments.callee.name, headers: {
        Authorization: token
      }
    }).then(response => response);
  },
}