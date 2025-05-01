import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Suspense,
  lazy,
} from "react";
import Loader from "../resuable/Loader";
import { useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import useAxios from "../../services/apiServices";
import { WORKBOOK_CONFIG } from "../shared/D3/constants";
import { UserContext } from "../../contexts/UserContext";
import WorkbookContext from "./WorkbookContext";
import { GlobalContext } from "../../contexts/GlobalContext";

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
  const apiInstance = useAxios();
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
    start: "10%",
    middle: "75%",
    end: "20%",
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

  const cloneChart = async cObj => {
    const selectedSheetCharts = sheets.filter(f => f.id === activeSheet)[0]
      ?.charts;
    if (selectedSheetCharts.length < WORKBOOK_CONFIG.chartLimit) {
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
      setTimeout(() => {
        setActiveChart(chartId);
        setFile(prev => ({ ...prev, isSaved: false }));
      }, 100);
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
            className={`border border-1 ${
              userContext?.userConfig?.webMenuType
            } ${
              userContext.userData.theme === "dark" ? "border-secondary" : ""
            } rounded-top`}
          >
            <Pane
              width={widthConfig.start}
              className='text-center overflow-auto'
            >
              <GraphList />
            </Pane>
            <Pane
              width={activeChart ? widthConfig.middle : "100%"}
              className={`border border-1 ${
                userContext.userData.theme === "dark" ? "border-secondary" : ""
              } border-top-0 border-bottom-0 ${!activeChart ? "border-end-0" : ""}`}
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
    </Suspense>
  );
};

export default Workbook;
