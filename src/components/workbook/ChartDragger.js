import React, { useContext, useEffect, useCallback } from "react";
import useDragger from "../../hooks/useDragger";
import WorkbookContext from "./WorkbookContext";
import _debounce from "lodash/debounce";

const ChartDragger = ({ id, Component, chartObject }) => {
  const [coords] = useDragger(id, chartObject);
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
          if (chart.id === id) {
            chart = { ...chart, x: coords.left, y: coords.top };
          }
          return chart;
        });
      }
      return sheet;
    });
    debounceFn(updatedSheet);
  }, [coords, id]);

  const deleteChart = id => {
    const newSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = sheet.charts.filter(f => f.id !== id);
      }
      return sheet;
    });
    setSheets(newSheet);
  };

  const onHandleChartVisibility = id => {
    const updatedSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = sheet.charts.map(chart => {
          if (chart.id === id) {
            chart = { ...chart, visibility: !chart.visibility };
          }
          return chart;
        });
      }
      return sheet;
    });
    setSheets(updatedSheet);
  };

  return (
    <div
      id={id}
      className={`position-absolute rounded bg-${
        theme === "dark" ? "dark" : "white"
      } ${theme} ${activeChart === id ? "highlightedChart" : ""}`}
      onClick={() => setActiveChart(chartObject.id)}
      style={{ top: chartObject.y, left: chartObject.x }}
    >
      {
        <div
          className={`d-flex column-gap-2 align-items-center justify-content-between bni-bg text-dark p-2 ${
            chartObject.visibility ? "rounded-top" : "rounded"
          } header`}
        >
          <small>
            <i className='fa fa-bars pe-2' />
            {chartObject.props.name}
          </small>
          <span>
            <i
              onClick={() => onHandleChartVisibility(chartObject.id)}
              className={`fa fa-${
                chartObject.visibility ? "minus" : "plus"
              }-circle cursor-pointer pe-2`}
            />
            <i
              onClick={() => deleteChart(chartObject.id)}
              className='fa fa-times-circle cursor-pointer'
            />
          </span>
        </div>
      }
      {chartObject.visibility && <Component {...chartObject.props} />}
    </div>
  );
};

export default ChartDragger;
