import { LayoutActionTypes } from "./layout.types";
import { updateTablePosition, updateTable } from "./layout.utils";

const INITIAL_STATE = {
  showModal: false,
  activeTable: undefined,
  activePosition: undefined,
  tables: [
    {
      id: "4b4bb309-014f-438b-aa8f-837cbce9d4b3",
      number: 1,
      seats: 2,
      position: 1,
    },
    {
      id: "e98e1cf7-bc4c-411b-a788-6138e4dc807b",
      number: 2,
      seats: 4,
      position: 2,
    },
    {
      id: "f02ec913-afa1-40eb-8a90-03b5f15e4529",
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
