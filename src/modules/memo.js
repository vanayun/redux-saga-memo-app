import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import produce from 'immer';
import * as webAPI from 'lib/web-api';

const CREATE_MEMO = '@memo/CREATE_MEMO';
const SUCCESS_MEMO = '@memo/SUCCESS_MEMO';
const FAILURE_MEMO = '@memo/FAILURE_MEMO';

const GET_INITIAL_MEMO = '@memo/GET_INITIAL_MEMO';
const GET_RECENT_MEMO = '@memo/GET_RECENT_MEMO';
const SUCCESS_GET_RECENT_MEMO =
  '@memo/SUCCESS_GET_RECENT_MEMO';

export const createMemo = createAction(
  CREATE_MEMO,
  payload => payload
);
export const getInitialMemo = createAction(
  GET_INITIAL_MEMO
);
export const getRecentMemo = createAction(GET_RECENT_MEMO);

function* handleCreateMemo(action) {
  try {
    const response = yield call(
      webAPI.createMemo,
      action.payload
    );
    if (response.status === 201) {
      yield call(
        webAPI.getRecentMemo,
        action.payload.cursor
      );
      yield put({
        type: SUCCESS_GET_RECENT_MEMO,
        payload: response.data
      });
    }
  } catch (e) {
    yield put({ type: FAILURE_MEMO, payload: e });
  }
}

function* handleGetInitialMemo() {
  try {
    const response = yield call(webAPI.getInitialMemo);
    yield put({
      type: SUCCESS_MEMO,
      payload: response.data
    });
  } catch (e) {
    yield put({ type: FAILURE_MEMO, payload: e });
  }
}

function* handleGetRecentMemo(action) {
  // TODO 5초마다 실행
}

export function* memoSaga() {
  yield takeEvery(CREATE_MEMO, handleCreateMemo);
  yield takeEvery(GET_INITIAL_MEMO, handleGetInitialMemo);
  yield takeEvery(GET_RECENT_MEMO, handleGetRecentMemo);
}

const initialState = {
  memoList: [],
  errorMessage: ''
};

export default handleActions(
  {
    [SUCCESS_MEMO]: (state, action) =>
      produce(state, draft => {
        draft.memoList = action.payload;
      }),
    [SUCCESS_GET_RECENT_MEMO]: (state, action) =>
      produce(state, draft => {
        draft.memoList.unshift(action.payload);
      }),
    [FAILURE_MEMO]: (state, action) =>
      produce(state, draft => {
        draft.errorMessage = action.payload.message;
      })
  },
  initialState
);
