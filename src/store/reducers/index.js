import { combineReducers }  from 'redux';
import user from './user';
import offer from './offer'
import seller from './seller'

export default combineReducers({
  user,
  offer,
  seller,
})

// because we are NOT naming our export, we rename this export
// 'rootReducer' at import in the App.js file.
