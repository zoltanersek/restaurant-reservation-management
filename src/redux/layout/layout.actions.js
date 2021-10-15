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