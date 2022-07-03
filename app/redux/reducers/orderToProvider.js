import { ADD_PRODUCT_ORDER, DELETE_PRODUCT_ORDER, UPDATE_PRODUCT_ORDER, RESET_PRODUCT_ORDER } from '../types/';

const initialState = {
  listProductOrder: [],
  totalPrice: 0,
  discount: 0,
  scrollTab: 0,
};

export default function orderToProviderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_ORDER: {
      let list = [...state.listProductOrder];
      const index = state.listProductOrder.findIndex(item => item.drug_id === action.productSelected.drug_id);
      index !== -1
        ? (list[index].qty = list[index].qty + action.productSelected.qty)
        : (list = [...state.listProductOrder, action.productSelected]);
      let totalPrice = 0;
      list.map(e => (totalPrice += Number(e.price) * Number(e.qty)));
      return {
        ...state,
        listProductOrder: list,
        totalPrice: totalPrice,
      };
    }
    case DELETE_PRODUCT_ORDER: {
      const list = state.listProductOrder.filter(item => item.drug_id !== action.productSelected.drug_id);
      let totalPrice = 0;
      list.map(e => (totalPrice += Number(e.price) * Number(e.qty)));
      return {
        ...state,
        listProductOrder: list,
        totalPrice: totalPrice,
      };
    }
    case UPDATE_PRODUCT_ORDER: {
      const list = [...state.listProductOrder];
      list[action.index] = action.productSelected;
      let totalPrice = 0;
      list.map(e => (totalPrice += Number(e.price) * Number(e.qty)));
      return {
        ...state,
        listProductOrder: list,
        totalPrice: totalPrice,
      };
    }
    case RESET_PRODUCT_ORDER: {
      return {
        ...state,
        listProductOrder: [],
        totalPrice: 0,
      };
    }
    case 'changeScrollTab': {
      return {
        ...state,
        scrollTab: action.tabNumber,
      };
    }
    default:
      return state;
  }
}
