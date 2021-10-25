export const updateTablePosition = (tables, table, position) => {
  return [...tables.filter((it) => it.id !== table.id), { ...table, position }];
};

export const updateTable = (tables, table) => {
  return [...tables.filter((it) => it.id !== table.id), table];
};
