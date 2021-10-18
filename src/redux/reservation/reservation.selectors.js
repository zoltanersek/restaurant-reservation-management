import { createSelector } from "reselect";

const selectReservation = (state) => state.reservation;

export const selectReservations = createSelector(
  [selectReservation],
  (reservation) => reservation.reservations
);

export const selectShowModal = createSelector(
    [selectReservation],
    (reservation) => reservation.showModal
)

export const selectActiveTable = createSelector(
    [selectReservation],
    (reservation) => reservation.activeTable
)