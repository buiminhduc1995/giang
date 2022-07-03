import client from './configApi';
import { token } from './authApi';
import { ParamsGetExport } from '../dataType/ConnectDrugBank';

const limit = 10;
const pageDefault = 1;
export default {
  getInvoiceNotConnect(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/invoice/sync/search?page=${page}&per_page=${per_page}`;
    const params = {
      invoice_code: data.invoice_code ? data.invoice_code : '',
      customer_name: data.customer_name ? data.customer_name : '',
      created_date: '',
      updated_user: data.updated_user ? data.updated_user : '',
      pay_method: data.pay_method ? data.pay_method : '',
      invoice_type: data.invoice_type ? data.invoice_type : '',
      status: '2',
      sync_status: '0',
      sort_field: '',
      sort_type: '',
      drg_drug_cd: data.drg_drug_cd ? data.drg_drug_cd : '',
      from_issue_datetime: data.from_issue_datetime ? data.from_issue_datetime : '',
      to_issue_datetime: data.to_issue_datetime ? data.to_issue_datetime : '',
      login_mode: 0,
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
  getDetailInvoiceNotConnect(invoice_id) {
    const url = `/drugstore/invoice/sync/${invoice_id}/0/detail`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateInformationInvoice(params) {
    const url = `/drugstore/invoice/sync/update`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateStatusInvoice(params) {
    const url = `/drugstore/invoice/sync/status/update`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  getImportNotConnect(data) {
    page = data.page ? data.page : pageDefault;
    per_page = data.per_page ? data.per_page : limit;
    const url = `/drugstore/inventory/import/sync/history?page=${page}&per_page=${per_page}`;
    const params = {
      import_code: data.import_code ? data.import_code : '',
      drg_drug_name: data.drg_drug_name ? data.drg_drug_name : '',
      import_type: data.import_type ? data.import_type : '',
      company_name: data.company_name ? data.company_name : '',
      lot: data.lot ? data.lot : '',
      from_time: data.from_time ? data.from_time : '',
      to_time: data.to_time ? data.to_time : '',
      drg_store_id: data.drg_store_id ? data.drg_store_id : '',
      sort_field: "updated_date",
      sort_type: "desc",
      status: "",
      invoice_code: data.invoice_code ? data.invoice_code : '',
      from_process_date: data.from_process_date ? data.from_process_date : '',
      to_process_date: data.to_process_date ? data.to_process_date : '',
      sync_status: "0",
      login_mode: 0,
      store_ids: [data.drg_store_id ? data.drg_store_id : ''],
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
  getDetailImportNotConnect(import_code) {
    const url = `/drugstore/inventory/import/sync/detail/${import_code}/0`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateStatusImport(params) {
    const url = `/drugstore/inventory/import/sync/status/update`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateInformationImport(params) {
    const url = `/drugstore/inventory/import/sync/update`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },

  //Lien thong phieu xuat kho
  getExportNotConnect(params: ParamsGetExport, _page?: number, _per_page?: number) {
    const page = _page ? _page : 1;
    const per_page = _per_page ? _per_page : 20;
    const url = `/drugstore/inventory/export/sync/history?page=${page}&per_page=${per_page}`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then((response: any) => response);
  },
  getDetailExportNotConnect(export_code) {
    const url = `/drugstore/inventory/export/sync/${export_code}/detail?login_mode=0`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateExportNotConnect(params) {
    const url = `/drugstore/inventory/export/sync/update`;
    return client
      .post(url, params, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
  updateStatusExport(params) {
    const url = `/drugstore/inventory/export/sync/status/update`;
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
