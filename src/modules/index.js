import { combineReducers } from 'redux';
import memo, { memoSaga } from 'modules/memo';
import ui from 'modules/ui';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([memoSaga()]);
}

export default combineReducers({
  memo,
  ui
});
