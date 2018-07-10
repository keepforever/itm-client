import * as actionTypes from './actionTypes';

export const selectSpecificSeller = (seller) => ({
  type: actionTypes.SET_SPECIFIC_SELLER,
  seller,
});
