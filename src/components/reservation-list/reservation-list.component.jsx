import React, { useState } from "react";
import Reservation from "../reservation/reservation.component";
import { v4 as uuidv4 } from "uuid";

import "./reservation-list.styles.scss";

const ReservationList = ({ reservations, tableId }) => {
  const [error, setError] = useState(undefined);
  const [tempReservations, setTempReservations] = useState([]);

  const addReservation = () => {
    setTempReservations([
      ...tempReservations,
      {
        id: uuidv4(),
        table: tableId,
      },
    ]);
  };

  const tempCancelled = (reservation) => {
    setTempReservations(
      tempReservations.filter((it) => it.id !== reservation.id)
    );
  };

  return (
    <div className="reservation-list">
      {error && <span style={{ color: "red" }}>{error}</span>}
      <div className="reservation-list-header">
        <div>Date</div>
        <div>Time</div>
        <div>Name</div>
        <div>Contact</div>
        <div></div>
        <div></div>
      </div>
      {reservations.map((reservation) => (
        <Reservation
          key={reservation.id}
          reservation={reservation}
          setError={setError}
        />
      ))}
      {tempReservations.map((reservation) => (
        <Reservation
          key={reservation.id}
          reservation={reservation}
          setError={setError}
          temp
          tempCancelled={tempCancelled}
        />
      ))}
      <button onClick={addReservation}>Add reservation</button>
    </div>
  );
};

export default ReservationList;
