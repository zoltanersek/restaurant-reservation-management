import { combineReducers } from "redux";
import layoutReducer from "./layout/layout.reducer";
import reservationReducer from "./reservation/reservation.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
  layout: layoutReducer,
  reservation: reservationReducer,
  user: userReducer
});
