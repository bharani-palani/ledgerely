import React, { useContext, useState } from "react";
import WorkbookContext from "../WorkbookContext";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FormattedMessage } from "react-intl";
import helpers from "../../../helpers";

const DSOptions = ({ config }) => {
  const workbookContext = useContext(WorkbookContext);
  const { theme, setSelectedWBFields, setTable } = workbookContext;
  const [file, setFile] = useState([]);

  function CustomToggle({ children, eventKey, eventLabel }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => false);

    return (
      <button
        type='button'
        className={`py-1 border-0 btn btn-sm btn-bni w-100 border-0 border-bottom border-${theme}`}
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

  return (
    <Accordion defaultActiveKey={"MP"} className=''>
      <Card
        className={`border-0 rounded-0 ${
          theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
        }`}
      >
        <Card.Header className='m-0 p-0 rounded-0'>
          <CustomToggle eventLabel={config.label} eventKey={config.id}>
            {config.label}
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={config.id}>
          {config.hasUpload ? (
            <Card.Body className='m-2 p-2 rounded text-center p-3 border-1 bni-border bni-border-all bni-border-all-1'>
              <Dropzone
                accept={config?.fileType}
                maxSize={1024 * 5}
                onDrop={f => setFile(f)}
                className=''
              >
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
              {config.tables.map((table, i) => (
                <div key={i}>
                  <button
                    draggable={true}
                    className={`my-1 btn btn-sm btn-bni w-100 rounded-pill`}
                    onClick={() => {
                      setTable(table.label);
                      setSelectedWBFields(table.fields);
                    }}
                    onDragStart={e => {
                      e.dataTransfer.setData(
                        "text",
                        JSON.stringify({ source: ["from"], data: table.label }),
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
    </Accordion>
  );
};

export default DSOptions;
