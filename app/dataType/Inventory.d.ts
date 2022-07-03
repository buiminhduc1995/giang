export interface ParamHistoryExport {
  drg_drug_name: string;
  lot: string;
  from_time: string;
  to_time: string;
  drg_store_id: number;
  sort_field: string;
  sort_type: string;
  status: number;
  login_mode: number;
  store_ids: string[];
  export_code: string;
  export_type: string;
  updated_user: string;
  import_store: string;
}

export interface ExportHistoryElement {
  export_id: number;
  export_code: string;
  process_date: string;
  export_type: string;
  classification: string;
  invoice_code: string;
  company_code: string;
  company_name: string;
  note: string;
  pay_method: string;
  status: number;
  drg_store_id: number;
  drg_store_code: string;
  import_store_id: number;
  import_store_code: string;
  import_store_name: string;
  import_code: string;
  created_date: string;
  updated_date: string;
  updated_user: string;
  updated_user_id: number;
  active_flg: number;
  import_store_address: string;
  sync_status: number;
  sync_code: string;
}

export interface ResponseHistoryExport {
  total_invest: number;
  total: number;
  page: number;
  total_page: number;
  total_view: number;
  data: Array<ExportHistoryElement>;
}
