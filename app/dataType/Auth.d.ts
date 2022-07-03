export interface User {
  account_id: number;
  drg_store_id: number;
  drg_store_code: string;
  login_id: string;
  role_id: string;
  role_name: string;
  group_cd: string;
  password: string;
  facebook_id: string;
  full_name: string;
  avatar_url: string;
  phone_no: string;
  email: string;
  status: number;
  account_type: string;
  update_date: string;
  update_user: string;
  active_flg: number;
}

export interface Store {
  drg_store_id: number;
  drg_store_code: string;
  drg_tax_code: number;
  drg_name: string;
  drg_type: number;
  master_flg: number;
  description: string;
  phone_no: string;
  prefecture: number;
  city: string;
  district: string;
  address1: string;
  address2: string;
  zipcode: string;
  email: string;
  facebook_id: string;
  gpp_flg: string;
  pharmacist_number: string;
  avatar_url: string;
  company_id: number;
  company_code: string;
  company_name: string;
  owner_name: string;
  tax_no: string;
  tax_method: number;
  open_date: string;
  contract_url: string;
  source: string;
  anonymous_cus_id: string;
  vat: number[];
  active_flg: number;
  expired_alarm: number;
}

export interface Login {
  token: string;
  info: User;
  store: Store;
  sub_stores: Store[];
}
