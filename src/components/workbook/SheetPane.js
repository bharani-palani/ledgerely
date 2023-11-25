import React, { useContext } from "react";
import PropTypes from "prop-types";
import WorkbookContext from "./WorkbookContext";
import { FormattedMessage } from "react-intl";

const SheetPane = props => {
  const workbookContext = useContext(WorkbookContext);
  const { sheets, setSheets, theme } = workbookContext;
  const { styles } = props;
  return (
    <div
      className='d-flex fw-light small border border-1 border-secondary rounded-bottom border-top-0'
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
          <button
            key={i}
            style={{ minWidth: 120 }}
            className={`rounded-0 btn btn-sm btn-${theme} border-0 border-end border-secondary`}
          >
            {s} {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

SheetPane.propTypes = {
  property: PropTypes.value,
};
SheetPane.defaultProps = {};

export default SheetPane;
