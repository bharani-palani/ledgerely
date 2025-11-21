import React, { useContext, useState, createContext, useEffect, useCallback, useRef } from "react";
import { Modal, ButtonGroup, Button, Dropdown, Popover, OverlayTrigger, Row, Col, Form } from "react-bootstrap";
import WorkbookContext from "../WorkbookContext";
import { UserContext } from "../../../contexts/UserContext";
import { VerticalPanes, Pane } from "../VerticalPane";
import DSOptions from "../DataSourceOptions";
import DynamicClause from "./DynamicClause";
import useAxios from "../../../services/apiServices";
import { useIntl, FormattedMessage } from "react-intl";
import { MyAlertContext } from "../../../contexts/AlertContext";
import { UpgradeHeading, UpgradeContent } from "../../payment/Upgrade";
import useDataSourceConstants from "./useDataSourceConstants";
import _ from "lodash";

export const DSContext = createContext([{}, () => {}]);

const DataSource = () => {
  const { apiInstance } = useAxios();
  const { functions, csFunctions, operators, joinTypes, orderTypes, limitTypes } = useDataSourceConstants();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const workbookContext = useContext(WorkbookContext);
  const myAlertContext = useContext(MyAlertContext);
  const { theme, sheets, setSheets, activeSheet, activeChart, savedQueryList, setSavedQueryList, fetchSavedQueryList } = workbookContext;
  const [massageData, setMassageData] = useState({});
  const selectedSheetChartData = sheets.filter(f => f.id === activeSheet)[0]?.charts.filter(f => f.id === activeChart)[0]?.props.data;
  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState({});
  const [activeDataSource, setActiveDataSource] = useState("MP");
  const optionsConfig = [
    {
      id: "MP",
      label: "SQL",
      tables: [
        {
          label: "banks",
          fields: [
            "bank_id",
            "bank_name",
            "bank_account_number",
            "bank_swift_code",
            "bank_account_type",
            "bank_country",
            "bank_sort",
            "bank_locale",
            "bank_currency",
          ],
        },
        {
          label: "income_expense_category",
          fields: ["inc_exp_cat_id", "inc_exp_cat_name", "inc_exp_cat_is_metric", "inc_exp_cat_is_plan_metric"],
        },
        {
          label: "income_expense",
          fields: [
            "inc_exp_id",
            "inc_exp_name",
            "inc_exp_amount",
            "inc_exp_plan_amount",
            "inc_exp_type",
            "inc_exp_date",
            "inc_exp_added_at",
            "inc_exp_category",
            "inc_exp_bank",
            "inc_exp_comments",
            "inc_exp_is_planned",
            "inc_exp_is_income_metric",
          ],
        },
        {
          label: "credit_cards",
          fields: [
            "credit_card_id",
            "credit_card_name",
            "credit_card_number",
            "credit_card_start_date",
            "credit_card_end_date",
            "credit_card_payment_date",
            "credit_card_annual_interest",
            "credit_card_locale",
            "credit_card_currency",
          ],
        },
        {
          label: "credit_card_transactions",
          fields: [
            "cc_id",
            "cc_transaction",
            "cc_date",
            "cc_opening_balance",
            "cc_payment_credits",
            "cc_purchases",
            "cc_taxes_interest",
            "cc_for_card",
            "cc_inc_exp_cat",
            "cc_comments",
            "cc_transaction_status",
            "cc_added_at",
          ],
        },
      ],
      hasUpload: false,
    },
    {
      id: "CSV",
      label: "CSV",
      fileType: "text/csv,text/comma-separated-values,application/csv",
      hasUpload: true,
    },
    {
      id: "JSON",
      label: "JSON",
      fileType: "application/json",
      hasUpload: true,
    },
  ];
  const initClause = {
    select: [],
    from: "",
    where: [],
    join: [],
    groupBy: [],
    having: [],
    orderBy: [],
    limit: [1000, 0],
  };
  const [clause, setClause] = useState(initClause);
  const [tableDragging, setTableDragging] = useState({});
  const [fieldDragging, setFieldDragging] = useState({});
  const [response, setResponse] = useState(selectedSheetChartData);
  const [errorResponse, setErrorResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataView, setDataView] = useState("json");
  const [file, setFile] = useState({
    id: null,
    name: "",
    appId: userContext.userConfig.appId,
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedWBFields, setSelectedWBFields] = useState([]);
  const [table, setTable] = useState("");

  useEffect(() => {
    const selectedSheetChartMassage = [...sheets]
      .filter(f => f.id === activeSheet)[0]
      ?.charts.filter(f => f.id === activeChart)[0]
      ?.massageConfig?.keys.map(key => key.source);
    setMassageData(selectedSheetChartMassage);
  }, [sheets, activeSheet, activeChart, response]);

  const onResetClause = () => {
    setClause(initClause);
    setResponse([]);
    setErrorResponse({});
    setFile(prev => ({
      ...prev,
      id: null,
      name: "",
    }));
    setSourceValue([]);
  };

  const onSaveClick = () => {
    setSaveLoading(true);
    const formdata = new FormData();
    const newFile = {
      ...file,
      query: clause,
    };
    const blobFile = new Blob([JSON.stringify(newFile, null, 2)], {
      type: "application/json",
    });
    formdata.append("fileData", blobFile);
    apiInstance
      .post("workbook/saveDatasource", formdata)
      .then(({ data }) => {
        if (data.response !== null && data.response) {
          setFile(prev => ({
            ...prev,
            id: data.response,
          }));
          fetchSavedQueryList();
          userContext.renderToast({
            position: "bottom-center",
            message: intl.formatMessage({
              id: "transactionSavedSuccessfully",
              defaultMessage: "transactionSavedSuccessfully",
            }),
          });
        }
        if (data.response === null) {
          setShow(false);
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
      .catch(e => {
        console.log("bbb", e);
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

  const getPrimaryProperty = key => {
    const appIdRef = {
      banks: "bank_appId",
      credit_cards: "credit_card_appId",
      credit_card_transactions: "cc_appId",
      income_expense: "inc_exp_appId",
      income_expense_category: "inc_exp_cat_appId",
    };
    return appIdRef[key];
  };

  const onRunQuery = () => {
    setResponse([]);
    setErrorResponse({});
    setLoading(true);
    const formdata = new FormData();
    formdata.append("appIdWhere", `${payload.from}.${getPrimaryProperty(payload.from)} = '${userContext.userConfig.appId}'`);
    formdata.append("query", JSON.stringify(payload));
    apiInstance
      .post("workbook/fetchDynamicQuery", formdata)
      .then(({ data }) => {
        if (data.status) {
          setResponse(data.response);
        } else {
          setErrorResponse(data.response);
        }
      })
      .catch(() => {
        setResponse([]);
        setErrorResponse({ errorMessage: "Unknown error" });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const pay = {
      select: clause.select.map(({ query }) => query),
      from: clause.from,
      where: clause.where.map(({ row }) => row),
      join: clause.join.map(({ array }) => array),
      groupBy: clause.groupBy.map(({ data }) => data),
      having: clause?.having?.map(({ query }) => query),
      orderBy: clause.orderBy.map(({ row }) => row),
      limit: clause.limit,
    };
    setPayload(pay);
  }, [clause]);

  const tableView = data => {
    const heads = Object.keys(data[0]);
    return (
      <table className={`table table-sm table-${theme === "dark" ? "dark" : "white"} small`}>
        <thead style={{ position: "sticky", top: "-5px", zIndex: 1 }}>
          <tr>
            {heads.map((head, i) => (
              <th key={i} className='icon-bni text-truncate'>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='fw-light'>
          {data.map((t, i) => (
            <tr key={i}>
              {Object.entries(t).map((r, j) => (
                <td key={j} className='text-truncate'>
                  {r[1]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const onClickQueryList = (id, type) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("type", type);
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("workbook/fetchQueryObjectById", formdata)
      .then(({ data }) => {
        if (type === "saved") {
          setClause(JSON.parse(data.response.dsq_object));
          setFile(prev => ({
            ...prev,
            id: data.response.dsq_id,
            name: data.response.dsq_name,
          }));
        } else {
          setClause(JSON.parse(data.response.dsIbq_object));
          setFile(prev => ({
            ...prev,
            id: null,
            name: "",
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const onDeleteSavedQuery = () => {
    const formdata = new FormData();
    formdata.append("id", file.id);
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("workbook/deleteSavedQuery", formdata)
      .then(({ data }) => {
        if (data.response) {
          setSavedQueryList(prev => ({
            ...prev,
            saved: savedQueryList.saved.filter(f => String(f.dsq_id) !== String(file.id)),
          }));
          setFile(prev => ({
            ...prev,
            id: null,
            name: "",
          }));
          userContext.renderToast({
            position: "bottom-center",
            message: intl.formatMessage({
              id: "querySuccessfullyDeleted",
              defaultMessage: "querySuccessfullyDeleted",
            }),
          });
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
      .finally(() => document.body.click());
  };

  const confirmDeletePopover = () => (
    <Popover style={{ zIndex: 10000 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small>
          <FormattedMessage id='confirmDelete' defaultMessage='confirmDelete' />
        </small>
      </Popover.Header>
      <Popover.Body style={{ columnGap: "5px" }} className='p-1 d-flex align-items-center justify-content-between'>
        <button onClick={() => onDeleteSavedQuery()} className={`btn btn-sm btn-danger w-100 py-0`}>
          <FormattedMessage id='yes' defaultMessage='yes' />
        </button>
        <button onClick={() => document.body.click()} className={`btn btn-sm btn-secondary w-100 py-0`}>
          <FormattedMessage id='no' defaultMessage='no' />
        </button>
      </Popover.Body>
    </Popover>
  );
  const [isGoodToChart, setIsGoodToChart] = useState(false);
  const [sourceValue, setSourceValue] = useState([]);
  const mapRefs = useRef([]);
  const onMassageChangeHandle = async (source, value) => {
    setSourceValue(prev => [...prev, { from: value, to: source }]);
  };

  const onMassageSubmit = useCallback(() => {
    const newResponse = response.map(res => {
      let newRow = sourceValue
        .filter(sv => Object.keys(res).includes(sv.from))
        .map(m => [[m.to], isNaN(res[m.from]) ? res[m.from] : Number(res[m.from])]);
      newRow = Object.fromEntries(newRow);
      const removeObj = Object.keys(res).map(re => re);
      return _.omit({ ...res, ...newRow }, removeObj);
    });

    setResponse(newResponse);
    mapRefs.current.forEach(ref => {
      if (ref) {
        ref.value = "";
      }
    });
  }, [sourceValue]);

  useEffect(() => {
    if (sourceValue.length < 1 && response.length < 1) {
      setIsGoodToChart(false);
    }
    if (response.length > 0 && sourceValue.length > 0) {
      const toKeys = sourceValue.map(sv => sv.to);
      const responseKeys = Object.keys(response[0]);
      const isAllKeysGood = toKeys.map(to => responseKeys.includes(to)).every(t => t);
      setIsGoodToChart(isAllKeysGood);
    }
  }, [response, sourceValue]);

  useEffect(() => {
    mapRefs.current = [];
  }, [massageData]);

  const addToRefs = el => {
    if (el && !mapRefs.current.includes(el)) {
      mapRefs.current.push(el);
    }
  };

  return (
    <DSContext.Provider
      value={{
        clause,
        setClause,
        optionsConfig,
        tableDragging,
        setTableDragging,
        fieldDragging,
        setFieldDragging,
        response,
        setResponse,
        errorResponse,
        setErrorResponse,
        activeDataSource,
        setActiveDataSource,
        selectedWBFields,
        setSelectedWBFields,
        table,
        setTable,
      }}
    >
      <Modal show={show} onHide={() => setShow(false)} centered size='xl' backdrop='static' style={{ zIndex: 10000 }} fullscreen enforceFocus={false}>
        <Modal.Header closeButton className='py-2'>
          <Modal.Title as={"small"}>
            <i className='fa fa-database pe-2' />
            <FormattedMessage id='dataSource' defaultMessage='dataSource' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`p-2 ${theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}>
          <VerticalPanes
            theme={theme}
            style={{ height: "calc(100vh - 105px)" }}
            className={`border border-1 ${theme === "dark" ? "border-secondary" : ""} rounded`}
          >
            <Pane
              width={"20%"}
              className={`border border-1 ${theme === "dark" ? "border-secondary" : ""} border-start-0 border-top-0 border-bottom-0`}
            >
              <DSOptions config={optionsConfig} />
            </Pane>
            {activeDataSource === "MP" && (
              <Pane width={"20%"} className={`${theme === "dark" ? "border-secondary" : ""} border-top-0 border-bottom-0`}>
                <div className='border-0 rounded-0 w-100 border-0 bni-bg py-1 text-center text-dark small'>
                  <FormattedMessage id='fields' defaultMessage='fields' />
                </div>
                <div className=''>
                  {selectedWBFields?.length
                    ? selectedWBFields.map((sel, i) => (
                        <div
                          draggable={true}
                          className={`cursor-pointer p-1 small border-bottom ${theme === "dark" ? "border-secondary" : ""}`}
                          key={i}
                          onDrag={() =>
                            setFieldDragging({
                              source: ["select", "where", "groupBy", "having", "orderBy"],
                            })
                          }
                          onDragEnd={() => setFieldDragging({})}
                          onDragStart={e => {
                            e.dataTransfer.setData(
                              "text",
                              JSON.stringify({
                                source: ["select", "where", "groupBy", "having", "orderBy"],
                                data: `${table}.${sel}`,
                              }),
                            );
                          }}
                        >
                          {sel}
                        </div>
                      ))
                    : null}
                </div>
              </Pane>
            )}
            {activeDataSource === "MP" && (
              <Pane width={"30%"} className={`border border-1 ${theme === "dark" ? "border-secondary" : ""} border-top-0 border-bottom-0`}>
                <div className={`border-0 rounded-0 w-100 bni-bg py-1 text-center text-dark small`}>
                  <FormattedMessage id='clausesAndModifiers' defaultMessage='clausesAndModifiers' />
                </div>
                <div
                  className=''
                  style={{
                    height: "calc(100% - 32px)",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <DynamicClause targetKey='select' type='array' contextMenu={functions} showAlias={true} />
                  <DynamicClause targetKey='from' type='string' />
                  <DynamicClause targetKey='where' type='arrayOfObjects' suffixList={["AND", "OR"]} contextMenu={operators} />
                  <DynamicClause targetKey='join' type='relation' contextMenu={joinTypes} />
                  <DynamicClause targetKey='groupBy' type='array' />
                  <DynamicClause targetKey='having' type='array' contextMenu={csFunctions} showAlias={false} />
                  <DynamicClause targetKey='orderBy' type='arrayOfObjects' contextMenu={orderTypes} />
                  <DynamicClause targetKey='limit' type='range' contextMenu={limitTypes} />
                </div>
              </Pane>
            )}
            <Pane width={activeDataSource === "MP" ? "50%" : "80%"} className={`${theme === "dark" ? "border-secondary" : ""}`}>
              {activeDataSource === "MP" && (
                <div className='h-50'>
                  <div
                    style={{
                      borderRadius: "0px 5px 0px 0px",
                      columnGap: "5px",
                    }}
                    className='w-50 d-flex align-items-center justify-content-between border-0 w-100 border-0 bni-bg py-1 ps-2 pe-1 text-dark small'
                  >
                    <div className='input-group input-group-sm'>
                      <label htmlFor='fileName' className={`input-group-text btn btn-sm btn-secondary py-0`}>
                        <FormattedMessage id='query' defaultMessage='query' />
                      </label>
                      <input
                        type='text'
                        id='fileName'
                        className='form-control py-0'
                        placeholder={intl.formatMessage({
                          id: "name",
                          defaultMessage: "name",
                        })}
                        onChange={e =>
                          setFile(prev => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        value={file.name}
                        maxLength={25}
                      />
                      <button
                        className='btn btn-sm btn-secondary py-0'
                        disabled={!clause.from || saveLoading || !file.name}
                        onClick={() => onSaveClick()}
                      >
                        {saveLoading ? <i className='fa fa-circle-o-notch fa-spin' /> : <i className='fa fa-save' />}
                      </button>
                      <OverlayTrigger trigger='click' placement='bottom' overlay={confirmDeletePopover()} rootClose>
                        <button className='btn btn-sm btn-danger py-0 rounded-end-1' disabled={!file.id}>
                          <i className='fa fa-trash' />
                        </button>
                      </OverlayTrigger>

                      <ButtonGroup size='sm' className='ms-1'>
                        <Button variant='secondary' className='py-0' onClick={() => onResetClause()}>
                          <i className='fa fa-refresh pe-2' />
                          <FormattedMessage id='reset' defaultMessage='reset' />
                        </Button>
                        <Button
                          variant='secondary'
                          className='py-0'
                          onClick={() => onRunQuery()}
                          disabled={!(clause.from.length && clause.select.length) || loading}
                        >
                          <div className='d-flex align-items-center justify-content-center ' style={{ columnGap: "3px" }}>
                            <span>
                              <FormattedMessage id='run' defaultMessage='run' />
                            </span>
                            {!loading ? <i className='fa fa-share fa-rotate-180' /> : <i className='fa fa-circle-o-notch fa-spin'></i>}
                          </div>
                        </Button>
                        <Dropdown className='btn-group'>
                          <Dropdown.Toggle variant='secondary' className='btn-sm py-0'>
                            <i className='fa fa-quote-left pe-2' />
                            <FormattedMessage id='load' defaultMessage='load' />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className='overflow-auto' style={{ maxHeight: "300px" }}>
                            {savedQueryList?.saved?.length > 0 && [
                              savedQueryList.saved.map((list, i) => (
                                <Dropdown.Item
                                  key={i}
                                  as='div'
                                  className='d-flex align-items-center px-1 py-0 small cursor-pointer'
                                  onClick={() => onClickQueryList(list.dsq_id, "saved")}
                                >
                                  <i className='fa fa-quote-left text-success pe-2' />
                                  <div className='small'>{list.dsq_name}</div>
                                </Dropdown.Item>
                              )),
                              <Dropdown.Divider key={0} />,
                            ]}
                            <Dropdown.Item className='px-1 py-0 small cursor-pointer' as='div'>
                              <div className='fw-bold'>
                                <FormattedMessage id='inbuiltQueries' defaultMessage='inbuiltQueries' />
                              </div>
                            </Dropdown.Item>
                            {savedQueryList?.inbuilt?.length > 0 &&
                              savedQueryList.inbuilt.map((list, i) => (
                                <Dropdown.Item
                                  key={i}
                                  as='div'
                                  className='d-flex align-items-center px-1 py-0 small cursor-pointer'
                                  onClick={() => onClickQueryList(list.dsIbq_id, "inbuilt")}
                                >
                                  <i className='fa fa-quote-left text-danger pe-2' />
                                  <small>{list.dsIbq_name}</small>
                                </Dropdown.Item>
                              ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </ButtonGroup>
                    </div>
                  </div>
                  <div className='overflow-auto p-1' style={{ height: "calc(100% - 32px)" }}>
                    <pre>{JSON.stringify(payload, null, 2)}</pre>
                  </div>
                </div>
              )}
              <div className={activeDataSource === "MP" ? "h-50" : "h-100"}>
                <div
                  style={activeDataSource === "MP" ? {} : { borderTopRightRadius: "5px" }}
                  className='d-flex align-items-center justify-content-between border-0 w-100 border-0 bni-bg py-1 px-2 text-center text-dark small'
                >
                  <div>
                    <FormattedMessage id='data' defaultMessage='data' />
                  </div>
                  <div className='btn-group btn-group-sm'>
                    <button
                      type='button'
                      onClick={() => setDataView("json")}
                      className={`btn btn-secondary py-0 ${dataView === "json" ? "active" : ""}`}
                      dangerouslySetInnerHTML={{
                        __html: "&lcub;&nbsp;JSON&nbsp;&rcub;",
                      }}
                    ></button>
                    <button
                      type='button'
                      onClick={() => setDataView("table")}
                      className={`btn btn-secondary py-0 ${dataView === "table" ? "active" : ""}`}
                    >
                      <i className='fa fa-table pe-2' />
                      <FormattedMessage id='grid' defaultMessage='grid' />
                    </button>
                  </div>
                  <div>
                    {!loading ? (
                      <span>
                        <span className='px-1'>{response?.length ? response?.length : 0}</span>
                        <FormattedMessage id='recordsFound' defaultMessage='recordsFound' />
                      </span>
                    ) : (
                      <i className='fa fa-circle-o-notch fa-spin'></i>
                    )}
                  </div>
                </div>
                <div className='d-flex overflow-auto overflow-x-hidden p-1' style={{ height: "calc(100% - 32px)" }}>
                  <Col md={8}>
                    {((response && response?.length > 0) || response === null) &&
                      (dataView === "json" ? <pre className='small'>{response && JSON.stringify(response, null, 2)}</pre> : tableView(response))}
                    {Object.keys(errorResponse).length > 0 && <pre className='text-danger'>{JSON.stringify(errorResponse, null, 2)}</pre>}
                  </Col>
                  {response.length > 0 && massageData && massageData.length > 0 && (
                    <Col md={4} className='position-sticky top-0 px-2'>
                      <div className='small py-2 my-2 badge bg-secondary w-100'>
                        <FormattedMessage id='mapFieldsToChart' defaultMessage='mapFieldsToChart' />
                      </div>
                      <Row className='small align-items-center mb-1'>
                        {massageData &&
                          massageData.length > 0 &&
                          massageData.map((sel, i) => (
                            <React.Fragment key={i}>
                              <Col xs={4}>{sel}</Col>
                              <Col xs={2}>
                                <i className='fa fa-angle-double-right icon-bni fa-2x' />
                              </Col>
                              <Col xs={6}>
                                <Form.Select
                                  ref={addToRefs}
                                  size='sm'
                                  defaultValue={""}
                                  className='mb-1 lh-1'
                                  onChange={e => onMassageChangeHandle(sel, e.target.value)}
                                >
                                  <option value={""}>--</option>
                                  {_.difference(Object.keys(response[0]), massageData).map((res, j) => (
                                    <option key={j} value={res} className='small'>
                                      {res}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
                            </React.Fragment>
                          ))}
                      </Row>
                      <Button onClick={() => onMassageSubmit()} size='sm' className='small btn-bni pull-right'>
                        <FormattedMessage id='update' defaultMessage='update' />
                      </Button>
                    </Col>
                  )}
                </div>
              </div>
            </Pane>
          </VerticalPanes>
        </Modal.Body>
        <Modal.Footer
          className={`border-1 rounded-bottom py-1 px-1 ${theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white text-dark"}`}
        >
          <button
            className='btn btn-bni btn-sm'
            disabled={!isGoodToChart}
            onClick={() => {
              const newSheet = sheets.map(sheet => {
                if (sheet.id === activeSheet) {
                  sheet.charts = sheet.charts.map(chart => {
                    if (chart.id === activeChart) {
                      chart.props.data = response;
                    }
                    return chart;
                  });
                }
                return sheet;
              });
              setSheets(newSheet);
              setShow(false);
            }}
          >
            <i className='fa fa-arrow-circle-down pe-2' />
            <FormattedMessage id='import' defaultMessage='import' />
          </button>
        </Modal.Footer>
      </Modal>
      <div className=''>
        {!response?.length ? (
          <div
            onClick={() => setShow(!show)}
            className='p-5 cursor-pointer bni-border bni-border-all bni-border-all-1 rounded-3 icon-bni d-flex align-items-center justify-content-center'
          >
            <FormattedMessage id='clickToLoadData' defaultMessage='clickToLoadData' />
          </div>
        ) : (
          <div onClick={() => setShow(!show)}>
            <div className='py-1 small text-end'>
              <span className='px-1'>{response.length}</span>
              <FormattedMessage id='recordsImported' defaultMessage='recordsImported' />
            </div>
            <div
              style={{ zoom: "0.5", overflow: "hidden" }}
              className='p-1 cursor-pointer bni-border bni-border-all bni-border-all-1 rounded-3 icon-bni'
            >
              {tableView(response.slice(0, 5))}
              <i className='pe-3 pull-right fa fa-ellipsis-h icon-bni' />
            </div>
          </div>
        )}
      </div>
    </DSContext.Provider>
  );
};

export default DataSource;
