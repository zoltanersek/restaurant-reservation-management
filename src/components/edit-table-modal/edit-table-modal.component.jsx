import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createTable,
  deleteTable,
  setActivePosition,
  setActiveTable,
  toggleLayoutModal,
  updateTable,
} from "../../redux/layout/layout.actions";
import {
  selectActivePosition,
  selectActiveTable,
  selectNextAvailableTableNumber,
  selectUnavailableTableNumbers,
} from "../../redux/layout/layout.selectors";
import { v4 as uuidv4 } from "uuid";

import "./edit-table-modal.styles.scss";

const EditTableModal = ({ position }) => {
  const dispatch = useDispatch();
  const activeTable = useSelector(selectActiveTable);
  const activePosition = useSelector(selectActivePosition);
  const nextAvailableNumber = useSelector(selectNextAvailableTableNumber);
  const unavailableNumbers = useSelector(selectUnavailableTableNumbers);
  const [fields, setFields] = useState({
    tableNumber: activeTable ? activeTable.number : nextAvailableNumber,
    seats: activeTable ? activeTable.seats : 1,
  });
  const [error, setError] = useState(undefined);
  const hideModal = () => {
    dispatch(toggleLayoutModal());
    dispatch(setActiveTable(undefined));
    dispatch(setActivePosition(undefined));
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFields({ ...fields, [name]: parseInt(value) });
  };

  const handleUpsert = (e) => {
    e.preventDefault();
    setError(undefined);
    const { tableNumber, seats } = fields;
    if (activeTable) {
      if (
        tableNumber !== activeTable.number &&
        unavailableNumbers.includes(tableNumber)
      ) {
        setError(`${tableNumber} is already assigned to a different table`);
        return;
      }

      dispatch(updateTable({ ...activeTable, number: tableNumber, seats }));
    } else {
      if (unavailableNumbers.includes(tableNumber)) {
        setError(`${tableNumber} is already assigned to a different table`);
        return;
      }
      dispatch(
        createTable({
          number: tableNumber,
          seats,
          position: activePosition,
          id: uuidv4(),
        })
      );
    }
    hideModal();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setError(undefined);
    dispatch(deleteTable(activeTable));
    hideModal();
  };

  return (
    <div className="edit-table-modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-close" onClick={hideModal}>
            &times;
          </span>
          <h2>
            {activeTable
              ? `Edit Table #${activeTable.number}`
              : "Create a new table"}
          </h2>
        </div>
        <div className="modal-body">
          {error && <span style={{ color: "red" }}>{error}</span>}
          <form>
            <label>Table number:</label>
            <input
              name="tableNumber"
              type="number"
              value={fields.tableNumber}
              min="1"
              onChange={handleChange}
            />
            <label>Number of seats: </label>
            <input
              name="seats"
              type="number"
              value={fields.seats}
              min="1"
              onChange={handleChange}
            />
            <button onClick={handleUpsert}>
              {activeTable ? "Save Changes" : "Create Table"}
            </button>
            {activeTable && <button onClick={handleDelete}>Delete table</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTableModal;
