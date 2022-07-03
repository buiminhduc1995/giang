import * as types from '../types';

const initState = {
  paymentList: [],
  exportType: [],
  unitType: [],
  kindDrug: [],
  importTypeList: [],
  provider: [],
  disease_classification_type: [],
  descriptionType: []
};

export default function dataPersist(state = initState, action) {
  switch (action.type) {
    case types.PAYMENT: {
      return {
        ...state,
        paymentList: action.payload,
      };
    }
    case types.EXPORT_TYPE: {
      return {
        ...state,
        exportType: action.payload,
      };
    }
    case types.UNIT_TYPE: {
      return {
        ...state,
        unitType: action.payload,
      };
    }
    case types.KIND_DRUG: {
      return {
        ...state,
        kindDrug: action.payload,
      };
    }
    case types.IMPORT_TYPE: {
      return {
        ...state,
        importTypeList: action.payload,
      };
    }
    case types.PROVIDER_DRUG: {
      return {
        ...state,
        provider: action.payload,
      };
    }
    case types.DISEASE_CLASSIFICATION: {
      return {
        ...state,
        disease_classification_type: action.payload,
      };
    }
    case types.DESCRIPTION: {
      return {
        ...state,
        descriptionType: action.payload,
      };
    }
    case types.CHECK_PARTNER_VN_PAY: {
      return {
        ...state,
        infoPartnerVNPAY: action.payload,
      };
    }
    default:
      return state;
  }
}
