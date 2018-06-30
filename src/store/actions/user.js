import * as actionTypes from './actionTypes';

export const addUser = (user) => ({
  type: actionTypes.ADD_USER,
  user,
});
