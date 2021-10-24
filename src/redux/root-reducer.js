import { combineReducers } from "redux";
import layoutReducer from "./layout/layout.reducer";
import reservationReducer from "./reservation/reservation.reducer";
import userReducer from "./user/user.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  layout: layoutReducer,
  reservation: reservationReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
