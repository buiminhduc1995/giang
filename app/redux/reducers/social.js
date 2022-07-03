import {REFRESH_NEWS} from "../types";

const initialState = {
    isRefreshNew:false,
};

export default function social(state = initialState, action) {
    switch (action.type) {
        case REFRESH_NEWS :
            return {...state, isRefreshNew: action.isRefreshNew}
        default:
            return state;
    }
}