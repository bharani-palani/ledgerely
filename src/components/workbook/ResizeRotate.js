import React, { useContext } from "react";
import WorkbookContext from "./WorkbookContext";

const ResizeRotate = ({ id, children, chartObject }) => {
  const workbookContext = useContext(WorkbookContext);
  const { activeChart } = workbookContext;

  return (
    <div
      className='position-relative'
      id={id}
      style={{
        width: chartObject.props.width,
        height: chartObject.props.height,
      }}
    >
      {activeChart === id && (
        <i
          className='fa fa-repeat fa-2x position-absolute icon-bni draggable rotateHandle'
          style={{
            left: "calc(50% - 25px)",
            top: "120px",
          }}
        />
      )}
      {children}
    </div>
  );
};

export default ResizeRotate;
