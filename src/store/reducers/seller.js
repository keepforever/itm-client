import * as actionTypes from '../actions/actionTypes';
import { updateObject, clearLog } from '../../utils';

const initialState = {
    sellerInfo: null,
};

const resetSeller = ( state, action ) => {
  clearLog("RESET_SELLER_INFO reducer fired", 'XX')
  return updateObject(state, {
    sellerInfo: null,
  })
}

const setSeller = ( state, action ) => {
  return updateObject(state, {
    sellerInfo: action.seller
  })
}
// note: we always have a "type" property on any actions passed to reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_SPECIFIC_SELLER: return setSeller(state, action)
      case actionTypes.RESET_SELLER_INFO: return resetSeller(state, action)
      default: return state;
    }
}

export default reducer;
