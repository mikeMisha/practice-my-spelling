import { combineReducers } from 'redux';
import userAppSettingsReducer from './userAppSettingsReducer';
import authReducer from './authReducer';
import session from './session';
import errors from './errors';

export default combineReducers({
  userAppSettings: userAppSettingsReducer,
  session: session,
  auth: authReducer,
  errors: errors,
});
