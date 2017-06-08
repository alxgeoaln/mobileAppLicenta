import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import alertsReducer from './alertsReducer';
import contactReducer from  './contactReducer'
import sendLocationReducer from  './sendLocationReducer'

module.exports = combineReducers({
    form: formReducer,
    auth: authReducer,
    alerts: alertsReducer,
    contacts: contactReducer,
    sendLocationReducer: sendLocationReducer
});