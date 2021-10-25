import { all, call } from "redux-saga/effects";
import { layoutSagas } from "./layout/layout.sagas";
import { reservationSagas } from "./reservation/reservation.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(layoutSagas), call(reservationSagas)]);
}
