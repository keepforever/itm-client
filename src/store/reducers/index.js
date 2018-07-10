import { combineReducers }  from 'redux';
import user from './user';
import offer from './offer'
import zseller from './zseller'

export default combineReducers({
  user,
  offer,
  zseller,
})

// because we are NOT naming our export, we rename this export
// 'rootReducer' at import in the App.js file.
