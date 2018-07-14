import * as actionTypes from '../actions/actionTypes';
import { updateObject, clearLog } from '../../utils';

const initialState = {
    sellerInfo: null,
};

const setSeller = ( state, action ) => {
  clearLog("seller reducer fired", action.seller)
  return updateObject(state, {
    sellerInfo: action.seller
  })
}
// note: we always have a "type" property on any actions passed to reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_SPECIFIC_SELLER: return setSeller(state, action)
      default: return state;
    }
}

export default reducer;
