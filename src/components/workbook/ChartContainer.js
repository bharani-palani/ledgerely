import React, { useContext, Suspense, useState, useEffect, useRef } from "react";
import { Row, Col, InputGroup, Button, Dropdown, Form, Popover, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import WorkbookContext from "./WorkbookContext";
import * as cList from "../shared/D3";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../contexts/UserContext";
import useAxios from "../../services/apiServices";
import ChartDragger from "./ChartDragger";
import { WORKBOOK_CONFIG } from "../shared/D3/constants";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import { useQuery } from "../GlobalHeader/queryParamHook";
import domtoimage from "dom-to-image-more";
import moment from "moment";

const ChartContainer = props => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const workbookContext = useContext(WorkbookContext);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const chartList = Object.keys(cList).reduce((obj, item) => ({ ...obj, [item]: cList[item] }), {});

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
  const chartWrapperRef = useRef(null);
  const [wrapperCoords, setWrapperCoords] = useState({
    width: chartWrapperRef?.current?.clientWidth,
    height: chartWrapperRef?.current?.clientHeight,
  });
  const [fullScreenMode, setFullScreenMode] = useState(false);

  const renderTooltip = (props, content) => (
    <Tooltip id={`button-tooltip-${Math.random()}`} className='in show'>
      {content}
    </Tooltip>
  );

  const fetchWorkbooks = () => {
    setSaveLoading(true);
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("workbook/getSavedWorkbooks", formdata)
      .then(({ data }) => {
        setSavedWorkbooks(data.response);
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

  /*
   * Query params landing feature starts
   */
  const searchParams = useQuery();
  const params = {
    fetch: searchParams.get("fetch"),
    wbId: searchParams.get("wbId"),
  };

  useEffect(() => {
    if (params.fetch === "workbook" && params.wbId && savedWorkbooks.length > 0) {
      const formdata = new FormData();
      formdata.append("id", params.wbId);
      formdata.append("appId", userContext.userConfig.appId);
      apiInstance
        .post("workbook/fetchWorkbookById", formdata)
        .then(async ({ data }) => {
          const wbArray = JSON.parse(data.response.wb_object);
          setSheets(wbArray);
          setFile(prev => ({
            ...prev,
            id: data.response.wb_id,
            name: data.response.wb_name,
            isSaved: true,
          }));
          setTimeout(() => {
            setActiveSheet(wbArray[0]?.id);
            setActiveChart(wbArray[0]?.charts[0]?.id);
          }, 100);
        })
        .catch(() => {});
    }
  }, [JSON.stringify(params), savedWorkbooks]);

  /*
   * Query params landing feature ends
   */

  const selectedSheetCharts = sheets.filter(f => f.id === activeSheet)[0]?.charts;

  const onDropHandle = async e => {
    const data = JSON.parse(e.dataTransfer.getData("workbookDragData"));
    const isValidChart = userContext?.userConfig?.planVisualizations?.includes(data?.chart?.chartKey);
    if (isValidChart) {
      if (selectedSheetCharts.length < WORKBOOK_CONFIG.chartLimit) {
        const chartContainer = chartContainerRef.current.getBoundingClientRect();
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
                z: 0,
              },
            ];
          }
          return sheet;
        });
        await setSheets(updatedSheet);
        await setActiveChart(chartId);
        await setFile(prev => ({ ...prev, isSaved: false }));
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
    } else {
      myAlertContext.setConfig({
        show: true,
        className: "alert-danger border-0 text-dark",
        type: "danger",
        dismissible: true,
        heading: <UpgradeHeading />,
        content: <UpgradeContent />,
      });
    }
  };

  const Loader = () => (
    <div className='position-relative' style={{ height: "calc(100vh - 200px)" }}>
      <div className='position-absolute w-100 h-100 d-flex align-items-center justify-content-center'>
        <i className='fa fa-circle-o-notch fa-5x fa-spin icon-bni' />
      </div>
    </div>
  );

  const fullScreen = elem => {
    if (document.fullscreenElement === null) {
      setFullScreenMode(true);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      setFullScreenMode(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
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
        if (data.response !== null && data.response) {
          setFile(prev => ({
            ...prev,
            id: data.response,
          }));
          fetchWorkbooks();
          setFile(prev => ({ ...prev, isSaved: true }));
          userContext.renderToast({
            position: "bottom-center",
            message: intl.formatMessage({
              id: "transactionSavedSuccessfully",
              defaultMessage: "transactionSavedSuccessfully",
            }),
          });
        }
        if (data.response === null) {
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: <UpgradeHeading />,
            content: <UpgradeContent />,
          });
        }

        if (data.response !== null && !data.response) {
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
      .catch(() => {
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
          isSaved: true,
        }));
        setTimeout(() => {
          setActiveSheet(wbArray[0]?.id);
          setActiveChart(wbArray[0]?.charts[0]?.id);
        }, 100);
      })
      .catch(() => {});
  };

  const confirmDeletePopover = () => (
    <Popover style={{ zIndex: 10000 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small>
          {intl.formatMessage({
            id: "confirmDelete",
            defaultMessage: "confirmDelete",
          })}
        </small>
      </Popover.Header>
      <Popover.Body style={{ columnGap: "5px" }} className='p-1 d-flex align-items-center justify-content-between'>
        <button onClick={() => onDeleteWorkbook()} className={`btn btn-sm btn-danger w-100 py-0`}>
          {intl.formatMessage({
            id: "yes",
            defaultMessage: "yes",
          })}
        </button>
        <button onClick={() => document.body.click()} className={`btn btn-sm btn-secondary w-100 py-0`}>
          {intl.formatMessage({
            id: "no",
            defaultMessage: "no",
          })}
        </button>
      </Popover.Body>
    </Popover>
  );

  const wbInfoPopover = () => (
    <Popover style={{ zIndex: 10000 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small>
          {intl.formatMessage({
            id: "info",
            defaultMessage: "info",
          })}
        </small>
      </Popover.Header>
      <Popover.Body className='p-1' style={{ width: "120px" }}>
        <Row>
          <Col xs={8}>
            <small>
              {intl.formatMessage({
                id: "sheets",
                defaultMessage: "sheets",
              })}
            </small>
          </Col>
          <Col xs={4}>
            <small>{sheets.length}</small>
          </Col>
          <Col xs={8}>
            <small>
              {intl.formatMessage({
                id: "charts",
                defaultMessage: "charts",
              })}
            </small>
          </Col>
          <Col xs={4}>
            <small>{sheets.map(s => s.charts.length).reduce((a, b) => a + b, 0)}</small>
          </Col>
          <Col xs={12}>
            <small>
              {intl.formatMessage({
                id: "fileSize",
                defaultMessage: "fileSize",
              })}{" "}
              {(JSON.stringify(sheets).length / 1024).toFixed(2)} Kb
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
      .catch(() => {
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
      setFile(prev => ({ ...prev, isSaved: true }));
    }, 100);
  };

  const saveAs = (blob, fileName = "pic") => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const onExport = async () => {
    domtoimage
      .toBlob(chartContainerRef.current)
      .then(function (blob) {
        saveAs(blob, `export_wb_${moment().format("DD_MM_YYYY_HH_mm_ss").toString()}.png`);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div className=''>
      <Row>
        <Col>
          <InputGroup className={`rounded`} size='sm'>
            <Button
              variant=''
              className={`rounded-0 border-${theme === "dark" ? "secondary" : "light"} btn-${theme}`}
              onClick={() => onNewWorkbook()}
              title={intl.formatMessage({
                id: "newWorkbook",
                defaultMessage: "newWorkbook",
              })}
            >
              <i className='fa fa-book' />
            </Button>
            <Dropdown>
              <Dropdown.Toggle className={`btn-${theme} border-${theme === "dark" ? "secondary" : "light"}`}>
                <FormattedMessage id='workbook' defaultMessage='workbook' />
              </Dropdown.Toggle>
              <Dropdown.Menu variant={theme} className='overflow-auto' style={{ maxHeight: "300px" }}>
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
                    <span>
                      <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
                    </span>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              className={`border-${theme === "dark" ? "secondary" : "light"}`}
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
              <Button className='bg-white border-0'>
                <i className='fa fa-circle-o-notch fa-spin bni-text' />
              </Button>
            )}
            <OverlayTrigger
              placement='bottom'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(
                props,
                intl.formatMessage({
                  id: "save",
                  defaultMessage: "save",
                }),
              )}
              triggerType='hover'
            >
              <Button
                variant={theme}
                className={`border-${theme === "dark" ? "secondary" : "light"} btn-${theme} border-end-0 border-top-0`}
                onClick={() => onSaveClick()}
                disabled={!(file.name && sheets.some(s => s.charts.length > 0))}
              >
                <i className='fa fa-save' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger trigger='click' placement='bottom' overlay={confirmDeletePopover()} rootClose>
              <Button
                variant={theme}
                className={`border-${theme === "dark" ? "secondary" : "light"} btn-${theme} border-end-0 border-top-0`}
                disabled={!file.id}
              >
                <i className='fa fa-trash' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger trigger='click' placement='bottom' overlay={wbInfoPopover()} rootClose>
              <Button
                variant={theme}
                className={`border-${theme === "dark" ? "secondary" : "light"} btn-${theme} border-end-0 border-top-0`}
                style={{ padding: "0 12px" }}
              >
                <i className='fa fa-info' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement='bottom'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(
                props,
                intl.formatMessage({
                  id: "grid",
                  defaultMessage: "grid",
                }),
              )}
              triggerType='hover'
            >
              <Button
                variant={theme}
                className={`border-${theme === "dark" ? "secondary" : "light"} btn-${theme} border-end-0 border-top-0`}
                onClick={() => setRuler(!ruler)}
              >
                <i className='fa fa-th-large' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement='bottom'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(
                props,
                intl.formatMessage(
                  {
                    id: "exportToValue",
                    defaultMessage: "exportToValue",
                  },
                  { value: "PNG" },
                ),
              )}
              triggerType='hover'
            >
              <Button
                variant={theme}
                className={`border-${theme === "dark" ? "secondary" : "light"} btn-${theme} rounded-0 border-top-0`}
                onClick={() => onExport()}
                disabled={!sheets.some(s => s.charts.length > 0)}
              >
                <i className='fa fa-file-image-o' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement='bottom'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(
                props,
                intl.formatMessage({
                  id: "fullScreen",
                  defaultMessage: "fullScreen",
                }),
              )}
              triggerType='hover'
            >
              <Button
                variant={theme}
                className={`border-${
                  theme === "dark" ? "secondary" : "light"
                } btn-${theme} border-top-0 ${!activeChart ? "border-end-0" : ""} border-end-0 rounded-bottom-0`}
                onClick={() => fullScreen(workbookRef.current)}
                style={!activeChart ? { borderRadius: "0 5px 0 0" } : {}}
              >
                <i className={!fullScreenMode ? "fa fa-expand" : "fa fa-compress"} />
              </Button>
            </OverlayTrigger>
          </InputGroup>
        </Col>
      </Row>
      <Suspense fallback={<Loader />}>
        <div
          ref={chartWrapperRef}
          className='overflow-auto chartWrapper'
          style={{
            height: `${wrapperCoords.height}px`,
          }}
        >
          <div
            ref={chartContainerRef}
            style={{ zoom: zoom / 100 }}
            className={`position-relative chart-container chart-container-${ruler ? theme : ""} ${userContext?.userConfig?.webMenuType}`}
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
                return <ChartDragger key={s.id} id={s.id} Component={Component} chartObject={s} />;
              })
            ) : (
              <div className='d-flex align-items-center h-100 justify-content-center'>
                <kbd className={`text-secondary small bg-${theme}`}>
                  <FormattedMessage id='startToDragChartsHere' defaultMessage='startToDragChartsHere' />
                </kbd>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default ChartContainer;
