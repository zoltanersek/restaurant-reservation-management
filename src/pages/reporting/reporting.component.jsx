import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTables } from "../../redux/layout/layout.selectors";
import { selectReservationsForDay } from "../../redux/reservation/reservation.selectors";
import { compareReservations } from "../../redux/reservation/reservation.utils";
import { getTodayDay } from "../../utils/date.utils";

import "./reporting.styles.scss";

const Reporting = () => {
  const [reportDay, setReportDay] = useState(getTodayDay());
  const reservationsForDay = useSelector(selectReservationsForDay(reportDay));
  const tables = useSelector(selectTables);

  const handleChange = (e) => {
    setReportDay(e.target.value);
  };

  const groupByTable = (reservations) => {
    return reservations.reduce(function (r, a) {
      r[a.table] = r[a.table] || [];
      r[a.table].push(a);
      return r;
    }, Object.create(null));
  };

  const sort = (groupping) => {
    let result = {};
    for (const key in groupping) {
      result[key] = groupping[key].sort(compareReservations);
    }
    console.log(result);
    return result;
  };

  const findTable = (tableId) => {
    console.log("called find table with", tableId, tables);
    const result = tables.find((it) => it.id === tableId);
    console.log(result);
    return result;
  };

  return (
    <div>
      <span>Select day for reporting:</span>
      <input type="date" name="day" value={reportDay} onChange={handleChange} />
      {reportDay && <div>You have selected a report for {reportDay}</div>}
      <ul>
        {Object.keys(sort(groupByTable(reservationsForDay))).map((it) => (
          <li>
            Table #{findTable(it).number} with {findTable(it).seats} seats
            <ul>
              {sort(groupByTable(reservationsForDay))[it].map((it2) => (
                <li>
                <ul>
                <li>Name: {it2.name}</li>
                <li>Contact: {it2.contact}</li>
                <li>Date: {it2.date}</li>
                <li>Time: {it2.time}</li>
                </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reporting;
