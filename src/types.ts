export interface LoginCredentials {
  email: string;
  password: string;
}
export interface VerificationReport {
  id: string;
  hash_id: string;
  fk_service_repot: string;
  created_at: Date;
  updated_at: Date;
}

export interface ServicedEquipment {
  fk_model: string;
  fk_serial_number: string;
  maker: string;
  date: string;
}

export interface WarehouseItem {
  fk_warehouse_item: string;
  description: string;
  serial_number: string;
  quantity: number;
}

export interface TimeSheet {
  date: string;
  men: number;
  lv_shop: string;
  arv_job: string;
  lv_job: string;
  arv_shop: string;
}

export interface EquipmentType {
  type: string;
  model: string;
  serial_number: string;
}

export interface PDFData {
  name: string | undefined;
  imo: string | undefined;
  mmsi: string | undefined;
  port_name: string;
  country_name: string | undefined;
  class_society: string;
  owner_or_ordered_by: string | undefined;
  customer_work_order: string | undefined;
  service_date: string | undefined;
  collaborator_name: string | undefined;
  fk_service_order: string | undefined;
  service_report_code_report: string | undefined;
  required_work: string | undefined;
  serviced_equip: Array<ServicedEquipment> | undefined;
  report_text: string | undefined;
  warehouse_item: Array<WarehouseItem> | undefined;
  timesheets: Array<TimeSheet> | undefined;
  test_equipments: Array<EquipmentType> | undefined;
  obs_report: string | undefined;
}
