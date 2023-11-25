import React, { useContext } from "react";
import WorkbookContext from "./WorkbookContext";
import { FormattedMessage } from "react-intl";
import { Popover, OverlayTrigger } from "react-bootstrap";

const SheetPane = props => {
  const workbookContext = useContext(WorkbookContext);
  const { sheets, setSheets, theme } = workbookContext;
  const { styles } = props;

  const popover = r => (
    <Popover id='popover-basic'>
      <Popover.Header as='div' className={`bg-primary text-light`}>
        Actions
      </Popover.Header>
      <Popover.Body className='p-0'>
        <ul className='list-group list-group-flush'>
          <li className={`list-group-item cursor-pointer`}>Edit</li>
          <li className='list-group-item cursor-pointer'>Duplicate</li>
          <li className='list-group-item cursor-pointer text-danger rounded-bottom'>
            Delete
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <div
      className={`d-flex fw-light border border-1 ${
        theme === "dark" ? "border-secondary" : ""
      } rounded-bottom border-top-0`}
      style={{ ...styles }}
    >
      <div className='d-flex px-2 align-items-center'>
        <i className={`fa fa-book fa-1x px-1`}></i>
        <FormattedMessage id='workbook' defaultMessage='workbook' />
      </div>
      <button
        className='btn btn-sm btn-primary border-0 px-3 rounded-0'
        onClick={() => setSheets(prevState => prevState + 1)}
      >
        <i className='fa fa-plus' />
      </button>
      <div
        className='d-flex me-1'
        style={{ width: "100%", "overflow-x": "auto" }}
      >
        {new Array(sheets).fill("Sheet").map((s, i) => (
          <OverlayTrigger
            key={i}
            trigger='click'
            placement='top'
            overlay={popover({ data: { s, i } })}
            rootClose
          >
            <button
              style={{ minWidth: 120 }}
              className={`rounded-0 btn btn-sm btn-${theme} border-0 border-end ${
                theme === "dark" ? "border-secondary" : ""
              }`}
            >
              {s} {i + 1}
            </button>
          </OverlayTrigger>
        ))}
      </div>
    </div>
  );
};

export default SheetPane;
