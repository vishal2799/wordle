export const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

export const getDayOfTheYear = () => {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
};

export const getDayKey = () => {
  const d = new Date();
  let year = d.getFullYear();
  return `day-${getDayOfTheYear()}-${year}`;
};
