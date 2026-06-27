/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useContext } from "react";
import useAxios from "../../../services/apiServices";
import FormElement from "./FormElement";
import Loader from "../../resuable/Loader";
import helpers from "../../../helpers";
import Pagination from "./Pagination";
import HtmlIcon from "./FormElements/HtmlIcon";
import GroupElement from "./FormElements/GroupElement";
import { useIntl, FormattedMessage, injectIntl } from "react-intl";
import _debounce from "lodash/debounce";
import { useNetworkStatus } from "../../../hooks/useNetworkStatus";
import { db } from "../../../services/indexedDb";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { UserContext } from "../../../contexts/UserContext";
import _ from "lodash";

function BackendCore(props) {
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const intl = useIntl();
  const tenantId = props.tenantId;
  const Table = props.Table;
  const config = props.config;
  const className = props.className || "";
  const id = props.id || "";
  const TableRows = props.TableRows || "MyTable";
  const TableAliasRows = props.TableAliasRows || [];
  const postApiUrl = props.postApiUrl;
  const onPostApi = props.onPostApi;
  const insertCloneData = props.insertCloneData || [];
  const showTooltipFor = props.showTooltipFor || [];
  const defaultValues = props.defaultValues || [];
  const onTableUpdate = props.onTableUpdate;
  const eventListener = props.eventListener;
  const onReFetchData = props.onReFetchData;
  const apiParams = props.apiParams;
  const onChangeParams = props.onChangeParams;
  const cellWidth = props.cellWidth || "13rem";
  const theme = props.theme;
  const rowLimitOptions = [10, 25, 50, 100];
  const [rowElements, setRowElements] = useState([]);
  const [dbData, setDbData] = useState(props.dbData.table);
  const [deleteData, setDeleteData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [updatedIds, setUpdatedIds] = useState([]);
  const [sortType, setSortType] = useState({});
  const [tableConfigErrors, setTableConfigErrors] = useState([]);
  const pagination =
    config && config.footer && config.footer.pagination && Object.keys(config.footer.pagination).length > 0 && config.footer.pagination;
  const cTotal = config && config.footer && config.footer.total;
  const ajaxType = props.ajaxType || "post";
  const ajaxButtonName = props.ajaxButtonName || "Submit";

  const [recordsPerPage, setRecordsPerPage] = useState(apiParams?.limit);
  const [currentPage, setCurrentPage] = useState(props.dbData.page);
  const maxPagesToShow = pagination && pagination.maxPagesToShow;
  const { isOnline, isNavigatorSupport } = useNetworkStatus();

  const createElementPromise = () => {
    const rows = props.rowElements.map(row => {
      return new Promise(resolve => {
        resolve(row);
      });
    });
    return rows;
  };

  const runAllApis = callBack => {
    setLoader(true);
    const a = createElementPromise();
    Promise.all([a]).then(async array => {
      await Promise.all(array[0]).then(a => {
        setRowElements(a);
        setLoader(false);
      });
      typeof callBack === "function" && callBack();
    });
  };

  useEffect(() => {
    const array = [];
    if (TableAliasRows.length !== TableRows.length) {
      array.push({
        error: `The "TableAliasRows" and "TableRows" props array length should be same.`,
      });
    }
    if (!Table || Table.toString().length === 0 || Table === "") {
      array.push({
        error: `The "Table" props should be a valid string.`,
      });
    }
    if (postApiUrl && !["put", "post", "delete", "patch", "request", "get", "head", "options"].includes(ajaxType)) {
      array.push({
        error: `Allowed XHR request types are put, post, delete, patch, request, get, head, options. Please use any one in ajaxType props. For further info, visit https://www.npmjs.com/package/axios`,
      });
    }
    array.length > 0 && setTableConfigErrors(array);
    return () => {};
  }, []);

  useEffect(() => {
    runAllApis();
  }, [TableRows, Table, props.rowElements]);

  useEffect(() => {
    if (props?.rowElements?.length > 0) {
      setRowElements(props?.rowElements);
    }
  }, [props]);

  useEffect(() => {
    if (props.dbData.table?.length > 0) {
      setDbData(props?.dbData?.table);
    }
  }, [props.dbData.table]);

  useEffect(() => {
    if (insertCloneData && insertCloneData.length > 0) {
      setLoader(true);
      const newDbData = [...insertCloneData, ...dbData];
      setDbData(newDbData);
      setTimeout(() => {
        setLoader(false);
      }, 500);
    }
  }, [insertCloneData]);

  const updateDbData = (index, data, primaryKey, event) => {
    // if data is empty set defaults
    if (!data) {
      const fIndex = TableRows.findIndex(f => f === index.j);
      if (fIndex > -1 && rowElements[fIndex]) {
        const colType = rowElements[fIndex];
        data = colType === "number" ? "0.00" : "";
      }
    }
    // update DB data
    const { i, j } = index;
    dbData[i][j] = data;
    setDbData(dbData);
    // update changed rows
    const id = dbData.filter((db, ind) => ind === i && db)[0][primaryKey] || "";
    let array = id ? [...updatedIds, id] : [...updatedIds];
    array = [...new Set(array)];
    setUpdatedIds(array);
    // update row if value changed
    onTableUpdate && onTableUpdate(dbData);
    // capture event listener
    eventListener && eventListener({ index, data, primaryKey, dbData, event });
  };

  const onAddRow = bool => {
    if (bool) {
      const obj = {};
      TableRows.map(t => {
        const dIndex = defaultValues.findIndex(d => Object.keys(d)[0] === t);
        obj[t] = dIndex > -1 ? defaultValues[dIndex][t] : "";
        return null;
      });
      const backup = [...dbData];
      backup.push({ ...obj, localId: uuidv4() });
      setDbData(backup);
    }
  };

  useEffect(() => {
    const fetchOnline = () => {
      setDbData(prevRows => prevRows.filter(f => !f.localId).map(({ isSync, ...rest }) => rest));
    };

    const fetchOffline = async () => {
      let offLineInsert = await db.syncQueue.where("[status+entity+type]").equals(["PENDING", Table, "INSERT"]).limit(500).toArray();
      offLineInsert = offLineInsert.map(d => d.payload).flat();
      let offLineUpdate = await db.syncQueue.where("[status+entity+type]").equals(["PENDING", Table, "UPDATE"]).limit(500).toArray();
      offLineUpdate = offLineUpdate.map(d => d.payload).flat();

      if (offLineUpdate.length > 0) {
        setDbData(prevRows => {
          const updateMap = new Map(offLineUpdate.map(item => [item[TableRows[0]], { ...item, isSync: false }]));
          return prevRows.map(row => ({
            ...row,
            ...(updateMap.get(row[TableRows[0]]) || {}),
          }));
        });
      }

      if (offLineInsert.length > 0) {
        setDbData(prevRows => [...prevRows, ...offLineInsert.map(d => ({ ...d, isSync: false }))]);
      }
    };
    if (!isOnline) {
      fetchOffline();
    } else {
      fetchOnline();
    }
  }, [isOnline]);

  const loopInsertDb = async (data, type, pk, cb) => {
    if (!Array.isArray(data) || data.length === 0) return;
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    const where = type === "INSERT" ? "localId" : "serverId";
    try {
      for (const element of data) {
        const serverId = type === "DELETE" ? element : element[pk];
        const localId = element.localId;
        const equals = type === "INSERT" ? localId : serverId;
        const object = {
          status: "PENDING",
          type,
          entity: Table,
          apiUrl: postApiUrl,
          localId,
          serverId,
          payload: [element],
          retryCount: 0,
          error: null,
          createdAt: now,
          updatedAt: now,
        };
        const item = await db.syncQueue.where(where).equals(equals).toArray();
        if (item && item.length > 0) {
          await db.syncQueue.update(item[0].id, _.omit(object, "createdAt")).then(() => {
            typeof cb === "function" && cb({ localId, serverId });
          });
        } else {
          await db.syncQueue.add(object).then(() => {
            typeof cb === "function" && cb({ localId, serverId });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveToIndexedDB = async (payload, cb) => {
    const { insertData, deleteData, updateData } = payload;
    if (updateData && updateData.length > 0) {
      await loopInsertDb(updateData, "UPDATE", TableRows[0], ({ localId, serverId }) => {
        const newData = dbData.map(d => {
          if (d[TableRows[0]] === serverId) {
            d.localId = localId;
            d.isSync = false;
          }
          return d;
        });
        setDbData(newData);
      });
    }
    if (insertData && insertData.length > 0) {
      await loopInsertDb(insertData, "INSERT", TableRows[0], ({ localId }) => {
        const newData = dbData.map(d => {
          if (d.localId === localId) {
            d.isSync = false;
          }
          return d;
        });
        setDbData(newData);
      });
    }
    if (deleteData && deleteData.length > 0) {
      await loopInsertDb(deleteData, "DELETE", TableRows[0]);
    }
    typeof cb === "function" && cb();
  };

  const submitData = () => {
    let insertData = dbData
      .filter(d => d[TableRows[0]] === "" || d[TableRows[0]] === null)
      .map(d => {
        if (d[TableRows[0]] === "") {
          d[TableRows[0]] = null;
        }
        return d;
      });

    let updateData = dbData
      .filter(d => updatedIds.includes(d[TableRows[0]]))
      .filter(d => d && (typeof d[TableRows[0]] === "number" || typeof d[TableRows[0]] === "string"));

    const postData = {
      ...((insertData.length > 0 || deleteData.length > 0 || updateData.length > 0) && { Table }),
      ...(insertData.length > 0 && { insertData }),
      ...(deleteData.length > 0 && { deleteData }),
      ...(updateData.length > 0 && { updateData }),
    };

    if (!isOnline) {
      saveToIndexedDB(postData, () => {
        userContext.renderToast({
          type: "warning",
          position: "bottom-center",
          message: intl.formatMessage({
            id: "offlineDataSaved",
            defaultMessage: "offlineDataSaved",
          }),
        });
      });
    } else if (isOnline) {
      setBtnLoader(true);
      const formdata = new FormData();
      const serverPostData = {
        ...((insertData.length > 0 || deleteData.length > 0 || updateData.length > 0) && { Table }),
        ...(insertData.length > 0 && { insertData: insertData.map(({ isSync, localId, ...rest }) => rest) }),
        ...(deleteData.length > 0 && { deleteData }),
        ...(updateData.length > 0 && { updateData: updateData.map(({ isSync, localId, ...rest }) => rest) }),
      };
      formdata.append("postData", JSON.stringify(serverPostData));
      formdata.append("tenantId", tenantId);

      apiInstance[ajaxType](postApiUrl, formdata)
        .then(response => {
          onPostApi && onPostApi(response);
          if (insertData.length > 0 || updateData.length > 0 || deleteData.length > 0) {
            setLoader(true);
            setTimeout(() => {
              onReFetchData(true);
              setLoader(false);
            }, 1000);
          }
        })
        .catch(error => {
          onPostApi && onPostApi({ error, status: false });
        })
        .finally(() => {
          setDeleteData([]);
          setUpdatedIds([]);
          setBtnLoader(false);
          updateData = [];
          insertData = [];
          eventListener &&
            eventListener({ index: null, data: null, primaryKey: null, dbData: serverPostData, event: "onSubmit", type: "postSuccess" });
        });
    }
  };

  const getColumnTotal = key => {
    let total = "";
    if (Object.prototype.hasOwnProperty.call(props.dbData.total, key)) {
      total = props.dbData.total[key].map((t, i) => (
        <div key={i} className='my-1'>
          <span className={`${t.className}`}>
            {t?.prefix} {cTotal && helpers.countryCurrencyLacSeperator(cTotal.locale, cTotal.currency, t.value, cTotal.maxDecimal)} {t?.suffix}
          </span>
        </div>
      ));
    }
    return total;
  };

  const onSort = key => {
    let findType = dbData?.map(db => {
      if (
        db[key] &&
        (db[key].toString().indexOf("-") > -1 || db[key].toString().indexOf("/") > -1) &&
        new Date(String(db[key]).replace(/-/g, "/")).toString() !== "Invalid Date"
      ) {
        return "date";
      }
      if (db[key] !== "" && !isNaN(db[key])) {
        return "number";
      }
      return "string";
    });

    findType = findType.sort((a, b) => findType.filter(v => v === a).length - findType.filter(v => v === b).length).pop();

    let filteredDbData = [];
    if (findType === "date") {
      filteredDbData = onSortByDate(key);
    }
    if (findType === "number") {
      filteredDbData = onSortByNumber(key);
    }
    if (findType === "string") {
      filteredDbData = onSortByString(key);
    }
    setDbData([...filteredDbData]);

    setSortType(prevState => ({
      asc: !prevState.asc,
      key,
    }));
  };

  const onSortByNumber = key => {
    return dbData.sort((a, b) => {
      return sortType.asc ? b[key] - a[key] : a[key] - b[key];
    });
  };

  const onSortByDate = key => {
    return dbData.sort((a, b) => {
      return sortType.asc ? new Date(b[key]) - new Date(a[key]) : new Date(a[key]) - new Date(b[key]);
    });
  };

  const onSortByString = key => {
    return dbData.sort((a, b) => {
      return sortType.asc ? (b[key] > a[key]) - (b[key] < a[key]) : (a[key] > b[key]) - (a[key] < b[key]);
    });
  };

  const onDelete = index => {
    const { i } = index;

    const validId = dbData[i] && dbData[i][TableRows[0]];
    if (validId && validId !== undefined) {
      deleteData.push(validId);
      setDeleteData(deleteData);
    }

    const filtered = dbData.filter((d, di) => di !== i);
    setDbData(filtered);
    onTableUpdate && onTableUpdate(filtered);
  };

  const onSearch = useCallback(
    _debounce(text => {
      onChangeParams({ start: 0, searchString: text });
    }, 500),
    [],
  );

  const getPageCounts = () => {
    return intl.formatMessage(
      { id: "recordsLengthLine", defaultMessage: "recordsLengthLine" },
      {
        start: props.dbData.rangeStart,
        end: props.dbData.rangeEnd,
        length: props.dbData.numRows,
      },
    );
  };

  return loader === false ? (
    <div className={`react-responsive-ajax-data-table ${className}`} id={id}>
      {tableConfigErrors.length === 0 ? (
        <>
          {pagination && (
            <div className={`biGrid`}>
              {props.dbData.rangeStart && props.dbData.rangeEnd && props.dbData.numRows ? (
                <div>
                  <div className='heading' title={getPageCounts()}>
                    {getPageCounts()}
                  </div>
                </div>
              ) : (
                <div />
              )}
              {config?.header?.searchable && (
                <div>
                  <GroupElement
                    theme={theme}
                    config={config}
                    options={rowLimitOptions}
                    searchString={apiParams?.searchString}
                    defaultRecordsPerPage={apiParams?.limit}
                    onSearchChange={v => onSearch(v)}
                    onDropDownChange={count => {
                      setRecordsPerPage(count);
                      onChangeParams({ start: 0, limit: count });
                    }}
                    onDismissSearch={() => onSearch("")}
                  />
                </div>
              )}
            </div>
          )}
          <div className='grid-responsive'>
            <div
              style={{
                ...(Array.isArray(cellWidth) && {
                  gridTemplateColumns: `${cellWidth.join("rem ") + "rem"}`,
                }),
                ...(typeof cellWidth === "string" && {
                  gridTemplateColumns: `repeat(${TableRows.length}, ${cellWidth})`,
                }),
              }}
              className={`grid-container responsive-grid`}
            >
              {TableAliasRows.map((heading, i) => (
                <div key={`key-${i}`} onClick={() => onSort(TableRows[i])} className='header'>
                  {i > 0 || !postApiUrl ? (
                    <>
                      <span title={heading} className={`badge bni-bg text-dark text-nowrap`}>
                        {heading}
                      </span>{" "}
                      {TableRows[i] === sortType.key && <HtmlIcon className='default' entity={sortType.asc ? "&#8593;" : "&#8595;"} />}
                    </>
                  ) : (
                    <HtmlIcon className='default' entity={"&#9776;"} />
                  )}
                </div>
              ))}
              {dbData?.length > 0 ? (
                <>
                  {dbData.map((d, i) =>
                    TableRows.map((r, j) => (
                      <div key={`${d[r]}-${j}`} className={Object.hasOwn(d, "isSync") && !d.isSync ? "opacity-50" : ""}>
                        {
                          <div
                            {...(showTooltipFor.includes(r) && {
                              className: "tooltipContainer",
                            })}
                          >
                            {d[r] !== "" && showTooltipFor.includes(r) && <span className='tooltips'>{d[r]}</span>}
                            <FormElement
                              key={`${i}-${j}`}
                              config={config}
                              onDelete={index => onDelete(index)}
                              onChange={(index, data, primaryKey, event) => {
                                updateDbData(index, data, primaryKey, event);
                              }}
                              index={{ i, j: r }}
                              placeholder={TableAliasRows[j]}
                              value={d[r]}
                              row={d}
                              element={rowElements[j]}
                              showIncrement={dbData.length - 1 === i}
                              showDecrement={true}
                              onAddRow={bool => onAddRow(bool)}
                              primaryKey={TableRows[0]}
                              isPostable={Boolean(postApiUrl)}
                              theme={theme}
                            />
                          </div>
                        }
                      </div>
                    )),
                  )}
                  {props?.dbData?.total && (
                    <>
                      <div className='textCenter'>{cTotal.title}</div>
                      {TableRows.slice(1).map((r, i) => {
                        const isTotalColumn = Object.prototype.hasOwnProperty.call(props?.dbData?.total, r);
                        return (
                          <div className={isTotalColumn ? "totalColumn" : ""} key={i}>
                            {isTotalColumn ? getColumnTotal(r) : ""}
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <>
                  <FormElement
                    key={-1}
                    index={{ i: 0, j: 0 }}
                    element={rowElements[0]}
                    showIncrement={true}
                    showDecrement={false}
                    onAddRow={bool => onAddRow(bool)}
                  />
                  <div className='py-3 text-center' style={{ gridColumn: `1 / span ${TableRows.length}` }}>
                    <i className='fa fa-archive fa-5x d-block' />
                    <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='footer'>
            {pagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(props.dbData.numRows / recordsPerPage)}
                onSetPage={page => {
                  setCurrentPage(page);
                  onChangeParams({ start: (page - 1) * recordsPerPage });
                }}
                maxPagesToShow={maxPagesToShow}
              />
            )}
            {postApiUrl && (
              <div className='py-2 text-end'>
                <button onClick={() => submitData()} disabled={btnLoader} className='btn btn-bni'>
                  {btnLoader ? <i className='fa fa-circle-o-notch fa-spin fa-fw' /> : <>{ajaxButtonName}</>}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='errorWrapper'>
          <h5>Please resolve the following issues:</h5>
          <ol>
            {tableConfigErrors.map((table, i) => (
              <li key={i}>{table.error}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  ) : (
    <div className='relativeSpinner'>
      <Loader />
    </div>
  );
}

export default injectIntl(BackendCore);
