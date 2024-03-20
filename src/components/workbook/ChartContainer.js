import React, {
  useContext,
  Suspense,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Row,
  Col,
  InputGroup,
  Button,
  Dropdown,
  Form,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import WorkbookContext from "./WorkbookContext";
import * as cList from "../shared/D3";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../contexts/UserContext";
import apiInstance from "../../services/apiServices";
import ChartDragger from "./ChartDragger";

const ChartContainer = () => {
  const intl = useIntl();
  const workbookContext = useContext(WorkbookContext);
  const userContext = useContext(UserContext);
  const chartList = Object.keys(cList).reduce(
    (obj, item) => ({ ...obj, [item]: cList[item] }),
    {},
  );
  const {
    theme,
    activeSheet,
    setActiveSheet,
    defaultSheet,
    sheets,
    setSheets,
    activeChart,
    setActiveChart,
    workbookRef,
    file,
    setFile,
    saveLoading,
    setSaveLoading,
    savedWorkbooks,
    setSavedWorkbooks,
  } = workbookContext;
  const [ruler, setRuler] = useState(true);
  const [zoom, setZoom] = useState(0);
  const chartContainerRef = useRef(null);
  const [wrapperCoords, setWrapperCoords] = useState({
    width: chartWrapperRef?.current?.clientWidth,
    height: chartWrapperRef?.current?.clientHeight,
  });
  const chartWrapperRef = useRef(null);

  const fetchWorkbooks = () => {
    setSaveLoading(true);
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("workbook/getSavedWorkbooks", formdata)
      .then(({ data }) => {
        setSavedWorkbooks(data.response);
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
      )
      .finally(() => setSaveLoading(false));
  };

  useEffect(() => {
    fetchWorkbooks();
    setWrapperCoords({
      width: chartWrapperRef?.current?.clientWidth,
      height: chartWrapperRef?.current?.clientHeight,
    });
  }, []);

  useEffect(() => {
    const z = sheets.filter(f => f.id === activeSheet)[0]?.zoom || 100;
    setZoom(z);
  }, [sheets, activeSheet]);

  const selectedSheetCharts = sheets.filter(f => f.id === activeSheet)[0]
    ?.charts;

  const onDropHandle = async e => {
    const chartContainer = chartContainerRef.current.getBoundingClientRect();
    const data = JSON.parse(e.dataTransfer.getData("workbookDragData"));
    const chartId = uuidv4();
    const updatedSheet = sheets.map(sheet => {
      if (sheet.id === activeSheet) {
        sheet.charts = [
          ...sheet.charts,
          {
            ...data.chart,
            id: chartId,
            x: e.clientX - chartContainer.left,
            y: e.clientY - chartContainer.top,
          },
        ];
      }
      return sheet;
    });
    await setSheets(updatedSheet);
    await setActiveChart(chartId);
  };

  const Loader = () => (
    <div
      className='position-relative'
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div className='position-absolute w-100 h-100 d-flex align-items-center justify-content-center'>
        <i className='fa fa-circle-o-notch fa-5x fa-spin icon-bni' />
      </div>
    </div>
  );

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

  const onSaveClick = () => {
    setSaveLoading(true);
    const formdata = new FormData();
    const newFile = {
      ...file,
      sheets,
    };
    const blobFile = new Blob([JSON.stringify(newFile, null, 2)], {
      type: "application/json",
    });
    formdata.append("fileData", blobFile);
    apiInstance
      .post("workbook/saveWorkbook", formdata)
      .then(({ data }) => {
        if (data.response) {
          setFile(prev => ({
            ...prev,
            id: data.response,
          }));
          fetchWorkbooks();
          userContext.renderToast({
            position: "bottom-center",
            message: intl.formatMessage({
              id: "transactionSavedSuccessfully",
              defaultMessage: "transactionSavedSuccessfully",
            }),
          });
        } else {
          userContext.renderToast({
            position: "bottom-center",
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "noFormChangeFound",
              defaultMessage: "noFormChangeFound",
            }),
          });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          position: "bottom-center",
          message: intl.formatMessage({
            id: "somethingWentWrong",
            defaultMessage: "somethingWentWrong",
          }),
        });
      })
      .finally(() => setSaveLoading(false));
  };

  const onClickWorkbook = id => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("workbook/fetchWorkbookById", formdata)
      .then(({ data }) => {
        const wbArray = JSON.parse(data.response.wb_object);
        setSheets(wbArray);
        setFile(prev => ({
          ...prev,
          id: data.response.wb_id,
          name: data.response.wb_name,
        }));
        setTimeout(() => {
          setActiveSheet(wbArray[0]?.id);
          setActiveChart(wbArray[0]?.charts[0]?.id);
        }, 100);
      })
      .catch(() => {});
  };

  const confirmDeletePopover = () => (
    <Popover style={{ zIndex: 9999 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small>Confirm Delete ?</small>
      </Popover.Header>
      <Popover.Body
        style={{ columnGap: "5px" }}
        className='p-1 d-flex align-items-center justify-content-between'
      >
        <button
          onClick={() => onDeleteWorkbook()}
          className={`btn btn-sm btn-danger w-100 py-0`}
        >
          Yes
        </button>
        <button
          onClick={() => document.body.click()}
          className={`btn btn-sm btn-secondary w-100 py-0`}
        >
          No
        </button>
      </Popover.Body>
    </Popover>
  );

  const wbInfoPopover = () => (
    <Popover style={{ zIndex: 9999 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small>Workbook Info</small>
      </Popover.Header>
      <Popover.Body className='p-1' style={{ width: "120px" }}>
        <Row>
          <Col xs={8}>
            <small>Sheets</small>
          </Col>
          <Col xs={4}>
            <small>{sheets.length}</small>
          </Col>
          <Col xs={8}>
            <small>Charts</small>
          </Col>
          <Col xs={4}>
            <small>
              {sheets.map(s => s.charts.length).reduce((a, b) => a + b, 0)}
            </small>
          </Col>
          <Col xs={12}>
            <small>
              Size {(JSON.stringify(sheets).length / 1024).toFixed(2)} Kb
            </small>
          </Col>
        </Row>
      </Popover.Body>
    </Popover>
  );

  const onDeleteWorkbook = () => {
    setSaveLoading(true);
    const formdata = new FormData();
    formdata.append("id", file.id);
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("workbook/deleteWorkbook", formdata)
      .then(({ data }) => {
        if (data.response) {
          userContext.renderToast({
            position: "bottom-center",
            message: intl.formatMessage({
              id: "workbookSuccessfullyDeleted",
              defaultMessage: "workbookSuccessfullyDeleted",
            }),
          });
          fetchWorkbooks();
          onNewWorkbook();
        } else {
          userContext.renderToast({
            position: "bottom-center",
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "queryDeleteFailed",
              defaultMessage: "queryDeleteFailed",
            }),
          });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "somethingWentWrong",
            defaultMessage: "somethingWentWrong",
          }),
        });
      })
      .finally(() => {
        setSaveLoading(false);
        document.body.click();
      });
  };

  const onNewWorkbook = () => {
    setSheets(defaultSheet);
    setTimeout(() => {
      setActiveSheet(defaultSheet[0]?.id);
      setFile(prev => ({
        ...prev,
        id: null,
        name: "",
      }));
    }, 100);
  };

  return (
    <div className=''>
      <Row>
        <Col className={`${activeChart ? "pe-5" : ""}`}>
          <InputGroup className={`bg-${theme} rounded`} size='sm'>
            <Button
              variant='outline-secondary'
              className='bni-border bni-border-all bni-border-all-1 rounded-0'
              onClick={() => onNewWorkbook()}
            >
              <i className='fa fa-book icon-bni' />
            </Button>
            <Dropdown>
              <Dropdown.Toggle
                className={`bni-border bni-border-all bni-border-all-1 btn-bni`}
              >
                <FormattedMessage id='workbook' defaultMessage='workbook' />
              </Dropdown.Toggle>
              <Dropdown.Menu
                variant={theme}
                className='overflow-auto'
                style={{ maxHeight: "300px" }}
              >
                {savedWorkbooks?.length > 0 ? (
                  savedWorkbooks.map((list, i) => (
                    <Dropdown.Item
                      key={i}
                      as='div'
                      className='d-flex align-items-center px-1 py-0 small cursor-pointer'
                      onClick={() => onClickWorkbook(list.wb_id)}
                    >
                      <i className='fa fa-book icon-bni pe-2' />
                      <div className='small'>{list.wb_name}</div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item className='d-flex align-items-center justify-content-center px-1 py-0 small'>
                    <i className='fa fa-exclamation-triangle pe-2' />
                    <span>No records</span>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              className='bni-border bni-border-all bni-border-all-1'
              placeholder={`${intl.formatMessage({
                id: "name",
                defaultMessage: "name",
              })}`}
              onChange={e =>
                setFile(prev => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={file.name}
              maxLength={25}
            />
            {saveLoading && (
              <Button className='bg-light border-0'>
                <i className='fa fa-circle-o-notch fa-spin bni-text' />
              </Button>
            )}
            <Button
              variant='outline-secondary'
              className='bni-border bni-border-all bni-border-all-1'
              onClick={() => onSaveClick()}
              disabled={!(file.name && sheets.some(s => s.charts.length > 0))}
            >
              <i className='fa fa-save icon-bni' />
            </Button>
            <OverlayTrigger
              trigger='click'
              placement='bottom'
              overlay={confirmDeletePopover()}
              rootClose
            >
              <Button
                variant='outline-secondary'
                className={`bni-border bni-border-all bni-border-all-1`}
                disabled={!file.id}
              >
                <i className='fa fa-trash icon-bni' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              trigger='click'
              placement='bottom'
              overlay={wbInfoPopover()}
              rootClose
            >
              <Button
                variant='outline-secondary'
                className={`bni-border bni-border-all bni-border-all-1`}
                style={{ padding: "0 12px" }}
              >
                <i className='fa fa-info icon-bni' />
              </Button>
            </OverlayTrigger>
            <Button
              variant='outline-secondary'
              className={`bni-border bni-border-all bni-border-all-1 ${
                ruler ? "bg-secondary" : ""
              }`}
              onClick={() => setRuler(!ruler)}
            >
              <i className='fa fa-th-large icon-bni' />
            </Button>
            <Button
              variant='outline-secondary'
              className={`bni-border bni-border-all bni-border-all-1 rounded-0`}
              onClick={() => fullScreen(workbookRef.current)}
            >
              <i className='fa fa-expand icon-bni' />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Suspense fallback={<Loader />}>
        <div
          ref={chartWrapperRef}
          className='overflow-auto'
          style={{
            height: `${wrapperCoords.height}px`,
          }}
        >
          <div
            ref={chartContainerRef}
            style={{ zoom: zoom / 100 }}
            className={`position-relative chart-container chart-container-${
              ruler ? theme : ""
            } ${userContext?.userConfig?.webMenuType}`}
            onDrop={e => onDropHandle(e)}
            onDragOver={e => {
              e.preventDefault();
            }}
            onClick={e => {
              if (e.currentTarget === e.target) {
                setActiveChart("");
              }
            }}
          >
            {selectedSheetCharts?.length > 0 ? (
              selectedSheetCharts.map(s => {
                const Component = chartList[s.chartKey];
                return (
                  <ChartDragger
                    key={s.id}
                    id={s.id}
                    Component={Component}
                    chartObject={s}
                  />
                );
              })
            ) : (
              <div className='d-flex align-items-center h-100 justify-content-center'>
                <span className='text-secondary small'>
                  Start to drag charts here
                </span>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default ChartContainer;
