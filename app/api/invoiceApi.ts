import client from './configApi';
import { token } from './authApi';

const limit = 10;
const pageDefault = 1;
export default {
  getInvoice(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/invoice/search?page=${page}&per_page=${per_page}`;
    const params = {
      drg_store_id: data.drg_store_id,
      status: '2',
      invoice_code: data.invoice_code ? data.invoice_code : '',
      customer_name: data.customer_name ? data.customer_name : '',
      created_date: '',
      updated_user: data.updated_user ? data.updated_user : '',
      pay_method: '',
      invoice_type: '',
      status: '',
      sort_field: '',
      sort_type: '',
      drg_drug_cd: '',
      from_issue_datetime: data.from_issue_datetime ? data.from_issue_datetime : '',
      to_issue_datetime: data.to_issue_datetime ? data.to_issue_datetime : '',
      login_mode: 0,
      login_id: data.login_id ? data.login_id : '',
    };
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response)
      .catch(err => {
        if (err.message === 'Network Error') {
          Alert.alert('Thông báo', 'Không có kết nối internet. Vui lòng thử lại!', [
            { text: 'Đồng ý', onPress: () => {} },
          ]);
        } else if (err.message.indexOf('timeout') !== -1) {
          Alert.alert('Thông báo', 'Kết nối internet chậm. Vui lòng thử lại!', [{ text: 'Đồng ý', onPress: () => {} }]);
        } else Alert.alert('Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại!', [{ text: 'Đồng ý', onPress: () => {} }]);
      });
  },
  getDetailInvoice(invoice_code: string) {
    const url = `/drugstore/invoice/${invoice_code}/0/detail`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  createInvoice(params) {
    const url = `/drugstore/inventory/export`;
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
