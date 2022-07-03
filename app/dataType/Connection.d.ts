interface ParamsGetExport {
  drg_drug_name: string;
  lot: string;
  from_time: string;
  to_time: string;
  drg_store_id: number;
  sort_field: string;
  sort_type: 'asc' | 'desc';
  status: number;
  sync_status: string;
  login_mode: number;
  store_ids: string[];
  export_code: string;
  export_type: string;
  updated_user: string;
  import_store: string;
}

interface ResponseExportConnect {
  export_id: number;
  export_code: string;
  process_date: string;
  export_type: string;
  classification: string | null;
  invoice_code: string | null;
  company_code: string | null;
  company_name: string | null;
  note: string;
  pay_method: string | null;
  status: number;
  drg_store_id: number;
  drg_store_code: string;
  import_store_id: number;
  import_store_code: string | null;
  import_store_name: string | null;
  import_code: string | null;
  created_date: string;
  updated_date: string;
  updated_user: string;
  updated_user_id: string | null;
  active_flg: number;
  import_store_address: string | null;
  sync_status: number;
  sync_code: string | null;
}

export { ParamsGetExport, ResponseExportConnect };
