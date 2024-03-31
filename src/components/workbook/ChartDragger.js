import React, { useContext, useEffect, useCallback, useState } from "react";
import useDragger from "../../hooks/useDragger";
import WorkbookContext from "./WorkbookContext";
import _debounce from "lodash/debounce";
import { CHART_TYPES } from "../shared/D3/constants";
import ResizeRotate from "./ResizeRotate";

const ChartDragger = ({ id, Component, chartObject }) => {
  const [coords] = useDragger(id, chartObject);
  const workbookContext = useContext(WorkbookContext);
  const {
    theme,
    activeSheet,
    sheets,
    setSheets,
    activeChart,
    setActiveChart,
    deleteChart,
  } = workbookContext;
  const [fullScreenStatus, setFullScreenStatus] = useState(false);

  useEffect(() => {
    if (!fullScreenStatus && document.fullscreenElement != null) {
      document.exitFullscreen();
    }
  }, [fullScreenStatus]);

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
            chart = {
              ...chart,
              x: coords.left,
              y: coords.top,
              z: coords.rotate,
            };
          }
          return chart;
        });
      }
      return sheet;
    });
    debounceFn(updatedSheet);
  }, [coords, id]);

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

  const fullScreen = elem => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };

  return (
    <div
      id={id}
      className={`position-absolute rounded bg-transparent ${theme} ${
        activeChart === id ? "highlightedChart" : ""
      }`}
      onClick={() => setActiveChart(chartObject.id)}
      style={{
        top: chartObject.y,
        left: chartObject.x,
        transform: `rotate(${chartObject.z}deg)`,
      }}
    >
      {CHART_TYPES[chartObject.catId] !== "SHAPES" ? (
        <>
          <div
            className={`shape d-flex column-gap-2 align-items-center justify-content-between bni-bg text-${
              theme === "dark" ? "black" : "white"
            } p-1 ${chartObject.visibility ? "rounded-top" : "rounded"} header`}
          >
            <small>
              <i className='fa fa-bars pe-2' />
              {chartObject.props.name}
            </small>
            <span>
              {fullScreenStatus ? (
                <i
                  onClick={() => setFullScreenStatus(false)}
                  className={`fa fa-stop-circle cursor-pointer me-2`}
                />
              ) : (
                <i
                  onClick={() => {
                    setFullScreenStatus(true);
                    fullScreen(document.getElementById(`${id}`));
                  }}
                  className={`fa fa-play-circle cursor-pointer me-2`}
                />
              )}
              <i
                onClick={() => onHandleChartVisibility(chartObject.id)}
                className={`fa fa-${
                  chartObject.visibility ? "minus" : "plus"
                }-circle cursor-pointer me-2`}
              />
              <i
                onClick={() => deleteChart(chartObject.id)}
                className='fa fa-times-circle cursor-pointer'
              />
            </span>
          </div>
          <div
            className={`border border-1 border-top-0 border-${
              theme === "dark" ? "black" : "grey"
            } rounded-bottom`}
          >
            {chartObject.visibility && <Component {...chartObject.props} />}
          </div>
        </>
      ) : (
        <ResizeRotate id={chartObject.id}>
          <Component {...{ ...chartObject.props, id: chartObject.id }} />
        </ResizeRotate>
      )}
    </div>
  );
};

export default ChartDragger;
