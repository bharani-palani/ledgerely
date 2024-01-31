import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { VerticalPanes, Pane } from "./VerticalPane";
import WorkbookContext from "./WorkbookContext";
import SheetPane from "./SheetPane";
import { v4 as uuidv4 } from "uuid";
import { useIntl } from "react-intl";
import ChartContainer from "./ChartContainer";
import FeatureNotAvailable from "./FeatureNotAvailable";
import GraphList from "./GraphList";
import ChartOptions from "./ChartOptions";

const Workbook = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [sheets, setSheets] = useState([
    {
      id: uuidv4(),
      order: 0,
      label: `${intl.formatMessage({
        id: "sheet",
        defaultMessage: "sheet",
      })} 1`,
      charts: [],
    },
  ]);
  const [activeSheet, setActiveSheet] = useState("");
  const [activeChart, setActiveChart] = useState("");
  const [zoom, setZoom] = useState(100);
  const [widthConfig, setWidthConfig] = useState({
    start: "5%",
    middle: "75%",
    end: "20%",
    expanded: true,
  });
  const [chartOptions, setChartOptions] = useState({
    width: 0,
    height: 0,
    innerRadius: 0,
    outerRadius: 0,
    barHeight: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    animationDuration: 1000,
    fontSize: 14,
    yTicks: 1,
    fillColor: [],
    fontColor: [],
    lineColor: [],
    xAxisLabel: "",
    yAxisLabel: "",
    tooltipPrefix: "",
    tooltipSuffix: "",
    className: "",
    xAxisTicksOrientation: "horizontal",
    sortClause: "asc",
    showTooltip: true,
    showXaxisLabel: true,
    showYaxisLine: true,
    showXaxis: true,
    showYaxis: true,
    showYaxisLabel: true,
    showAnimation: true,
    showLegend: true,
    data: [],
  });

  const toggleEndPane = () => {
    setWidthConfig(prev => ({
      ...prev,
      middle: widthConfig.expanded ? "95%" : "75%",
      end: widthConfig.expanded ? "0%" : "20%",
      expanded: !widthConfig.expanded,
    }));
  };

  return (
    <WorkbookContext.Provider
      value={{
        sheets,
        setSheets,
        theme: userContext.userData.theme,
        activeSheet,
        setActiveSheet,
        zoom,
        setZoom,
        chartOptions,
        setChartOptions,
        activeChart,
        setActiveChart,
      }}
    >
      <FeatureNotAvailable />
      <div className='container-fluid small d-none d-sm-block'>
        <VerticalPanes
          style={{ height: "calc(100vh - 150px)" }}
          theme={userContext.userData.theme}
          className={`border border-1 ${
            userContext.userData.theme === "dark" ? "border-secondary" : ""
          } rounded-top`}
        >
          <Pane width={widthConfig.start} className='text-center overflow-auto'>
            <GraphList />
          </Pane>
          <Pane
            width={activeChart ? widthConfig.middle : "100%"}
            className={`border border-1 ${
              userContext.userData.theme === "dark" ? "border-secondary" : ""
            } border-top-0 border-bottom-0`}
          >
            <ChartContainer />
          </Pane>
          {activeChart && (
            <Pane width={widthConfig.end} className='position-relative'>
              <button
                className='btn btn-sm btn-bni position-absolute'
                style={{
                  left: "-30px",
                  paddingBottom: "2px",
                  ...(widthConfig.expanded
                    ? { borderRadius: "0" }
                    : { borderRadius: "0 0.25rem 0 0" }),
                }}
                onClick={() => toggleEndPane()}
              >
                <i
                  className={`fa fa-arrow-${
                    widthConfig.expanded ? "right" : "left"
                  }`}
                />
              </button>
              <div
                className=''
                style={{
                  ...(widthConfig.expanded
                    ? { display: "block" }
                    : { display: "none" }),
                }}
              >
                <ChartOptions />
              </div>
            </Pane>
          )}
        </VerticalPanes>
        <SheetPane />
      </div>
    </WorkbookContext.Provider>
  );
};

export default Workbook;
