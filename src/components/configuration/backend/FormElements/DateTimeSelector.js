import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import helpers from "../../../../helpers";
import DateTimeDropDown from "./DateTimeDropDown";

const DateTimeSelector = props => {
  let { value, type, onChange } = props;
  value = new Date(value).toString() === "Invalid Date" ? new Date() : value;
  const [dbYear, setDbYear] = useState(value.getFullYear());
  const [dbMonth, setDbMonth] = useState(
    helpers.leadingZeros(value.getMonth() + 1)
  );
  const [dbDate, setDbDate] = useState(helpers.leadingZeros(value.getDate()));
  const [dbHours, setDbHours] = useState(
    helpers.leadingZeros(value.getHours())
  );
  const [dbMinutes, setDbMinutes] = useState(
    helpers.leadingZeros(value.getMinutes())
  );
  const [dbSeconds, setDbSeconds] = useState(
    helpers.leadingZeros(value.getSeconds())
  );

  const dateCount = new Date(dbYear, dbMonth, 0).getDate();

  const addLeadingZerosAsObject = (count, inc = 0, start = false) => {
    const init = !isNaN(start) ? start : inc;
    return Array(count)
      .fill()
      .map((_, i) => {
        return {
          value: helpers.leadingZeros(init + i).toString(),
          label: helpers.leadingZeros(init + i).toString()
        };
      });
  };

  const startYear = new Date(1900, 0, 1).getFullYear();
  const endYear = new Date().getFullYear() + 5;
  const years = addLeadingZerosAsObject(endYear - startYear + 1, 1, startYear);
  const months = addLeadingZerosAsObject(12, 1, 1);
  const dateArray = addLeadingZerosAsObject(dateCount, 1, 1);
  const [dates, setDates] = useState(dateArray);

  const hours = addLeadingZerosAsObject(24, 1, 0);
  const minutes = addLeadingZerosAsObject(60, 1, 0);
  const seconds = addLeadingZerosAsObject(60, 1, 0);

  useEffect(() => {
    const date = new Date(
      dbYear,
      Number(dbMonth) - 1,
      dbDate,
      dbHours,
      dbMinutes,
      dbSeconds,
      0
    );
    onChange(date);
  }, [dbYear, dbMonth, dbDate,dbHours,dbMinutes,dbSeconds]);
  return (
    <div
      className={`dateTimeSelector ${type === "date" ? "date" : "dateTime"}`}
    >
      <DateTimeDropDown
        defaultValue={dbYear}
        array={years}
        onSelectClick={value => setDbYear(value)}
        onItemClick={value => {
          setDbYear(value);
          const callDays = new Date(value, 1, 0).getDate();
          const dateArray = addLeadingZerosAsObject(callDays, 1, 1);
          setDates(dateArray);
          setDbMonth("01");
          setDbDate("01");
        }}
      />
      <div>/</div>
      <DateTimeDropDown
        defaultValue={dbMonth}
        array={months}
        onSelectClick={value => setDbMonth(value)}
        onItemClick={value => {
          setDbMonth(value);
          const callDays = new Date(dbYear, value, 0).getDate();
          const dateArray = addLeadingZerosAsObject(callDays, 1, 1);
          setDates(dateArray);
          setDbDate("01");
        }}
      />
      <div>/</div>
      <DateTimeDropDown
        defaultValue={dbDate}
        array={dates}
        onSelectClick={value => setDbDate(value)}
        onItemClick={value => {
          setDbDate(helpers.leadingZeros(value));
        }}
      />
      {type === "dateTime" && (
        <>
          <div>&nbsp;</div>
          <DateTimeDropDown
            defaultValue={dbHours}
            array={hours}
            onSelectClick={value => setDbHours(value)}
            onItemClick={value => {
              setDbHours(helpers.leadingZeros(value));
            }}
          />
          <div>:</div>
          <DateTimeDropDown
            defaultValue={dbMinutes}
            array={minutes}
            onSelectClick={value => setDbMinutes(value)}
            onItemClick={value => {
              setDbMinutes(helpers.leadingZeros(value));
            }}
          />
          <div>:</div>
          <DateTimeDropDown
            defaultValue={dbSeconds}
            array={seconds}
            onSelectClick={value => setDbSeconds(value)}
            onItemClick={value => {
              setDbSeconds(helpers.leadingZeros(value));
            }}
          />
        </>
      )}
    </div>
  );
};

DateTimeSelector.propTypes = {
  value: PropTypes.object,
  type: PropTypes.string,
  onChange: PropTypes.func
};
DateTimeSelector.defaultProps = {
  type: "date"
};

export default DateTimeSelector;
