import client from './configApi';
import { token } from './authApi';
import { Alert } from 'react-native';
import { ParamHistoryExport, ResponseHistoryExport } from '../dataType/Inventory';
import { AxiosResponse } from 'axios';

const limit = 10;
const pageDefault = 1;
const catchErr = err => {
  if (err.message === 'Network Error') {
    Alert.alert('Thông báo', 'Không có kết nối internet. Vui lòng thử lại!', [{ text: 'Đồng ý', onPress: () => {} }]);
  } else if (err.message.indexOf('timeout') !== -1) {
    Alert.alert('Thông báo', 'Kết nối internet chậm. Vui lòng thử lại!', [{ text: 'Đồng ý', onPress: () => {} }]);
  } else Alert.alert('Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại!', [{ text: 'Đồng ý', onPress: () => {} }]);
};

export default {
  getDrugListImportNew(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    search_type = 2;
    const url = `/drugstore/product/list/v2?page=${page}&per_page=${per_page}&search_type=${search_type}`;
    const params = {
      drg_drug_name: data.drg_drug_name ? data.drg_drug_name : '',
      login_mode: 0,
      code_type: '',
      drg_store_id: data.drg_store_id ? data.drg_store_id : '',
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
  getDrugListImportDQG(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/product/dqg/list?page=${page}&per_page=${per_page}`;
    const params = {
      drg_drug_name: data.drg_drug_name ? data.drg_drug_name : '',
      drg_store_id: data.drg_store_id ? data.drg_store_id : '',
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
  getHistoryImport(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `drugstore/inventory/import/history?page=${page}&per_page=${per_page}`;
    const params = {
      import_code: data.import_code ? data.import_code : '',
      drg_drug_name: data.drg_drug_name ? data.drg_drug_name : '',
      import_type: '',
      company_name: data.company_name ? data.company_name : '',
      lot: '',
      from_time: '',
      to_time: '',
      drg_store_id: data.drg_store_id ? data.drg_store_id : '',
      sort_field: 'updated_date',
      sort_type: 'desc',
      status: data.status ? data.status : '',
      invoice_code: '',
      from_process_date: data.from_process_date ? data.from_process_date : '',
      to_process_date: data.to_process_date ? data.to_process_date : '',
      login_mode: 0,
      store_ids: [data.store_ids ? data.store_ids : ''],
    };
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response)
      .catch(catchErr);
  },
  getTypeImport() {
    const url = `/drugstore/inventory/type/import`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getTypePayment() {
    const url = `/drugstore/invoice/payment`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getUnitDrug() {
    const url = `/drugstore/product/unit`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getKindDrug() {
    const url = `/drugstore/product/kind`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  createProvider(params) {
    const url = `/drugstore/provider/create`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  createImportNew(params) {
    const url = `/drugstore/inventory/import`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getListProvider(company_code) {
    const url = `/drugstore/${company_code}/providers`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  createImportDQG(params) {
    const url = `/drugstore/inventory/import/advance`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getDetailImport(codeImport) {
    const url = `/drugstore/inventory/import/detail/${codeImport}/0?=`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  cancelImport(import_code) {
    const url = `/drugstore/inventory/import/${import_code}/cancle`;
    const params = {
      login_mode: 0,
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
  agreeImport(import_code) {
    const url = `/drugstore/inventory/import/${import_code}/accept`;
    const params = {
      login_mode: 0,
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
  updateImport(params) {
    const url = `/drugstore/inventory/update/import`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getDescription() {
    const url = `/drugstore/product/description?=`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  //INVENTORY EXPORT
  async getHistoryExportion(_params: ParamHistoryExport, _page?: number, _per_page?: number) {
    const page = _page ? _page : pageDefault;
    const per_page = _per_page ? _per_page : limit;
    const params = {
      drg_drug_name: _params.drg_drug_name,
      lot: _params.lot,
      from_time: _params.from_time,
      to_time: _params.to_time,
      drg_store_id: _params.drg_store_id,
      sort_field: _params.sort_field,
      sort_type: _params.sort_type,
      status: _params.status,
      login_mode: _params.login_mode,
      store_ids: _params.store_ids,
      export_code: _params.export_code,
      export_type: _params.export_type,
      updated_user: _params.updated_user,
      import_store: _params.import_store,
    };
    const url = `/drugstore/inventory/export/history?page=${page}&per_page=${per_page}`;
    try {
      const response: AxiosResponse = await client.post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      });
      return response.data as ResponseHistoryExport;
    } catch (err) {
      catchErr(err);
    }
  },

  getExportType() {
    const url = `/drugstore/inventory/type/export`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  getDetailExport(export_code) {
    const url = `/drugstore/inventory/export/${export_code}/detail?login_mode=0`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  postDeleteExport(export_code) {
    const url = `/drugstore/inventory/export/${export_code}/cancle`;
    const params = {
      login_mode: 0,
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

  postExportProduct(params) {
    const url = `/drugstore/inventory/export/store`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  getDrugStoreList(company_id, store_id) {
    const url = `/drugstore/company/${company_id}/stores/except/${store_id}`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  getTimeCheckInventory(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/inventory/check/summary_search?page=${page}&per_page=${per_page}`;
    const params = {
      store_ids: [data.store_ids ? data.store_ids : ''],
      status: data.status ? data.status : '',
      drg_store_id: data.drg_store_id ? data.drg_store_id : '',
      login_mode: 0,
    };
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response)
      .catch(catchErr);
  },
  getDetailCheckInventory(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/inventory/checking/status?page=${page}&per_page=${per_page}`;
    const params = {
      status: data.status ? data.status : '',
      drg_store_id: data.drg_store_id ? data.drg_store_id : '',
      login_mode: 0,
      drg_drug_name: data.drg_drug_name ? data.drg_drug_name : '',
      check_date: data.check_date ? data.check_date : '',
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
  checkInventory(params) {
    const url = `/drugstore/inventory/check`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  approvalExport(params) {
    const url = `/drugstore/inventory/approval`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  addDrugNew(params) {
    const url = `/drugstore/product/create`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getListClassification() {
    const url = `/drugstore/product/classification`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
};
