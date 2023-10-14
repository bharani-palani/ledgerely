const appThemeBgColor = "#c2d82e";
const appThemeColor = "#000000";
const successColor = "#198754";
const dangerColor = "#dc3545";
const warningColor = "#ffc107";
const infoColor = "#0dcaf0";

const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getDaysArray = (start, end) => {
  const arr = [];
  for (
    const dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push({ label: new Date(dt), value: randomIntFromRange(20, 100) });
  }
  return arr;
};

const pannableChartData = getDaysArray(
  new Date("2020-01-01"),
  new Date("2025-12-31"),
);

export {
  appThemeBgColor,
  appThemeColor,
  successColor,
  dangerColor,
  warningColor,
  infoColor,
  randomIntFromRange,
  pannableChartData,
};
