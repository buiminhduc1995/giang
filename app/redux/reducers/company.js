import { UPDATE_FAVORITE_PROVIDER } from '../types'

const initialState = {
    isUpdate: false
};

export default function updateFavoriteProvider(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FAVORITE_PROVIDER: {
            return { ...state, isUpdate: !state.isUpdate }
        }
        default:
            return state;
    }
}