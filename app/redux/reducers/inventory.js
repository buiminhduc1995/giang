import {
  ADD_PRODUCT_DQG,
  ADD_PRODUCT_NEW_BUSINESS,
  DELETED_PRODUCT_DQG,
  ADD_PRODUCT_EXPORT,
  DELETE_PRODUCT_EXPORT,
  UPDATE_PRODUCT_EXPORT,
  RESET_PRODUCT_EXPORT,
  DELETED_PRODUCT_NEW_BUSINESS,
  REMOVE_PRODUCT_ARRAY,
  ADD_PRODUCT_CHECK,
  REMOVE_PRODUCT_CHECK,
  DELETED_PRODUCT_CHECK,
  ADD_INFORMATION_IMPORT
} from '../types/';

const initialState = {
  listProductBusiness: [],
  listProductDQG: [],
  listProductCheck: [],
  listProductExport: [],
  objInfomationImport: []
};
export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_DQG: {
      const dataQDG = [action.payload, ...state.listProductDQG,];
      const dataFilterDQG = dataQDG
        .map(e => e['drg_drug_cd'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => dataQDG[e])
        .map(e => dataQDG[e]);
      return {
        ...state,
        listProductDQG: dataFilterDQG,
      };
    }
    case ADD_PRODUCT_NEW_BUSINESS: {
      const data = [action.payload, ...state.listProductBusiness,];
      const dataFilter = data
        .map(e => e['drg_drug_cd'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => data[e])
        .map(e => data[e]);
      return {
        ...state,
        listProductBusiness: dataFilter,
      };
    }
    case ADD_INFORMATION_IMPORT: {
      return {
        ...state,
        objInfomationImport: { ...state.objInfomationImport, ...action.payload }
      }
    }
    case DELETED_PRODUCT_NEW_BUSINESS: {
      return {
        ...state,
        listProductBusiness: state.listProductBusiness.filter(item => item !== action.payload),
      };
    }
    case DELETED_PRODUCT_DQG: {
      return {
        ...state,
        listProductDQG: state.listProductDQG.filter(item => item !== action.payload),
      };
    }
    case REMOVE_PRODUCT_ARRAY: {
      return {
        ...state,
        listProductBusiness: [],
        listProductDQG: [],
        objInfomationImport: {}
      };
    }
    case ADD_PRODUCT_CHECK: {
      const dataCheck = [action.payload, ...state.listProductCheck];
      const dataFilterCheck = dataCheck
        .map(e => e['inv_id'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => dataCheck[e])
        .map(e => dataCheck[e]);
      return {
        ...state,
        listProductCheck: dataFilterCheck,
      };
    }
    case DELETED_PRODUCT_CHECK: {
      return {
        ...state,
        listProductCheck: state.listProductCheck.filter(item => item !== action.payload),
      };
    }
    case REMOVE_PRODUCT_CHECK: {
      return {
        ...state,
        listProductCheck: [],
      };
    }
    case ADD_PRODUCT_EXPORT: {
      const list = [...state.listProductExport, action.productSelected];
      return {
        ...state,
        listProductExport: list,
      };
    }
    case DELETE_PRODUCT_EXPORT: {
      const list = state.listProductExport.filter(item => item.drug_id !== action.productSelected.drug_id);
      return {
        ...state,
        listProductExport: list,
      };
    }
    case UPDATE_PRODUCT_EXPORT: {
      const list = [...state.listProductExport];
      list[action.index] = action.productSelected;
      return {
        ...state,
        listProductExport: list,
      };
    }
    case RESET_PRODUCT_EXPORT: {
      return {
        ...state,
        listProductExport: [],
        infoExport: {},
      };
    }
    default:
      return state;
  }
}
