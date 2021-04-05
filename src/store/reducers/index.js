import {combineReducers} from 'redux';
import users from './users';
import events from './events';

export default combineReducers({
    users,
    events,
});
