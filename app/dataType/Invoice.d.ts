//POST_INVOICE: Tao don ban hang moi
interface Info {
  drg_store_id: number;
  drg_store_code: number;
  import_store_name: string;
  updated_user: number;
  updated_user_id: string;
  export_type: 'ORD' | string;
  note: string;
}
interface Product {
  drug_id: number;
  drg_drug_cd: string;
  lot: string;
  drg_drug_name: string;
  quantity: number;
  price: number;
  dosage: string;
  discount: number;
  unit_cd: string;
  unit_name: string;
  drg_store_id: number;
  drg_store_code: string;
  promotion_flg: number;
}
interface Info_Invoice {
  invoice_type: number;
  amount: number;
  amount_paid: number;
  amount_debt: number;
  discount_amount: number;
  currency: string;
  pay_method: string;
  status: number;
  note: string;
  customer_code: string;
  pay_reference: string;
  customer_phone_no: string;
  ecoin_minus: number;
  ecoin_plus: number;
  issue_datetime: string;
}
export interface Invoice_Create {
  info: Info;
  products: Array<Product>;
  invoice: Info_Invoice;
}

//POST_SEARCH_INVOICE: Tim kiem don ban hang
export interface SearchParams {
  invoice_code: number;
  customer_name: string;
  created_date: any;
  updated_user: string;
  pay_method: number;
  invoice_type: string;
  status: number;
  sort_field: string;
  sort_type: number;
  drg_drug_cd: string;
  from_issue_datetime: any;
  to_issue_datetime: string;
  login_mode: number;
  drg_store_id: number;
}

//GET_DETAIL_INVOICE: Thong tin chi tiet phieu ban hang
export interface DetailDrug {
  invoice_detail_id: number;
  invoice_id: number;
  drg_store_id: number;
  drg_store_code: string;
  invoice_code: string;
  drg_drug_cd: string;
  drg_drug_name: string;
  dosage: string;
  drug_id: number;
  lot: string;
  quantity: number;
  price: number;
  discount: number;
  promotion_flg: number;
  unit_cd: string;
  unit_name: string;
  currency: string;
  created_date: string;
  active_flg: number;
  updated_date: string;
  updated_user: string;
  updated_user_id: string;
  point_conv_rate: string;
  sync_flg: string;
  drg_ref_cd: string;
}
export interface Invoice_Detail {
  invoice_code: string;
  invoice_img: string;
  updated_user: string;
  note: string;
  amount: number;
  discount_amount: number;
  amount_paid: number;
  amount_debt: number;
  amount_vat: number;
  img_url: string;
  details: Array<DetailDrug>;
  qr_code: string;
  cashflow: any;
}
