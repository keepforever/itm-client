import * as actionTypes from './actionTypes';

export const selectSpecificOffer = (specificOffer) => ({
  type: actionTypes.SET_SPECIFIC_OFFER,
  specificOffer,
});
