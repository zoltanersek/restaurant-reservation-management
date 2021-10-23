import { LayoutActionTypes } from "./layout.types";
import { updateTablePosition, updateTable } from "./layout.utils";

const INITIAL_STATE = {
  showModal: false,
  activeTable: undefined,
  activePosition: undefined,
  loading: false,
  error: undefined,
  tables: [],
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LayoutActionTypes.UPDATE_TABLE_POSITION:
      return {
        ...state,
        tables: updateTablePosition(
          state.tables,
          action.payload.table,
          action.payload.position
        ),
      };
    case LayoutActionTypes.TOGGLE__LAYOUT_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };
    case LayoutActionTypes.SET_ACTIVE_TABLE:
      return {
        ...state,
        activeTable: action.payload,
      };
    case LayoutActionTypes.SET_ACTIVE_POSITION:
      return {
        ...state,
        activePosition: action.payload,
      };
    case LayoutActionTypes.UPDATE_TABLE:
      return {
        ...state,
        tables: updateTable(state.tables, action.payload),
      };
    case LayoutActionTypes.CREATE_TABLE:
      return {
        ...state,
        tables: [...state.tables, action.payload],
      };
    case LayoutActionTypes.DELETE_TABLE:
      return {
        ...state,
        tables: [...state.tables.filter((it) => it.id !== action.payload.id)],
      };
    case LayoutActionTypes.FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case LayoutActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        tables: action.payload,
      };
    case LayoutActionTypes.FETCH_FAILURE:
    case LayoutActionTypes.PERSIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
