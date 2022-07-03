import client from './configApi';
import { token } from './authApi';
import { Alert } from 'react-native';
const limit = 10;
const pageDefault = 1;
export default {
  // Get list product
  getDrugList(page, per_page, drg_store_id, orderBy, account_id) {
    if (orderBy === null) {
      const url = `/medlink/company/drugs${
        drg_store_id ? '/' + drg_store_id : ''
        }?account_id=${account_id}&page=${page}&per_page=${per_page || limit}`;
      return client
        .get(url, {
          apiName: arguments.callee.name,
          headers: {
            Authorization: token,
          },
        })
        .then(response => response);
    } else {
      let url = `/medlink/company/drugs?page=${page}&per_page=${limit}`;
      return client
        .post(url, orderBy, {
          apiName: arguments.callee.name,
          headers: {
            Authorization: token,
          },
        })
        .then(response => response);
    }
  },
  // update favorite drug
  updateFavorite(params) {
    let url = `/medlink/drugs/edit-favorite`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  // get list favorite drug
  getDrugFavorite(account_id, page, per_page) {
    const url = `/medlink/drugs/list-favorite?account_id=${account_id}&page=${page}&per_page=${per_page || limit}`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  // get list list drug store
  getDrugListStore(data, token) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/product/search?page=${page}&per_page=${per_page}`;
    const params = {
      drg_drug_name: data.drg_drug_name ? data.drg_drug_name : '',
      drug_classified: '',
      company_name: '',
      updated_date: '',
      country: '',
      status: '2',
      drug_group: '',
      sort_field: '',
      sort_type: '',
      login_mode: 0,
      drg_store_id: data.drg_store_id,
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

  getDrugListInventory(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/inventory/product/search?page=${page}&per_page=${per_page}`;
    const params = {
      drg_drug_name: data.drg_drug_name ? data.drg_drug_name : '',
      drg_store_id: data.drg_store_id,
      status: 1,
      drg_barcode: data.drg_barcode ? data.drg_barcode : '',
      quantity: data.quantity,
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
            { text: 'Đồng ý', onPress: () => { } },
          ]);
        } else if (err.message.indexOf('timeout') !== -1) {
          Alert.alert('Thông báo', 'Kết nối internet chậm. Vui lòng thử lại!', [{ text: 'Đồng ý', onPress: () => { } }]);
        } else Alert.alert('Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại!', [{ text: 'Đồng ý', onPress: () => { } }]);
      });
  },
  updatePriceProduct(params) {
    let url = `/drugstore/product/price/setting`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  searchProductInventoryByBarcode(data) {
    let url = `drugstore/inventory/product/search/qrcode`;
    const params = {
      drg_drug_name: '',
      drg_store_id: data.drg_store_id,
      status: 1,
      drg_barcode: data.drg_barcode,
      quantity: 1,
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
  getDetailDrug(drug_id) {
    let url = `/drugstore/product/${drug_id}`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateDrug(params, drug_id) {
    let url = `/drugstore/product/${drug_id}/edit`;
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
