import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReservation,
  upsertReservation,
} from "../../redux/reservation/reservation.actions";
import { selectReservationsForTable } from "../../redux/reservation/reservation.selectors";

import "./reservation.styles.scss";

const Reservation = ({ reservation, setError, temp, tempCancelled }) => {
  const dispatch = useDispatch();
  const reservationsForActiveTable = useSelector(
    selectReservationsForTable(reservation.table)
  );
  const [editMode, setEditMode] = useState(temp);
  const [fields, setFields] = useState({
    date: reservation.date,
    time: reservation.time,
    name: reservation.name,
    contact: reservation.contact,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const updateCurrentReservation = () => {
    if (!fields.name) {
      setError("name cannot be empty");
      return;
    }
    if (!fields.contact) {
      setError("contact cannot be empty");
      return;
    }
    if (!fields.time) {
      setError("time cannot be empty");
      return;
    }
    if (!fields.date) {
      setError("date cannot be empty");
      return;
    }
    const [hour, minute] = fields.time.split(":");
    if (minute !== "00") {
      setError("time must be at start of the hour");
      return;
    }
    const [year, month, date] = fields.date.split("-");
    const reservationDate = new Date(year, month - 1, date, hour, minute);
    for (const otherReservation of reservationsForActiveTable.filter(
      (it) => it.id !== reservation.id
    )) {
      const [otherHour, otherMinute] = otherReservation.time.split(":");
      const [otherYear, otherMonth, otherDay] =
        otherReservation.date.split("-");
      const otherReservationDate = new Date(
        otherYear,
        otherMonth - 1,
        otherDay,
        otherHour,
        otherMinute
      );
      if (reservationDate.getTime() === otherReservationDate.getTime()) {
        setError("date conflicts with another reservation for this table");
        return;
      }
    }
    const updatedReservation = {
      ...reservation,
      date: fields.date,
      time: fields.time,
      name: fields.name,
      contact: fields.contact,
    };
    dispatch(upsertReservation(updatedReservation));
    setEditMode(false);
    setError(undefined);
    if (temp) {
      tempCancelled(reservation);
    }
  };

  const deleteCurrentReservation = () => {
    dispatch(deleteReservation(reservation));
  };

  const cancelUpdate = () => {
    if (temp) {
      tempCancelled(reservation);
    }
    setEditMode(false);
    setError(undefined);
  };

  return (
    <>
      {editMode ? (
        <div className="reservation">
          <input
            type="date"
            name="date"
            value={fields.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={fields.time}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            value={fields.contact}
            onChange={handleChange}
          />
          <button onClick={updateCurrentReservation}>Save</button>
          <button onClick={cancelUpdate}>Cancel</button>
        </div>
      ) : (
        <div className="reservation">
          <div>{reservation.date}</div>
          <div>{reservation.time}</div>
          <div>{reservation.name}</div>
          <div>{reservation.contact}</div>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={deleteCurrentReservation}>Delete</button>
        </div>
      )}
    </>
  );
};

export default Reservation;
