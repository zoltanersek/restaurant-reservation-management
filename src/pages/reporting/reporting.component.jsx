import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStart } from "../../redux/layout/layout.actions";
import { selectTables } from "../../redux/layout/layout.selectors";
import { reservationFetchStart } from "../../redux/reservation/reservation.actions";
import { selectReservationsForDay } from "../../redux/reservation/reservation.selectors";
import { compareReservations } from "../../redux/reservation/reservation.utils";
import { getTodayDay } from "../../utils/date.utils";

import "./reporting.styles.scss";

const Reporting = () => {
  const [reportDay, setReportDay] = useState(getTodayDay());
  const reservationsForDay = useSelector(selectReservationsForDay(reportDay));
  const tables = useSelector(selectTables);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStart());
    dispatch(reservationFetchStart());
  }, [dispatch]);

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

  const report = sort(groupByTable(reservationsForDay));

  return (
    <div>
      <span>Select day for reporting:</span>
      <input type="date" name="day" value={reportDay} onChange={handleChange} />
      {reportDay && <div>You have selected a report for {reportDay}</div>}
      <ul>
        {Object.keys(report)
          .map((it) => findTable(it))
          .map((it) => (
            <li key={it.id}>
              Table #{it.number} with {it.seats} seats
              <ul>
                {report[it.id].map((it2) => (
                  <li key={it2.id}>
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
