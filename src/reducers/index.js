import { combineReducers } from 'redux';
import userAppSettingsReducer from './userAppSettingsReducer';
import wordListReducer from './wordListReducer';
import authReducer from './authReducer';
import session from './session';
import errors from './errors';

export default combineReducers({
  userAppSettings: userAppSettingsReducer,
  lists: wordListReducer,
  session: session,
  auth: authReducer,
  errors: errors,
});
