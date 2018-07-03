import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
    offers: [],
    specificOffer:{}
};

const setSpecificOffer = (state, action) => {
  console.log("setSpecificOffer from offer.js-reducer")
  return updateObject(state, {
    specificOffer: action.specificOffer
  })
}

// const purchaseInit = (state, action) => {
//     return updateObject(state, {purchased: false})
// }
// const purchaseBurgerSuccess = (state, action) => {
//     const newOrder = updateObject(action.orderData, {id: action.orderId})
//     return updateObject(state, {
//         loading: false,
//         orders: state.orders.concat(newOrder), // using concat for immutability
//         purchased: true
//     });
// }


// note: we always have a "type" property on any actions passed to reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_SPECIFIC_OFFER : return setSpecificOffer(state, action)
      default: return state;
    }
}

export default reducer;

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
//         default: return state;
//     }
// }
