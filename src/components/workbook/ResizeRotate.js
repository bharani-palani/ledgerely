import React, { useContext } from "react";
import WorkbookContext from "./WorkbookContext";
import { CHART_TYPES } from "../shared/D3/constants";

const ResizeRotate = ({ id, children, catId }) => {
  const workbookContext = useContext(WorkbookContext);
  const { activeChart, deleteChart } = workbookContext;

  return (
    <>
      {activeChart === id && (
        <>
          {["SHAPES", "EMOJI"].includes(CHART_TYPES[catId]) && (
            <i
              className='fa fa-times-circle position-absolute top-0 start-100 translate-middle text-danger heightHandle cursor-pointer'
              style={{ zIndex: 10 }}
              onClick={() => deleteChart(id)}
            />
          )}
          <>
            <i
              className='fa fa-repeat fa-2x position-absolute icon-bni draggable rotateHandle'
              style={{
                left: "calc(50% - 5px)",
                top: "-40px",
              }}
            />
            {!["EMOJI"].includes(CHART_TYPES[catId]) && (
              <i
                className='fa fa-arrows-h fa-rotate-90 position-absolute icon-bni draggable resizeHandle'
                style={{
                  transform: "rotate(45deg)",
                  zIndex: 10,
                  right: "-20px",
                  bottom: "-20px",
                }}
              />
            )}
          </>
        </>
      )}
      {children}
    </>
  );
};

export default ResizeRotate;
