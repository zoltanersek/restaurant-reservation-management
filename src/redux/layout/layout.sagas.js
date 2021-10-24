import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { LayoutActionTypes } from "./layout.types";

import { getTables, persistTables } from "../../firebase/firebase.utils";
import {
  fetchSuccess,
  fetchFailure,
  persistSuccess,
  persistFailure,
  persistStart,
} from "./layout.actions";
import { selectCurrentUser } from "../user/user.selectors";
import { selectTables } from "./layout.selectors";

export function* fetchStart() {
  try {
    const user = yield select(selectCurrentUser);
    const tables = yield call(getTables, user);
    yield put(fetchSuccess(tables));
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

export function* onFetchStart() {
  yield takeLatest(LayoutActionTypes.FETCH_START, fetchStart);
}

export function* onTableUpdated() {
  yield takeLatest(
    [
      LayoutActionTypes.UPDATE_TABLE_POSITION,
      LayoutActionTypes.UPDATE_TABLE,
      LayoutActionTypes.CREATE_TABLE,
      LayoutActionTypes.DELETE_TABLE,
    ],
    startPersist
  );
}

export function* startPersist() {
  yield put(persistStart());
}

export function* onPersistStart() {
  yield takeLatest([LayoutActionTypes.PERSIST_START], persistTable);
}

export function* persistTable() {
  try {
    const user = yield select(selectCurrentUser);
    const tables = yield select(selectTables);
    yield call(persistTables, user, tables);
    yield put(persistSuccess());
  } catch (error) {
    yield put(persistFailure(error.message));
  }
}

export function* layoutSagas() {
  yield all([call(onFetchStart), call(onTableUpdated), call(onPersistStart)]);
}
