import { ReservationActionTypes } from "./reservation.types";
import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  showModal: false,
  activeTable: undefined,
  reservations: [
    {
      id: uuidv4(),
      date: "2021-10-20",
      time: "19:00",
      name: "Zoltan",
      contact: "+40757253683",
      table: "f02ec913-afa1-40eb-8a90-03b5f15e4529",
    },
    {
      id: uuidv4(),
      date: "2021-10-10",
      time: "19:00",
      name: "Zoltan",
      contact: "+40757253683",
      table: "f02ec913-afa1-40eb-8a90-03b5f15e4529",
    },
  ],
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
    default:
      return state;
  }
};

export default reservationReducer;
