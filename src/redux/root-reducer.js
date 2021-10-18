import { combineReducers } from "redux";
import layoutReducer from "./layout/layout.reducer";
import reservationReducer from "./reservation/reservation.reducer";

export default combineReducers({
  layout: layoutReducer,
  reservation: reservationReducer,
});
