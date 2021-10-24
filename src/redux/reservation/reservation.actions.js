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

export const reservationFetchStart = () => ({
    type: ReservationActionTypes.FETCH_START_RESERVATION
})

export const reservationFetchSuccess = (reservations) => ({
    type: ReservationActionTypes.FETCH_SUCCESS_RESERVATION,
    payload: reservations
})

export const reservationFetchFailure = (error) => ({
    type: ReservationActionTypes.FETCH_FAILURE_RESERVATION,
    payload: error
})

export const reservationPersistStart = () => ({
    type: ReservationActionTypes.PERSIST_START_RESERVATION
})

export const reservationPersistSuccess = () => ({
    type: ReservationActionTypes.PERSIST_SUCCESS_RESERVATION,
})

export const reservationPersistFailure = (error) => ({
    type: ReservationActionTypes.PERSIST_FAILURE_RESERVATION,
    payload: error
})