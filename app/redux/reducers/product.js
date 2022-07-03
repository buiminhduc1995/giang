import { UPDATE_FAVORITE_PRODUCT } from '../types'

const initialState = {
    isUpdate: false
};

export default function updateFavoriteProduct(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FAVORITE_PRODUCT: {
            return { ...state, isUpdate: !state.isUpdate }
        }
        default:
            return state;
    }
}