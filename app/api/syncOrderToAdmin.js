import { adminClient } from '../api/configApi';
import client from './configApi';
import { token } from './authApi';
const limit = 10;
const pageDefault = 1;
export default {
  uploadOrderToCompany(data, partner_id) {
    let url = '/medlink_api/create_order_pharmacy';
    const listProduct = data.lst_supply_order_detail_info.map(element => {
      const product = {
        product_code: element.drg_drug_cd,
        // product_code: 'TPCN542',
        qty: element.qty_request,
      };
      return product;
    });
    const params = {
      order: listProduct,
      partner_id: partner_id,
      company_code: data.supply_order.company_code,
      customer_type: 'pharmacy',
      note: 'order pharmacy',
    };
    return adminClient
      .post(url, params, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  getProfilePartner(phone) {
    let url = `/medlink_api/get_profile_partner?phone=${phone}`;
    return adminClient
      .get(url, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  getListOrderPharmacyToCompany(data, drug_store_id) {
    page = data.page ? data.page : pageDefault;
    page_size = data.per_page ? data.per_page : limit;
    order_code = data.order_code ? data.order_code : '';
    status = data.status ? data.status : '';
    const url = `/supply/order/list?page=${page}&page_size=${page_size}&drug_store_id=${drug_store_id}&order_code=${order_code}&status=${status}`;
    return adminClient
      .get(url, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  getDetailOrderPharmacyToCompany(supply_order_id) {
    const url = `/supply/order/detail?supply_order_id=${supply_order_id}`;
    return adminClient
      .get(url, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  //Get danh sach thuoc
  getListDrugCompany(params, _page, _page_size) {
    let page = _page ? _page : 1;
    let page_size = _page_size ? _page_size : 20;
    let url = `/drugs/list?page=${page}&page_size=${page_size}`;
    return adminClient
      .post(url, params, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  getDetailDrugCompany(drug_id) {
    const url = `/drugs/detail?drug_id=${drug_id}`;
    return adminClient
      .get(url, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  //Dat hang cho nha cung cap/cty duoc
  orderProductList(params) {
    const url = `/medlink_api/create_order_pharmacy`;
    return adminClient
      .post(url, params, {
        apiName: arguments.callee.name,
      })
      .then(response => response);
  },
  //Lay gia thuoc da nhap
  getPrice(drug_store_id, drg_drug_cd) {
    const url = `/drugstore/inventory/product/price?drg_store_id=${drug_store_id}&drg_drug_cd=${drg_drug_cd}`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(respone => respone);
  },
};
