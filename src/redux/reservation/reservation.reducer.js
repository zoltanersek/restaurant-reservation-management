import { ReservationActionTypes } from "./reservation.types";

const INITIAL_STATE = {
  showModal: false,
  activeTable: undefined,
  loading: false,
  persisting: false,
  error: undefined,
  persistError: undefined,
  reservations: [],
};

const reservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReservationActionTypes.TOGGLE_RESERVATION_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };
    case ReservationActionTypes.SET_ACTIVE_TABLE_RESERVATION:
      return {
        ...state,
        activeTable: action.payload,
      };
    case ReservationActionTypes.DELETE_RESERVATION:
      return {
        ...state,
        reservations: [
          ...state.reservations.filter((it) => it.id !== action.payload.id),
        ],
      };
    case ReservationActionTypes.UPSERT_RESERVATION:
      return {
        ...state,
        reservations: [
          ...state.reservations.filter((it) => it.id !== action.payload.id),
          action.payload,
        ],
      };
    case ReservationActionTypes.FETCH_START_RESERVATION:
      return {
        ...state,
        loading: true,
      };
    case ReservationActionTypes.FETCH_SUCCESS_RESERVATION:
      return {
        ...state,
        loading: false,
        error: undefined,
        reservations: action.payload,
      };
    case ReservationActionTypes.FETCH_FAILURE_RESERVATION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ReservationActionTypes.PERSIST_START_RESERVATION:
      return {
        ...state,
        persisting: true,
      };
    case ReservationActionTypes.PERSIST_SUCCESS_RESERVATION:
      return {
        ...state,
        persisting: false,
      };
    case ReservationActionTypes.PERSIST_FAILURE_RESERVATION:
      return {
        ...state,
        persisting: false,
        persistError: action.payload,
      };
    default:
      return state;
  }
};

export default reservationReducer;
