import { createSelector } from "reselect";

const selectLayout = (state) => state.layout;
export const selectTables = createSelector(
  [selectLayout],
  (layout) => layout.tables
);
export const selectShowModal = createSelector(
  [selectLayout],
  (layout) => layout.showModal
);
export const selectActiveTable = createSelector(
  [selectLayout],
  (layout) => layout.activeTable
);
export const selectActivePosition = createSelector(
    [selectLayout],
    (layout) => layout.activePosition
)
export const selectNextAvailableTableNumber = createSelector(
  [selectTables],
  (tables) => Math.max(...tables.map((table) => table.number), 0) + 1
);
export const selectUnavailableTableNumbers = createSelector(
    [selectTables],
    (tables) => tables.map(table => table.number)
)