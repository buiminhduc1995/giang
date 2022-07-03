import { SHOW_NOTIFY_NEWFEATURE, HIDDEN_NOTIFY_NEWFEATURE } from "../types";

const initialState = {
  showModalNewFeature: null,
};

export default function notify(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFY_NEWFEATURE: {
      return { ...state, showModalNewFeature: action.type_notify }
    }
    case HIDDEN_NOTIFY_NEWFEATURE: {
      return { ...state, showModalNewFeature: null }
    }
    default:
      return state;
  }
}