import { combineReducers } from 'redux';

import authorization from './authorization';
import configuration from './configuration';

export default combineReducers({
  authorization,
  configuration
});
