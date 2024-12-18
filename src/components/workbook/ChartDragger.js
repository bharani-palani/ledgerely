import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import useDragger from "../../hooks/useDragger";
import WorkbookContext from "./WorkbookContext";
import _debounce from "lodash/debounce";
import { CHART_TYPES } from "../shared/D3/constants";
import ResizeRotate from "./ResizeRotate";
import { useIntl } from "react-intl";

const ChartDragger = ({ id, Component, chartObject }) => {
  const intl = useIntl();
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
    cloneChart,
    setFile,
  } = workbookContext;
  const [fullScreenStatus, setFullScreenStatus] = useState(false);
  const statusBarRef = useRef(null);
  useEffect(() => {
    if (!fullScreenStatus && document.fullscreenElement != null) {
      document.exitFullscreen();
    }
  }, [fullScreenStatus]);

  const debounceFn = useCallback(
    _debounce(newSheet => {
      setSheets(newSheet);
    }, 0),
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
              props: {
                ...chart.props,
                width: coords.width,
                height:
                  coords.height -
                  (!["SHAPES", "EMOJI"].includes(
                    CHART_TYPES[Number(chart.catId)],
                  )
                    ? statusBarRef.current.clientHeight + 0
                    : 0),
              },
            };
          }
          return chart;
        });
      }
      return sheet;
    });
    debounceFn(updatedSheet, coords);
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
    setFile(prev => ({ ...prev, isSaved: false }));
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
      {!["SHAPES", "EMOJI"].includes(CHART_TYPES[chartObject.catId]) ? (
        <>
          <div
            className={`d-flex column-gap-2 align-items-center justify-content-between bni-bg text-${
              theme === "dark" ? "black" : "white"
            } p-1 ${chartObject.visibility ? "rounded-top" : "rounded"}`}
            ref={statusBarRef}
          >
            <span
              style={{
                maxWidth: chartObject?.props?.width
                  ? `${chartObject?.props?.width / 3}px`
                  : "150px",
              }}
              className='pe-2 small d-inline-block text-nowrap overflow-hidden text-truncate'
              title={chartObject.props.name}
            >
              {chartObject.props.name}
            </span>
            <span className='shape draggable'>
              {new Array(20).fill("").join(":")}
            </span>
            <span>
              <i
                onClick={() => cloneChart(chartObject)}
                title={intl.formatMessage({
                  id: "clone",
                  defaultMessage: "clone",
                })}
                className='fa fa-clipboard cursor-pointer me-2'
              />
              {fullScreenStatus ? (
                <i
                  onClick={() => setFullScreenStatus(false)}
                  title={intl.formatMessage({
                    id: "closeFullScreen",
                    defaultMessage: "closeFullScreen",
                  })}
                  className={`fa fa-stop-circle cursor-pointer me-2`}
                />
              ) : (
                <i
                  onClick={() => {
                    setFullScreenStatus(true);
                    fullScreen(document.getElementById(`${id}`));
                  }}
                  title={intl.formatMessage({
                    id: "fullScreen",
                    defaultMessage: "fullScreen",
                  })}
                  className={`fa fa-play-circle cursor-pointer me-2`}
                />
              )}
              <i
                onClick={() => onHandleChartVisibility(chartObject.id)}
                title={
                  chartObject.visibility
                    ? intl.formatMessage({
                        id: "minimize",
                        defaultMessage: "minimize",
                      })
                    : intl.formatMessage({
                        id: "maximize",
                        defaultMessage: "maximize",
                      })
                }
                className={`fa fa-${
                  chartObject.visibility ? "minus" : "plus"
                }-circle cursor-pointer me-2`}
              />
              <i
                onClick={() => deleteChart(chartObject.id)}
                title={intl.formatMessage({
                  id: "confirmDelete",
                  defaultMessage: "confirmDelete",
                })}
                className='fa fa-times-circle cursor-pointer'
              />
            </span>
          </div>
          <div
            className={`border border-1 border-top-0 border-${
              theme === "dark" ? "black" : "grey"
            } rounded-bottom`}
          >
            {chartObject.visibility && (
              <ResizeRotate id={chartObject.id} catId={chartObject.catId}>
                <Component {...chartObject.props} />
              </ResizeRotate>
            )}
          </div>
        </>
      ) : (
        <ResizeRotate id={chartObject.id} catId={chartObject.catId}>
          <Component {...{ ...chartObject.props, id: chartObject.id }} />
        </ResizeRotate>
      )}
    </div>
  );
};

export default ChartDragger;
