import UserActionTypes from "./user.types";

export const signUpStart = (credentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: credentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signInStart = (credentials) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: credentials,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const updateRestaurantNameStart = (user, newName) => ({
  type: UserActionTypes.UPDATE_RESTAURANT_NAME_START,
  payload: { user, newName },
});

export const updateRestaurantNameSuccess = (user) => ({
  type: UserActionTypes.UPDATE_RESTAURANT_NAME_SUCCESS,
  payload: user,
});

export const updateRestaurantNameFailure = (error) => ({
  type: UserActionTypes.UPDATE_RESTAURANT_NAME_FAILURE,
  payload: error,
});
