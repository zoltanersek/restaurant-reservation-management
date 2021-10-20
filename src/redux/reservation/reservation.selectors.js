import { createSelector } from "reselect";
import { getDateFromString, sameDay } from "../../utils/date.utils";
import { getDateFromReservation } from "./reservation.utils";

const selectReservation = (state) => state.reservation;

export const selectReservations = createSelector(
  [selectReservation],
  (reservation) => reservation.reservations
);

export const selectReservationsForTable = (table) => createSelector(
  [selectReservations],
  (reservations) => reservations.filter(it => it.table === table)
)

export const selectReservationsForDay = (day) => createSelector(
  [selectReservations],
  (reservations) => reservations.filter(it => sameDay(getDateFromReservation(it), getDateFromString(day)))  
)

export const selectShowModal = createSelector(
    [selectReservation],
    (reservation) => reservation.showModal
)

export const selectActiveTable = createSelector(
    [selectReservation],
    (reservation) => reservation.activeTable
)