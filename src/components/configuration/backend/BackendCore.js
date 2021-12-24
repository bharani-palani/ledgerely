import React, { useState, useEffect } from "react";
import apiInstance from "../../../services/apiServices";
import FormElement from "./FormElement";
import Loader from "react-loader-spinner";
import helpers from "../../../helpers";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import HtmlIcon from "./FormElements/HtmlIcon";
import GroupElement from "./FormElements/GroupElement";
import "./backendUpdate.scss";

function BackendCore(props) {
  const Table = props.Table;
  const config = props.config;
  const className = props.className || "";
  const TableRows = props.TableRows;
  const TableAliasRows = props.TableAliasRows;
  const postApiUrl = props.postApiUrl;
  const onPostApi = props.onPostApi;
  const showTotal = props.showTotal;
  const rowKeyUp = props.rowKeyUp;
  const insertCloneData = props.insertCloneData;
  const showTooltipFor = props.showTooltipFor;
  const defaultValues = props.defaultValues;
  const onTableUpdate = props.onTableUpdate;
  const onReFetchData = props.onReFetchData;
  const cellWidth = props.cellWidth;
  const [rowElements, setRowElements] = useState([]);
  const [dbData, setDbData] = useState(props.dbData);
  const dbDataBackup = [...props.dbData];
  const [deleteData, setDeleteData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [updatedIds, setUpdatedIds] = useState([]);
  const [sortType, setSortType] = useState({});
  const [tableConfigErrors, setTableConfigErrors] = useState([]);
  const pagination =
    config &&
    config.footer &&
    config.footer.pagination &&
    Object.keys(config.footer.pagination).length > 0 &&
    config.footer.pagination;
  const cTotal = config && config.footer && config.footer.total;
  const ajaxType = props.ajaxType;
  const ajaxButtonName = props.ajaxButtonName;

  const [recordsPerPage, setRecordsPerPage] = useState(
    pagination && pagination.recordsPerPage
  );
  const defaultRecordsPerPage = pagination && pagination.recordsPerPage;
  const [currentPage, setCurrentPage] = useState(
    Math.ceil(dbData.length / recordsPerPage)
  );
  const maxPagesToShow = pagination && pagination.maxPagesToShow;

  const createElementPromise = () => {
    const rows = props.rowElements.map(row => {
      return new Promise((resolve, reject) => {
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
    let array = [];
    if (TableAliasRows.length !== TableRows.length) {
      array.push({
        error: `The "TableAliasRows" and "TableRows" props array length should be same.`
      });
    }
    if (!Table || Table.toString().length === 0 || Table === "") {
      array.push({
        error: `The "Table" props should be a valid string.`
      });
    }
    if (
      postApiUrl &&
      ![
        "put",
        "post",
        "delete",
        "patch",
        "request",
        "get",
        "head",
        "options"
      ].includes(ajaxType)
    ) {
      array.push({
        error: `Allowed XHR request types are put, post, delete, patch, request, get, head, options. Please use any one in ajaxType props. For further info, visit https://www.npmjs.com/package/axios`
      });
    }
    array.length > 0 && setTableConfigErrors(array);
    // componentwillunmount
    return () => {};
  }, []);

  useEffect(() => {
    runAllApis();
  }, [TableRows, Table, props.rowElements]);

  useEffect(() => {
    if (dbData.length > 0) {
      setDbData(dbData);
    }
  }, [props.dbData]);

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

  const updateDbData = (index, data, primaryKey) => {
    // update DB data
    const { i, j } = index;
    dbData[i][j] = data;
    setDbData(dbData);
    // update changed rows
    let id = dbData.filter((db, ind) => ind === i && db)[0][primaryKey] || "";
    let array = id ? [...updatedIds, id] : [...updatedIds];
    array = [...new Set(array)];
    setUpdatedIds(array);
    // update row if value changed
    if (rowKeyUp) {
      let [declare, operands] = rowKeyUp.split("=");
      if (declare && operands) {
        const newDbData = dbData.map(row => {
          row[declare] = eval(operands);
          return row;
        });
        setDbData(newDbData);
        onTableUpdate && onTableUpdate(newDbData);
      }
    }
    onTableUpdate && onTableUpdate(dbData);
  };

  const onAddRow = bool => {
    if (bool) {
      const obj = {};
      TableRows.map((t, i) => {
        let dIndex = defaultValues.findIndex(d => Object.keys(d)[0] === t);
        obj[t] = dIndex > -1 ? defaultValues[dIndex][t] : "";
        return null;
      });
      let backup = [...dbData];
      backup.push(obj);
      setDbData(backup);
    }
  };

  const submitData = () => {
    setBtnLoader(true);
    let insertData = dbData.filter(d => d[TableRows[0]] === "");
    let updateData = dbData
      .filter(d => updatedIds.includes(d[TableRows[0]]))
      .filter(d => d && (typeof d[TableRows[0]] === "number" || typeof d[TableRows[0]] === "string"));
    let postData = {
      ...((insertData.length > 0 ||
        deleteData.length > 0 ||
        updateData.length > 0) && { Table }),
      ...(insertData.length > 0 && { insertData }),
      ...(deleteData.length > 0 && { deleteData }),
      ...(updateData.length > 0 && { updateData })
    };
    const formdata = new FormData();
    formdata.append("postData", JSON.stringify(postData));

    apiInstance[ajaxType](postApiUrl, formdata)
      .then(response => {
        onPostApi && onPostApi(response);
        if (insertData.length > 0) {
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
        updateData=[];
        insertData=[];
        // console.log("bbb", { deleteData, updatedIds, insertData });
      });
  };

  const getColumnTotal = key => {
    let total = "";
    if (showTotal.length > 0) {
      showTotal.forEach((show, i) => {
        if (typeof show === "string" && String(show) === String(key)) {
          total = dbData.reduce((a, b) => Number(a) + Number(b[key]), 0);
          total =
            cTotal &&
            helpers.countryCurrencyLacSeperator(
              cTotal.locale,
              cTotal.currency,
              total,
              cTotal.maxDecimal
            );
        } else if (typeof show === "object" && show.whichKey === String(key)) {
          let totArrays = [];
          total = [show]
            .map(f => {
              return f.forValue.map((v, i) => {
                const number = dbData
                  .filter(db => db[f.forKey] === v)
                  .reduce((a, b) => Number(a) + Number(b[key]), 0);
                totArrays.push(number);
                return (
                  <div key={i}>
                    {cTotal &&
                      helpers.countryCurrencyLacSeperator(
                        cTotal.locale,
                        cTotal.currency,
                        number,
                        cTotal.maxDecimal
                      )}
                    {` (${v})`}
                  </div>
                );
              });
            })
            .concat(
              show.showDifference && show.showDifference.indexes.length === 2 && (
                <div
                  key={`totRow-${i}`}
                  className={checkSettlement(
                    Number(totArrays[show.showDifference.indexes[0]]).toFixed(
                      2
                    ) -
                      Number(totArrays[show.showDifference.indexes[1]]).toFixed(
                        2
                      )
                  )}
                >
                  {cTotal &&
                    helpers.countryCurrencyLacSeperator(
                      cTotal.locale,
                      cTotal.currency,
                      Number(totArrays[show.showDifference.indexes[0]]).toFixed(
                        2
                      ) -
                        Number(
                          totArrays[show.showDifference.indexes[1]]
                        ).toFixed(2),
                      cTotal.maxDecimal
                    )}
                  &nbsp;
                  {show.showDifference.showStability &&
                    checkSettlementString(
                      Number(totArrays[show.showDifference.indexes[0]]).toFixed(
                        2
                      ) -
                        Number(
                          totArrays[show.showDifference.indexes[1]]
                        ).toFixed(2)
                    )}
                </div>
              )
            );
        }
      });
    }
    return total;
  };
  const checkSettlement = number => {
    // return number === 0 ? "txtSuccess" : "txtError";
    if (number === 0) {
      return "txtSuccess";
    }
    if (number > 0) {
      return "txtError";
    }
    if (number < 0) {
      return "txtWarning";
    }
  };
  const checkSettlementString = number => {
    if (number === 0) {
      return (
        <span>
          (
          {cTotal &&
            cTotal.doubleEntryBalanceStrings &&
            cTotal.doubleEntryBalanceStrings.zero}
          )
        </span>
      );
    } else if (number < 0) {
      return (
        <span>
          (
          {cTotal &&
            cTotal.doubleEntryBalanceStrings &&
            cTotal.doubleEntryBalanceStrings.plus}
          )
        </span>
      );
    } else if (number > 0) {
      return (
        <span>
          (
          {cTotal &&
            cTotal.doubleEntryBalanceStrings &&
            cTotal.doubleEntryBalanceStrings.minus}
          )
        </span>
      );
    }
  };
  const onSort = key => {
    let findType = dbData.map(db => {
      if (
        db[key] &&
        (db[key].toString().indexOf("-") > -1 ||
          db[key].toString().indexOf("/") > -1) &&
        new Date(String(db[key]).replace(/-/g, "/")) !== "Invalid Date"
      ) {
        return "date";
      }
      if (db[key] !== "" && !isNaN(db[key])) {
        return "number";
      }
      return "string";
    });

    findType = findType
      .sort(
        (a, b) =>
          findType.filter(v => v === a).length -
          findType.filter(v => v === b).length
      )
      .pop();

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
      key
    }));
  };

  const onSortByNumber = key => {
    return dbData.sort((a, b) => {
      return sortType.asc ? b[key] - a[key] : a[key] - b[key];
    });
  };

  const onSortByDate = key => {
    return dbData.sort((a, b) => {
      return sortType.asc
        ? new Date(b[key]) - new Date(a[key])
        : new Date(a[key]) - new Date(b[key]);
    });
  };

  const onSortByString = key => {
    return dbData.sort((a, b) => {
      return sortType.asc
        ? (b[key] > a[key]) - (b[key] < a[key])
        : (a[key] > b[key]) - (a[key] < b[key]);
    });
  };
  const onSetCurrentPage = page => {
    setCurrentPage(page);
  };

  const showHideRows = i => {
    const first = (currentPage - 1) * recordsPerPage;
    const second = currentPage * recordsPerPage - 1;
    return i >= first && i <= second ? "show" : "hide";
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

  const onSearch = text => {
    const conditions = [];
    TableRows.map(t =>
      conditions.push(item =>
        item[t]
          .toString()
          .toLowerCase()
          .includes(text.toString().toLowerCase())
      )
    );
    const filtered = dbDataBackup.filter(f => {
      return (
        conditions.some(c => c(f)) && !deleteData.includes(f[TableRows[0]])
      );
    });
    setDbData([...filtered]);
  };

  const onRecordsChange = count => {
    setRecordsPerPage(count);
  };

  const getPageCounts = () => {
    let start = (currentPage - 1) * recordsPerPage + 1;
    start = start > 0 ? start : 0;
    const end =
      dbData.length >= currentPage * recordsPerPage
        ? currentPage * recordsPerPage
        : dbData.length;
    const plurals = dbData.length > 1 ? "s" : "";
    return `${start} to ${end} of ${
      dbData ? dbData.length : 0
    } record${plurals}`;
  };

  return loader === false ? (
    <div className={`react-responsive-ajax-data-table ${className}`}>
      {tableConfigErrors.length === 0 ? (
        <>
          {pagination && (
            <div className="biGrid">
              <div>
                <div className="heading" title={getPageCounts()}>
                  {getPageCounts()}
                </div>
              </div>
              <div>
                <GroupElement
                  defaultRecordsPerPage={defaultRecordsPerPage}
                  onSearchChange={v => onSearch(v)}
                  onDropDownChange={count => onRecordsChange(count)}
                  onDismissSearch={() => onSearch("")}
                />
              </div>
            </div>
          )}
          <div className="grid-responsive">
            <div
              style={{
                ...(postApiUrl && {
                  gridTemplateColumns: `50px repeat(${TableRows.length - 1}, ${cellWidth})`
                }),
                ...(!postApiUrl && {
                  gridTemplateColumns: `repeat(${TableRows.length}, ${cellWidth})`
                })
              }}
              className={`grid-container responsive-grid`}
            >
              {TableAliasRows.map((heading, i) => (
                <div
                  key={`key-${i}`}
                  onClick={() => onSort(TableRows[i])}
                  className="header"
                >
                  {i > 0 || !postApiUrl ? (
                    <>
                      <span title={heading}>{heading}</span>{" "}
                      {TableRows[i] === sortType.key && (
                        <HtmlIcon
                          className="default"
                          entity={sortType.asc ? "&#8593;" : "&#8595;"}
                        />
                      )}
                    </>
                  ) : (
                    <HtmlIcon className="default" entity={"&#9776;"} />
                  )}
                </div>
              ))}
              {dbData.length > 0 ? (
                <>
                  {dbData.map((d, i) =>
                    TableRows.map((r, j) => (
                      <div
                        key={`${d[r]}-${j}`}
                        className={`${pagination ? showHideRows(i) : ""}`}
                      >
                        {
                          <div
                            {...(showTooltipFor.includes(r) && {
                              className: "tooltipContainer"
                            })}
                          >
                            {d[r] !== "" && showTooltipFor.includes(r) && (
                              <span className="tooltips">{d[r]}</span>
                            )}
                            <FormElement
                              key={`${i}-${j}`}
                              onDelete={index => onDelete(index)}
                              onChange={(index, data, primaryKey, t = 1) => {
                                updateDbData(index, data, primaryKey);
                              }}
                              index={{ i, j: r }}
                              placeholder={TableAliasRows[j]}
                              value={d[r]}
                              element={rowElements[j]}
                              showIncrement={dbData.length - 1 === i}
                              showDecrement={true}
                              onAddRow={bool => onAddRow(bool)}
                              primaryKey={TableRows[0]}
                              isPostable={Boolean(postApiUrl)}
                            />
                          </div>
                        }
                      </div>
                    ))
                  )}
                  {showTotal && showTotal.length > 0 && (
                    <>
                      <div className="textCenter">Total</div>
                      {TableRows.slice(1).map((r, i) => {
                        const isTotalColumn =
                          showTotal.includes(r) ||
                          showTotal.some(s => s.whichKey === r);
                        return (
                          <div
                            className={isTotalColumn ? "totalColumn" : ""}
                            key={i}
                          >
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
                  <div
                    className="noRecords text-center"
                    style={{ gridColumn: `1 / span ${TableRows.length}` }}
                  >
                    No Records
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="footer">
            {pagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(dbData.length / recordsPerPage)}
                onSetPage={onSetCurrentPage}
                maxPagesToShow={maxPagesToShow}
                selectedPageString={pagination.currentPage}
              />
            )}
            {postApiUrl && (
              <div className="form-group pt-10 text-right">
                <button
                  onClick={() => submitData()}
                  disabled={btnLoader}
                  className="btn btn-bni"
                >
                  {btnLoader ? (
                    <HtmlIcon className="rotate" entity={"&#10041;"} />
                  ) : (
                    <>{ajaxButtonName}</>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="errorWrapper">
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
    <div className="relativeSpinner">
      <Loader
        type={helpers.LoadRandomSpinnerIcon()}
        color={helpers.fluorescentColor}
        height={100}
        width={100}
      />
    </div>
  );
}

BackendCore.propTypes = {
  Table: PropTypes.string, // check usage
  TableRows: PropTypes.array.isRequired,
  TableAliasRows: PropTypes.array.isRequired,
  showTotal: PropTypes.array,
  rowKeyUp: PropTypes.string,
  rowElements: PropTypes.array.isRequired,
  insertCloneData: PropTypes.array,
  showTooltipFor: PropTypes.array,
  onTableUpdate: PropTypes.func,
  config: PropTypes.object,
  className: PropTypes.string,
  defaultValues: PropTypes.array,
  onPostApi: PropTypes.func,
  ajaxType: PropTypes.string,
  ajaxButtonName: PropTypes.string
};
BackendCore.defaultProps = {
  Table: "My table",
  TableRows: [],
  TableAliasRows: [],
  showTotal: [],
  rowKeyUp: "",
  rowElements: [],
  insertCloneData: [],
  showTooltipFor: [],
  ajaxType: "post",
  ajaxButtonName: "Submit",
  config: {
    footer: {
      total: {
        locale: "en-IN",
        currency: "",
        maxDecimal: 2,
        doubleEntryBalanceStrings: {
          zero: "Settled",
          plus: "Ahead",
          minus: "Bal"
        }
      },
      pagination: {
        currentPage: "first",
        recordsPerPage: 10,
        maxPagesToShow: 5
      }
    }
  },
  defaultValues: [],
  cellWidth: "15rem"
};

export default BackendCore;
