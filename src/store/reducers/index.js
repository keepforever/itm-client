import { combineReducers }  from 'redux';
import user from './user';

export default combineReducers({
  user,
})

// because we are NOT naming our export, we rename this export
// 'rootReducer' at import in the App.js file. 
