import {fork, all} from 'redux-saga/effects';
import users from './users';
import events from './events';

export default function* watchers() {
    yield all([
        users,
        events,
    ].map(fork));
}
