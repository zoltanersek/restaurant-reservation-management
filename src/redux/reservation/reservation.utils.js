export const getDateFromReservation = (reservation) => {
  const [minute, second] = reservation.time.split(":");
  const [year, month, day] = reservation.date.split("-");
  return new Date(year, month - 1, day, minute, second);
};

export const compareReservations = (a, b) => {
  const aDate = getDateFromReservation(a);
  const bDate = getDateFromReservation(b);
  if (aDate < bDate) {
    return -1;
  }
  if (aDate > bDate) {
    return 1;
  }
  return 0;
};
