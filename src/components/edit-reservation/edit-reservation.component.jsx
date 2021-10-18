import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTableReservations, toggleReservationModal } from "../../redux/reservation/reservation.actions";
import { selectActiveTable, selectReservations } from "../../redux/reservation/reservation.selectors";
import Modal from "../modal/modal.component";

import "./edit-reservation.styles.scss";

const EditReservation = () => {
    const dispatch = useDispatch();
    const activeTable = useSelector(selectActiveTable)
    const reservations = useSelector(selectReservations)[activeTable.id]
    const close = () => {
        dispatch(setActiveTableReservations(undefined));
        dispatch(toggleReservationModal())
    }

  return (<Modal title={`Edit reservations for table #${activeTable.number}`} hideModalHandler={close}>
      {
          (reservations && reservations.length > 0) ? reservations.map((reservation) => <div>{reservation.name}</div>) : "No reservations for the given table"
      }
  </Modal>)
};

export default EditReservation;
