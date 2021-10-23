import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument,
  updateUserProps,
} from "../../firebase/firebase.utils";
import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  updateRestaurantNameFailure,
  updateRestaurantNameSuccess,
} from "./user.actions";
import UserActionTypes from "./user.types";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { name } }));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* updateRestaurantName({ payload: { user, newName } }) {
  try {
    const userRef = yield call(updateUserProps, user, {restaurantName: newName});
    const userSnapshot = yield userRef.get();
    yield put(
      updateRestaurantNameSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(updateRestaurantNameFailure(error.message));
  }
}

export function* onUpdateRestaurantNameStart() {
  yield takeLatest(
    UserActionTypes.UPDATE_RESTAURANT_NAME_START,
    updateRestaurantName
  );
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onUpdateRestaurantNameStart),
  ]);
}
