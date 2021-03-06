export interface Drug {
  drug_id: number;
  drg_store_id: number;
  drg_drug_cd: string;
  drg_drug_name: string;
  prefix: string;
  substore_sync_flg: string;
  drg_barcode: string;
  drg_drug_alias: string;
  license_cd: number;
  vat_percent: string;
  company_id: number;
  company_code: string;
  company_name: string;
  country: string;
  active_ingredient: string;
  original_product: string;
  package_desc: string;
  image_number: string;
  image_url: number;
  avatar_url: string;
  drug_group: number;
  drug_group_value: string;
  drug_classified: string;
  drug_classified_value: string;
  drug_kind: string;
  drug_kind_value: string;
  drug_flg: string;
  administration: string;
  indication: number;
  description: string;
  description_value: number;
  dosage: string;
  adverse_reaction: string;
  contraindication: string;
  interation: string;
  precaution: string;
  overdosage: string;
  direction_for_use: string;
  source: number;
  atc_code: string;
  status: number;
  start_date: string;
  end_date: string;
  note: string;
  revision: string;
  barcode_url: string;
  sort_field: string;
  sort_type: string;
  code_type: number;
  unit: string;
  unit_name: string;
  price: number;
  quantity_order?: number;
  campaign?: any;
  favorite?: number;
  phone_no?: any;
  create_date: string;
  update_date: string;
  update_user: string;
  active_flg: number;
}

//GET_DRUGS: Lay thong tin danh sach thuoc cua store
export interface Product_List {
  total: number;
  page: number;
  total_view: number;
  data: Drug[];
}
