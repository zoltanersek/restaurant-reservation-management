import { ReservationActionTypes } from "./reservation.types";

export const toggleReservationModal = () => ({
    type: ReservationActionTypes.TOGGLE_RESERVATION_MODAL
})

export const setActiveTableReservations = (table) => ({
    type: ReservationActionTypes.SET_ACTIVE_TABLE_RESERVATION,
    payload: table
})