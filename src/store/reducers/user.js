import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
    userId: "",
};

const addUser = ( state, action ) => {
  return updateObject(state, {
    userId: action.user
  })
}
// note: we always have a "type" property on any actions passed to reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_USER : return addUser(state, action)
      default: return state;
    }
}

export default reducer;
