import config from '../../config';

const defaultState = {
  autoRefresh: config.autoRefresh
};

export default function configReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}