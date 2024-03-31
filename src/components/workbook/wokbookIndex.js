import React, { useContext, useEffect, useState, useRef } from "react";
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
import apiInstance from "../../services/apiServices";

const Workbook = props => {
  const intl = useIntl();
  const workbookRef = useRef(null);
  const userContext = useContext(UserContext);
  const defaultSheet = [
    {
      id: uuidv4(),
      order: 0,
      label: `${intl.formatMessage({
        id: "sheet",
        defaultMessage: "sheet",
      })} 1`,
      charts: [],
      zoom: 100,
    },
  ];
  const [sheets, setSheets] = useState(defaultSheet);
  const [activeSheet, setActiveSheet] = useState("");
  const [activeChart, setActiveChart] = useState("");
  const [savedQueryList, setSavedQueryList] = useState(false);
  const [widthConfig, setWidthConfig] = useState({
    start: "10%",
    middle: "75%",
    end: "20%",
    expanded: true,
  });
  const [file, setFile] = useState({
    id: null,
    name: "",
    appId: userContext.userConfig.appId,
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [savedWorkbooks, setSavedWorkbooks] = useState([]);

  const toggleEndPane = () => {
    setWidthConfig(prev => ({
      ...prev,
      middle: widthConfig.expanded ? "95%" : "75%",
      end: widthConfig.expanded ? "0%" : "25%",
      expanded: !widthConfig.expanded,
    }));
  };

  const fetchSavedQueryList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("workbook/getSavedQueryLists", formdata)
      .then(({ data }) => {
        setSavedQueryList(data.response);
      })
      .catch(e =>
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          position: "bottom-center",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        }),
      );
  };

  const deleteChart = id => {
    const newSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = sheet.charts.filter(f => f.id !== id);
      }
      return sheet;
    });
    setSheets(newSheet);
  };

  const cloneChart = cObj => {
    const chartId = uuidv4();
    const updatedSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = [
          ...sheet.charts,
          {
            ...cObj,
            id: chartId,
            x: 0,
            y: 0,
            z: 0,
          },
        ];
      }
      return sheet;
    });
    setSheets(updatedSheet);
  };

  useEffect(() => {
    fetchSavedQueryList();
  }, []);

  useEffect(() => {
    const newSheet = [...sheets].map(sheet => {
      return sheet.charts.filter(f => f.id === activeChart).length > 0;
    });
    if (newSheet.every(f => f === false)) {
      setActiveChart("");
    }
  }, [sheets, activeChart]);

  return (
    <WorkbookContext.Provider
      value={{
        defaultSheet,
        sheets,
        setSheets,
        theme: userContext.userData.theme,
        activeSheet,
        setActiveSheet,
        activeChart,
        setActiveChart,
        deleteChart,
        cloneChart,
        workbookRef,
        file,
        setFile,
        saveLoading,
        setSaveLoading,
        savedWorkbooks,
        setSavedWorkbooks,
        savedQueryList,
        setSavedQueryList,
        fetchSavedQueryList,
      }}
    >
      <FeatureNotAvailable />
      <div
        className={`workbook container-fluid small d-none d-sm-block`}
        ref={workbookRef}
      >
        <VerticalPanes
          theme={userContext.userData.theme}
          className={`border border-1 ${userContext?.userConfig?.webMenuType} ${
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
