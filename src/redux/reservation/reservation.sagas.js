import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { ReservationActionTypes } from "./reservation.types";

import {
  getReservations,
  persistReservations,
} from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selectors";
import {
  reservationFetchFailure,
  reservationFetchSuccess,
  reservationPersistFailure,
  reservationPersistStart,
  reservationPersistSuccess,
} from "./reservation.actions";
import { selectReservations } from "./reservation.selectors";

export function* fetchReservationStart() {
  try {
    const user = yield select(selectCurrentUser);
    const reservations = yield call(getReservations, user);
    yield put(reservationFetchSuccess(reservations));
  } catch (error) {
    yield put(reservationFetchFailure(error.message));
  }
}

export function* onFetchReservationStart() {
    yield takeLatest(ReservationActionTypes.FETCH_START_RESERVATION, fetchReservationStart);
}

export function* onReservationUpdated() {
    yield takeLatest(
        [
            ReservationActionTypes.DELETE_RESERVATION,
            ReservationActionTypes.UPSERT_RESERVATION
        ],
        startReservatinPersist
    )
}

export function* startReservatinPersist() {
    yield put(reservationPersistStart())
}

export function* onPersistStart() {
    yield takeLatest([ReservationActionTypes.PERSIST_START_RESERVATION], persistReservation)
}

export function* persistReservation() {
    try {
        const user = yield select(selectCurrentUser)
        const reservations = yield select(selectReservations);
        yield call(persistReservations, user, reservations)
        yield put(reservationPersistSuccess())
    } catch (error) {
        yield put(reservationPersistFailure(error.message))
    }
}

export function* reservationSagas() {
    yield all([call(onFetchReservationStart), call(onReservationUpdated), call(onPersistStart)]);
}