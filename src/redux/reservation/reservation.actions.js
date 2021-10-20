import { ReservationActionTypes } from "./reservation.types";

export const toggleReservationModal = () => ({
    type: ReservationActionTypes.TOGGLE_RESERVATION_MODAL
})

export const setActiveTableReservations = (table) => ({
    type: ReservationActionTypes.SET_ACTIVE_TABLE_RESERVATION,
    payload: table
})

export const deleteReservation = (reservation) => ({
    type: ReservationActionTypes.DELETE_RESERVATION,
    payload: reservation
})

export const upsertReservation = (reservation) => ({
    type: ReservationActionTypes.UPSERT_RESERVATION,
    payload: reservation
})