import React, { useContext, useEffect, useState } from "react";
import WorkbookContext from "../WorkbookContext";
import { UserContext } from "../../../contexts/UserContext";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FormattedMessage } from "react-intl";
import helpers from "../../../helpers";
import { DSContext } from "../ReactiveElements/DataSource";
import { useIntl } from "react-intl";

const DSOptions = ({ config }) => {
  const intl = useIntl();
  const workbookContext = useContext(WorkbookContext);
  const userContext = useContext(UserContext);
  const dSContext = useContext(DSContext);
  const { theme } = workbookContext;
  const {
    setTableDragging,
    activeDataSource,
    setActiveDataSource,
    setSelectedWBFields,
    setTable,
    setResponse,
    setErrorResponse,
  } = dSContext;
  const [file, setFile] = useState([]);
  const fileSize = 50 * 1024 * 1024;
  const maxRowsInsert = 1000;

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, e => {
      setActiveDataSource(eventKey);
    });

    return (
      <button
        type='button'
        className={`text-start py-1 border-0 btn btn-sm btn-bni w-100 border-0 border-bottom border-${theme}`}
        onClick={decoratedOnClick}
        style={
          eventKey === "MP"
            ? { borderRadius: "5px 0px 0px 0px" }
            : { borderRadius: "0" }
        }
      >
        {children}
      </button>
    );
  }

  const processData = (file, fileType) => {
    return new Promise((resolve, reject) => {
      const input = file;
      const reader = new FileReader();
      reader.readAsText(input);
      reader.onload = e => {
        const lines = [];
        const allText = e.target.result;
        if (fileType === "CSV") {
          const allTextLines = allText.split(/\r\n|\n/);
          const headers = allTextLines[0].split(",");
          if (input.size <= fileSize) {
            if (allTextLines.length - 1 <= maxRowsInsert) {
              for (let i = 1; i < allTextLines.length; i++) {
                // const data = allTextLines[i].match(/(".*?"|[^,\s]+)(?=\s*,|\s*$)/g);
                const data = allTextLines[i].split(
                  /,(?=(?:(?:[^"]*"){2})*[^"]*$)/,
                );
                if (data.length === headers.length) {
                  const tarr = [];
                  for (let j = 0; j < headers.length; j++) {
                    tarr.push({
                      [headers[j]]: data[j]
                        .replace(/\\/g, "")
                        .replaceAll('"', ""),
                    });
                  }
                  const joined = Object.assign({}, ...tarr);
                  lines.push(joined);
                }
              }
              resolve(lines);
            } else {
              reject(
                new Error(
                  `${intl.formatMessage({
                    id: "maxAllowedRowLimitIs",
                    defaultMessage: "maxAllowedRowLimitIs",
                  })} ${maxRowsInsert}`,
                ),
              );
            }
          } else {
            reject(
              new Error(
                `${intl.formatMessage({
                  id: "maxFileSizeLimitIs",
                  defaultMessage: "maxFileSizeLimitIs",
                })} ${fileSize} MB`,
              ),
            );
          }
        } else {
          try {
            if (JSON.parse(allText) && !!allText) {
              const array = JSON.parse(allText);
              if (array.length > 0 && Array.isArray(array)) {
                setResponse(array);
              }
            }
          } catch (e) {
            reject(new Error("Not a valid array of JSON object"));
          }
        }
      };
      reader.onerror = e => {
        reject(e);
      };
    });
  };

  const onDrop = acceptedFiles => {
    setFile(acceptedFiles[0].name);
    processData(acceptedFiles[0], activeDataSource)
      .then(res => {
        setResponse(res);
        setErrorResponse({});
      })
      .catch(e => {
        const eObject = JSON.parse(
          JSON.stringify(e, Object.getOwnPropertyNames(e)),
        );
        setResponse([]);
        setErrorResponse({
          errorMessage: eObject.message,
        });
        userContext.renderToast({
          position: "bottom-center",
          type: "error",
          icon: "fa fa-times-circle",
          message: e,
        });
      });
  };

  useEffect(() => {
    setTable(config[0]?.tables[0]?.label);
    setSelectedWBFields(config[0]?.tables[0]?.fields);
  }, []);

  return (
    <Accordion defaultActiveKey={activeDataSource} className=''>
      {config.map((c, ii) => (
        <Card
          key={ii}
          className={`border-0 rounded-0 ${
            theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
          }`}
        >
          <Card.Header className='m-0 p-0 rounded-0'>
            <CustomToggle eventKey={c.id}>{c.label}</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={c.id}>
            {c.hasUpload ? (
              <Card.Body className='m-2 p-2 rounded text-center p-3 border-1 bni-border bni-border-all bni-border-all-1'>
                <Dropzone accept={c?.fileType} onDrop={onDrop} className=''>
                  {({
                    getRootProps,
                    getInputProps,
                    isDragAccept,
                    isDragReject,
                  }) => {
                    let classes = "dropZoneWrapper";
                    let placeholder = (
                      <div className='icon-bni'>
                        <FormattedMessage
                          id='clickHereToUpload'
                          defaultMessage='clickHereToUpload'
                        />
                      </div>
                    );
                    if (isDragAccept) {
                      classes = `${classes} bg-success`;
                      placeholder = (
                        <div className='upload-success'>
                          <FormattedMessage
                            id='dropFileOrfilesHere'
                            defaultMessage='dropFileOrfilesHere'
                          />
                        </div>
                      );
                    }
                    if (isDragReject) {
                      classes = `${classes} bg-danger`;
                      placeholder = (
                        <div className='upload-error'>
                          <FormattedMessage
                            id='fileTypeNotAllowed'
                            defaultMessage='fileTypeNotAllowed'
                          />
                        </div>
                      );
                    }
                    return (
                      <div {...getRootProps()} className={`${classes} title`}>
                        <input {...getInputProps()} />
                        <small>{placeholder}</small>
                        {file[0]?.name && (
                          <em
                            style={{
                              fontSize: "0.75rem",
                              lineHeight: 1.25,
                              display: "inline-block",
                            }}
                            className='icon-bni mt-2'
                          >
                            {helpers.shorten(file[0]?.name, 20)}
                          </em>
                        )}
                      </div>
                    );
                  }}
                </Dropzone>
              </Card.Body>
            ) : (
              <div className='p-1'>
                <div className='small'>Tables</div>
                {c.tables.map((table, i) => (
                  <div key={i}>
                    <button
                      draggable={true}
                      className={`my-1 btn btn-sm btn-bni w-100 rounded-pill`}
                      onClick={() => {
                        setTable(table.label);
                        setSelectedWBFields(table.fields);
                      }}
                      onDrag={() => {
                        setTableDragging({
                          source: ["from", "join"],
                        });
                        setTable(table.label);
                        setSelectedWBFields(table.fields);
                      }}
                      onDragEnd={() => setTableDragging({})}
                      onDragStart={e => {
                        e.dataTransfer.setData(
                          "text",
                          JSON.stringify({
                            source: ["from", "join"],
                            data: table.label,
                          }),
                        );
                      }}
                    >
                      {table.label}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default DSOptions;
