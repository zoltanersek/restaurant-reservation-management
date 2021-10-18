import { ReservationActionTypes } from "./reservation.types";

const INITIAL_STATE = {
  showModal: false,
  activeTable: undefined,
  reservations: {
    "f02ec913-afa1-40eb-8a90-03b5f15e4529": [
      {
        date: "2021-10-20",
        time: "19:00",
        name: "Zoltan",
        contact: "+40757253683",
      },
      {
        date: "2021-10-10",
        time: "19:00",
        name: "Zoltan",
        contact: "+40757253683",
      },
    ],
  },
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
    default:
      return state;
  }
};

export default reservationReducer;
