import { LayoutActionTypes } from "./layout.types";

export const updateTablePosition = (table, position) => ({
    type: LayoutActionTypes.UPDATE_TABLE_POSITION,
    payload: {table, position}
})

export const toggleLayoutModal = () => ({
    type: LayoutActionTypes.TOGGLE__LAYOUT_MODAL
})

export const setActiveTable = (table) => ({
    type: LayoutActionTypes.SET_ACTIVE_TABLE,
    payload: table
})

export const setActivePosition = (position) => ({
    type: LayoutActionTypes.SET_ACTIVE_POSITION,
    payload: position
})

export const updateTable = (table) => ({
    type: LayoutActionTypes.UPDATE_TABLE,
    payload: table
})

export const createTable = (table) => ({
    type: LayoutActionTypes.CREATE_TABLE,
    payload: table
})

export const deleteTable = (table) => ({
    type: LayoutActionTypes.DELETE_TABLE,
    payload: table
})

export const fetchStart = () => ({
    type: LayoutActionTypes.FETCH_START
})

export const fetchSuccess = (tables) => ({
    type: LayoutActionTypes.FETCH_SUCCESS,
    payload: tables
})

export const fetchFailure = (error) => ({
    type: LayoutActionTypes.FETCH_FAILURE,
    payload: error
})

export const persistSuccess = () => ({
    type: LayoutActionTypes.PERSIST_SUCCESS
})

export const persistFailure = (error) => ({
    type: LayoutActionTypes.PERSIST_FAILURE,
    payload: error
})