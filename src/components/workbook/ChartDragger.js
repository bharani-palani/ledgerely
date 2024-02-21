import React, { useContext, useEffect, useCallback } from "react";
import useDragger from "../../hooks/useDragger";
import WorkbookContext from "./WorkbookContext";
import _debounce from "lodash/debounce";

const ChartDragger = ({ id, Component, chartObject }) => {
  const [coords] = useDragger(id);
  const workbookContext = useContext(WorkbookContext);
  const { theme, activeSheet, sheets, setSheets, activeChart, setActiveChart } =
    workbookContext;

  const debounceFn = useCallback(
    _debounce(newSheet => {
      setSheets(newSheet);
    }, 300),
    [],
  );

  useEffect(() => {
    const updatedSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = sheet.charts.map(chart => {
          if (chart.id === activeChart) {
            chart = { ...chart, x: coords.left, y: coords.top };
          }
          return chart;
        });
      }
      return sheet;
    });
    debounceFn(updatedSheet);
  }, [coords]);

  const deleteChart = id => {
    const newSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = sheet.charts.filter(f => f.id !== id);
      }
      return sheet;
    });
    setSheets(newSheet);
  };

  return (
    <div
      id={id}
      className={`position-absolute bg-${theme} ${theme} ${
        activeChart === id ? "highlightedChart" : ""
      }`}
      onClick={() => setActiveChart(chartObject.id)}
      style={{ top: chartObject.y, left: chartObject.x }}
    >
      {activeChart === id && (
        <i
          onClick={() => deleteChart(chartObject.id)}
          className='fa fa-1x fa-times-circle cursor-pointer m-1 text-danger pull-right'
        />
      )}
      <Component {...chartObject.props} />
    </div>
  );
};

export default ChartDragger;
