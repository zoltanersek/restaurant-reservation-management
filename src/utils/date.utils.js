export const sameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const getTodayDay = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const getDateFromString = (date) => {
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day);
}
