import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utils';

const initialState = {
    offers: [],
};

// note: we always have a "type" property on any actions passed to reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_USER : return action.user
      default: return state;
    }
}

export default reducer;
