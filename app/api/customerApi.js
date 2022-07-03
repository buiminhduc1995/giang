import client from './configApi';
import { token } from './authApi';

const limit = 15;
const pageDefault = 1;
export default {
  getCustomer(data, token) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/customer/search?page=${page}&per_page=${per_page}`;
    const params = {
      drg_store_id: data.drg_store_id,
      customer_name: data.customer_name ? data.customer_name : '',
      customer_type: '',
      email: '',
      phone_no: data.phone_no ? data.phone_no : '',
      customer_group_cd: data.customer_group_cd ? data.customer_group_cd : '',
      sort_field: '',
      sort_type: '',
      rank_code: '',
      company_code: data.company_code ? data.company_code : '',
    };
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  editCustomer(params) {
    const url = `/drugstore/customer/create`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  createCustomer(params, token) {
    const url = `/drugstore/customer/create`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
};
