import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Suspense,
  lazy,
  useMemo,
} from "react";
import Loader from "../resuable/Loader";
import { useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import useAxios from "../../services/apiServices";
import { WORKBOOK_CONFIG } from "../shared/D3/constants";
import { UserContext } from "../../contexts/UserContext";
import WorkbookContext from "./WorkbookContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import useCopyPaste from "../../hooks/useCopyPaste";

const VerticalPanes = lazy(() =>
  import("./VerticalPane").then(module => ({
    default: module["VerticalPanes"],
  })),
);
const Pane = lazy(() =>
  import("./VerticalPane").then(module => ({
    default: module["Pane"],
  })),
);

const SheetPane = lazy(() => import("./SheetPane"));
const FeatureNotAvailable = lazy(() => import("./FeatureNotAvailable"));
const GraphList = lazy(() => import("./GraphList"));
const ChartContainer = lazy(() => import("./ChartContainer"));
const ChartOptions = lazy(() => import("./ChartOptions"));

const Workbook = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "workbook",
    defaultMessage: "workbook",
  })}`;
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
    expanded: true,
  });
  const [file, setFile] = useState({
    id: null,
    name: "",
    appId: userContext.userConfig.appId,
    isSaved: true,
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [savedWorkbooks, setSavedWorkbooks] = useState([]);

  const clonedChartObject = useMemo(
    () =>
      sheets
        .filter(f => f.id === activeSheet)[0]
        ?.charts.filter(f => f.id === activeChart)[0],
    [sheets, activeSheet, activeChart],
  );

  const { copied, pasted, lastAction } = useCopyPaste({
    chart: clonedChartObject,
    sheet: activeSheet,
  });

  useEffect(() => {
    const input = document.activeElement.tagName.toLowerCase();
    if (lastAction && lastAction === "paste" && input !== "input") {
      const selectedSheetCharts = sheets.filter(f => f.id === activeSheet)[0]
        ?.charts;
      if (selectedSheetCharts.length < WORKBOOK_CONFIG.chartLimit) {
        const newSheet = sheets.map(sheet => {
          if (sheet.id === activeSheet) {
            const chartId = uuidv4();
            sheet.charts = [
              ...sheet.charts,
              {
                ...pasted.chart,
                id: chartId,
                x: pasted.chart.x + 10,
                y: pasted.chart.y + 10,
                z: pasted.chart.z + 10,
              },
            ];
          }
          return sheet;
        });
        setSheets(newSheet);
      } else {
        userContext.renderToast({
          type: "warn",
          icon: "fa fa-exclamation-triangle",
          position: "bottom-center",
          message: intl.formatMessage({
            id: "chartLimitExceeded",
            defaultMessage: "chartLimitExceeded",
          }),
        });
      }
    }
  }, [copied, pasted, lastAction]);

  const toggleEndPane = () => {
    setWidthConfig(prev => ({
      ...prev,
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
      .catch(() =>
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
    setFile(prev => ({ ...prev, isSaved: false }));
  };

  const onUnload = e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const confirmationMessage = "";
    e.returnValue = confirmationMessage;
    return e.returnValue;
  };

  const handleDelete = event => {
    if (
      (event.key === "Delete" || event.key === "Backspace") &&
      document.activeElement.type !== "text"
    ) {
      const classList = [...document.body.classList];
      if (workbookRef.current && !classList.includes("modal-open")) {
        deleteChart(activeChart);
      }
    }
  };

  useEffect(() => {
    fetchSavedQueryList();
  }, []);

  useEffect(() => {
    if (!file.isSaved) {
      window.addEventListener("beforeunload", onUnload, { capture: true });
    }
    return () => {
      window.removeEventListener("beforeunload", onUnload, { capture: true });
    };
  }, [file]);

  useEffect(() => {
    const newSheet = [...sheets].map(sheet => {
      return sheet.charts.filter(f => f.id === activeChart).length > 0;
    });
    if (newSheet.every(f => f === false)) {
      setActiveChart("");
    }
    document.body.addEventListener("keydown", handleDelete);
    return () => {
      document.body.removeEventListener("keydown", handleDelete);
    };
  }, [sheets, activeChart]);

  const loaderComp = () => {
    return (
      <div className='relativeSpinner middle'>
        <Loader />
      </div>
    );
  };

  return (
    <Suspense fallback={loaderComp()}>
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
          className={`workbook user-select-none container-fluid small d-none d-sm-block`}
          ref={workbookRef}
        >
          <VerticalPanes
            theme={userContext.userData.theme}
            className={`border border-1 ${
              userContext?.userConfig?.webMenuType
            } ${
              userContext.userData.theme === "dark" ? "border-secondary" : ""
            } rounded-top`}
          >
            <Pane className='text-center overflow-auto graphList'>
              <GraphList />
            </Pane>
            <Pane
              width={"100%"}
              className={`border border-0 ${
                userContext.userData.theme === "dark" ? "border-secondary" : ""
              } border-top-0 border-bottom-0 ${!activeChart ? "border-end-0" : ""}`}
            >
              <ChartContainer />
            </Pane>
            {activeChart && (
              <div
                style={{
                  top: "32px",
                  width: "250px",
                  zIndex: 1,
                  right: "1px",
                }}
                className='position-absolute'
              >
                <div className='position-relative'>
                  <button
                    className='btn btn-sm btn-bni position-absolute rounded-0'
                    style={{
                      right: "0",
                      paddingBottom: "2px",
                    }}
                    onClick={() => toggleEndPane()}
                  >
                    <i className={`fa fa-cog`} />
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
                </div>
              </div>
            )}
          </VerticalPanes>
          <SheetPane />
        </div>
      </WorkbookContext.Provider>
    </Suspense>
  );
};

export default Workbook;
