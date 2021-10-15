import { LayoutActionTypes } from "./layout.types";
import { updateTablePosition, updateTable } from "./layout.utils";
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  showModal: false,
  activeTable: undefined,
  activePosition: undefined,
  tables: [
    {
      id: uuidv4(),
      number: 1,
      seats: 2,
      position: 1,
    },
    {
      id: uuidv4(),
      number: 2,
      seats: 4,
      position: 2,
    },
    {
      id: uuidv4(),
      number: 3,
      seats: 4,
      position: 3,
    },
  ],
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
    default:
      return state;
  }
};

export default layoutReducer;
