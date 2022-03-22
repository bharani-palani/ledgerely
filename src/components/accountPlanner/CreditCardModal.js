import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { UserContext } from "../../contexts/UserContext";

const CreditCardModal = props => {
  const {onImport} = props;
  const userContext = useContext(UserContext);
  const [lines, setLines] = useState([]);
  const [rows, setRows] = useState([]);
  const [source, setSource] = useState(-1);
  const [dest, setDest] = useState(-1);
  const [parent, setParent] = useState(-1);
  const [separator, setSeparator] = useState(" ");

  const headings = [
    { label: "Transaction", type: "text", key: "cc_transaction" },
    { label: "Date", type: "dated", key: "cc_date" },
    { label: "Opening", type: "number", key: "cc_opening_balance" },
    { label: "Credits", type: "number", key: "cc_payment_credits" },
    { label: "Purchases", type: "number", key: "cc_purchases" },
    { label: "Interest", type: "number", key: "cc_taxes_interest" }
  ];
  const textAreaRef = useRef(null);
  const seperator = "{--#newLine#--}";

  const makeTable = () => {
    let value = textAreaRef.current.value;
    value = value
      .replace(/(\r\n|\n|\r)/gm, seperator)
      .split(seperator)
      .filter(n => n)
      .map(v => v.split(separator));

    const newRows = value.map(() => ({
      cc_comments: "",
      cc_date: "",
      cc_expected_balance: "",
      cc_for_card: "",
      cc_id: "",
      cc_opening_balance: "",
      cc_payment_credits: "",
      cc_purchases: "",
      cc_taxes_interest: "",
      cc_transaction: ""
    }));
    setRows(newRows);
    setLines(value);
  };

  const deleteAll = index => {
    let linesBackup = [...lines];
    linesBackup = linesBackup.map((line, i) => {
      if (i === index) {
        line = [];
      }
      return line;
    });
    setLines(linesBackup);
  };

  const removeCell = (parrent, child) => {
    let linesBackup = [...lines];
    linesBackup = linesBackup.map((line, i) => {
      if (i === parrent) {
        return line.filter((c, j) => {
          return j !== child;
        });
      }
      return line;
    });
    setLines(linesBackup);
  };
  useEffect(() => {
    if (source > -1 && dest > -1 && parent > -1 && source !== dest) {
      let linesBackup = [...lines];
      linesBackup = linesBackup
        .map((line, i) => {
          if (i === parent && line.length > 1) {
            line[source] =
              line[source] &&
              line[dest] &&
              [...line[source], ...line[dest]].join("");
            line[dest] = line[dest] && null;
          }
          return line;
        })
        .map(parent => parent.filter(child => child !== null));
      setLines(linesBackup);
      setDest(-1);
      setParent(-1);
      setSource(-1);
    }
  }, [source, dest, parent]);

  const concatenateValues = (e, object) => {
    let { i, j } = object;
    setParent(Number(i));
    setDest(Number(e.target.id));
  };
  const onDragStart = (e, object) => {
    setSource(Number(e.target.id));
    e.dataTransfer.setData("drag-item", object);
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  const isGoodDate = dt => {
    const possibleType = [
      moment(dt, "YYYY/MMM/DD", true).isValid() &&
        moment(dt, "YYYY/MMM/DD").format("YYYY-MM-DD"),
      moment(dt, "YYYY.MMM.DD", true).isValid() &&
        moment(dt, "YYYY.MMM.DD").format("YYYY-MM-DD"),
      moment(dt, "YYYY-MMM-DD", true).isValid() &&
        moment(dt, "YYYY-MMM-DD").format("YYYY-MM-DD"),
      moment(dt, "YYYY MMM DD", true).isValid() &&
        moment(dt, "YYYY MMM DD").format("YYYY-MM-DD"),

      moment(dt, "YYYY/MM/DD", true).isValid() &&
        moment(dt, "YYYY/MM/DD").format("YYYY-MM-DD"),
      moment(dt, "YYYY.MM.DD", true).isValid() &&
        moment(dt, "YYYY.MM.DD").format("YYYY-MM-DD"),
      moment(dt, "YYYY-MM-DD", true).isValid() &&
        moment(dt, "YYYY-MM-DD").format("YYYY-MM-DD"),
      moment(dt, "YYYY MM DD", true).isValid() &&
        moment(dt, "YYYY MM DD").format("YYYY-MM-DD"),

      moment(dt, "DD/MM/YYYY", true).isValid() &&
        moment(dt, "DD/MM/YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD-MM-YYYY", true).isValid() &&
        moment(dt, "DD-MM-YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD.MM.YYYY", true).isValid() &&
        moment(dt, "DD.MM.YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD MM YYYY", true).isValid() &&
        moment(dt, "DD MM YYYY").format("YYYY-MM-DD"),

      moment(dt, "DD/MMM/YYYY", true).isValid() &&
        moment(dt, "DD/MMM/YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD-MMM-YYYY", true).isValid() &&
        moment(dt, "DD-MMM-YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD.MMM.YYYY", true).isValid() &&
        moment(dt, "DD.MMM.YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD MMM YYYY", true).isValid() &&
        moment(dt, "DD MMM YYYY").format("YYYY-MM-DD"),

      moment(dt, "DD/MMMM/YYYY", true).isValid() &&
        moment(dt, "DD/MMMM/YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD-MMMM-YYYY", true).isValid() &&
        moment(dt, "DD-MMMM-YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD.MMMM.YYYY", true).isValid() &&
        moment(dt, "DD.MMMM.YYYY").format("YYYY-MM-DD"),
      moment(dt, "DD MMMM YYYY", true).isValid() &&
        moment(dt, "DD MMMM YYYY").format("YYYY-MM-DD")
    ].filter(date => date !== false)[0];
    return possibleType ? possibleType : "Invalid Date";
  };

  const onDrop = (e, type, headKey) => {
    let droppedItem = JSON.parse(e.dataTransfer.getData("drag-item"));
    let { cell, i } = droppedItem;
    let appendValue = "";
    if (type === "dated") {
      appendValue = isGoodDate(cell);
    } else if (type === "text") {
      appendValue = cell;
    } else if (type === "number") {
      cell = cell.replace(",", "");
      appendValue = Number(cell) || 0;
    }
    e.target.value = appendValue;
    updateRows(i, headKey, appendValue);
  };

  const updateRows = (index, headKey, value) => {
    let rowsBackup = [...rows];
    rowsBackup = rowsBackup.map((row, i) => {
      if (index === i) {
        row[headKey] = value;
      }
      return row;
    });
    setRows(rowsBackup);
  };

  return (
    <Modal {...props} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title>Import your credit card statement</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`rounded-bottom ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-dark'}`}>
        <div className="creditCardModal">
          {!lines.length ? (
            <div>
              <div className="row separatorWrapper py-2">
                <div className="col-md-9 col-7 pl-0">
                  <label htmlFor="paste">
                    Paste your statement here <i className="fa fa-level-down" />
                  </label>
                </div>
                <div className="col-md-3 col-5 pr-0">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">Seperator</span>
                    <input
                      type="text"
                      defaultValue={separator}
                      onChange={e => setSeparator(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <textarea
                id="paste"
                ref={textAreaRef}
                className="textArea"
              />
            </div>
          ) : (
            <div className="table-responsive pb-3">
              <div className="tableGrid">
                {headings.map((head, i) => (
                  <div key={i} className="heading">
                    {head.label}
                  </div>
                ))}
                {lines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line.length > 0 && (
                      <div className={`singleLines`}>
                        {line.map((cell, j) => (
                          <span
                            key={j}
                            id={j}
                            draggable="true"
                            onDragStart={e =>
                              onDragStart(e, JSON.stringify({ cell, i, j }))
                            }
                            onDrop={e => concatenateValues(e, { i, j })}
                            onDragOver={e => onDragOver(e)}
                            className="cell"
                          >
                            {cell}
                            <i
                              onClick={() => removeCell(i, j)}
                              className="fa fa-times-circle"
                            />
                          </span>
                        ))}
                        {line.length > 0 && (
                          <span
                            onClick={() => deleteAll(i)}
                            className="cell danger"
                            title="Delete all?"
                          >
                            <i className="fa fa-times" />
                          </span>
                        )}
                      </div>
                    )}
                    {headings.map((head, k) => (
                      <div key={k}>
                        <input
                          type={head.type}
                          onChange={e =>
                            updateRows(i, head.key, e.target.value)
                          }
                          onDragOver={e => onDragOver(e)}
                          onDrop={e => onDrop(e, head.type, head.key)}
                          className="input"
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          <div className="text-end py-2">
            {lines.length > 0 && (
              <button
                onClick={() => setLines([])}
                className="btn btn-bni me-3"
              >
                <i className="fa fa-angle-double-left" /> Back
              </button>
            )}
            {!lines.length ? (
              <button onClick={() => makeTable()} className="btn btn-bni">
                Process
              </button>
            ) : (
              <button
                onClick={() => onImport(rows)}
                className="btn btn-bni"
              >
                Import
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

CreditCardModal.propTypes = {
  property: PropTypes.string
};
CreditCardModal.defaultProps = {
  property: "String name"
};

export default CreditCardModal;
