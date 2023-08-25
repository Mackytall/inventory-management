export const datesAreOnSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export function t<V extends string, T extends { [key in string]: V }>(o: T): T {
  return o;
}
