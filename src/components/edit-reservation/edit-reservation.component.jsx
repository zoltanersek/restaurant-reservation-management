import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setActiveTableReservations,
  toggleReservationModal,
} from "../../redux/reservation/reservation.actions";
import {
  selectActiveTable,
  selectReservationsForTable,
} from "../../redux/reservation/reservation.selectors";
import Modal from "../modal/modal.component";
import ReservationList from "../reservation-list/reservation-list.component";

import "./edit-reservation.styles.scss";

const EditReservation = () => {
  const dispatch = useDispatch();
  const activeTable = useSelector(selectActiveTable);
  const reservations = useSelector(selectReservationsForTable(activeTable.id));
  const [filterValue, setFilterValue] = useState('all')

  const close = () => {
    dispatch(setActiveTableReservations(undefined));
    dispatch(toggleReservationModal());
  };

  const handleFilter = (e) => {
    setFilterValue(e.target.value)
  }

  const getFilteredValues = () => {
      if (filterValue === 'all') {
          return reservations;
      } else if (filterValue === 'past') {
        const now = new Date();
        return reservations.filter(it => {
            const [minute, second] = it.time.split(':')
            const [year, month, day] = it.date.split('-')
            const date = new Date(year, month - 1, day, minute, second);
            console.log('comparing', date, now)
            return date <= now;
        })
      } else if (filterValue === 'future') {
        const now = new Date();
        return reservations.filter(it => {
            const [minute, second] = it.time.split(':')
            const [year, month, day] = it.date.split('-')
            const date = new Date(year, month - 1, day, minute, second);
            return date > now;
        })
      }
  }

  return (
    <Modal
      title={`Edit reservations for table #${activeTable.number}`}
      hideModalHandler={close}
    >
       <span>Show: </span>
       <select name="filter" onChange={handleFilter} value={filterValue}>
        <option value="all">All</option>
        <option value="past">Past reservations only</option>
        <option value="future">Future reservations only</option>
        </select>
      <ReservationList reservations={getFilteredValues()} tableId={activeTable.id}/>
    </Modal>
  );
};

export default EditReservation;
