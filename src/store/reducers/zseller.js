import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
    seller: {},
};

const setSeller = ( state, action ) => {
  console.log("zseller reducer fired")
  return updateObject(state, {
    seller: action.seller
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
