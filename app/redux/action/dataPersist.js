import {
  EXPORT_TYPE,
  KIND_DRUG,
  UNIT_TYPE,
  PAYMENT,
  IMPORT_TYPE,
  PROVIDER_DRUG,
  DISEASE_CLASSIFICATION,
  DESCRIPTION,
  CHECK_PARTNER_VN_PAY
} from '../types';
export function export_type(payload) {
  return dispatch =>
    dispatch({
      type: EXPORT_TYPE,
      payload,
    });
}
export function getKindDrug(payload) {
  return dispatch =>
    dispatch({
      type: KIND_DRUG,
      payload,
    });
}
export function getUnitType(payload) {
  return dispatch =>
    dispatch({
      type: UNIT_TYPE,
      payload,
    });
}
export function payment(payload) {
  return dispatch =>
    dispatch({
      type: PAYMENT,
      payload,
    });
}
export function import_type(payload) {
  return dispatch =>
    dispatch({
      type: IMPORT_TYPE,
      payload,
    });
}
export function provider_drug(payload) {
  return dispatch =>
    dispatch({
      type: PROVIDER_DRUG,
      payload,
    });
}
export function disease_classification(payload) {
  return dispatch =>
    dispatch({
      type: DISEASE_CLASSIFICATION,
      payload,
    });
}
export function description(payload) {
  return dispatch =>
    dispatch({
      type: DESCRIPTION,
      payload,
    });
}
export function checkPartnerVNPay(payload) {
  return dispatch =>
    dispatch({
      type: CHECK_PARTNER_VN_PAY,
      payload,
    });
}

