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
              className='fa fa-repeat fa-2x position-absolute icon-bni rotateHandle'
              style={{
                cursor: "grabbing",
                left: "calc(50% - 5px)",
                top: "-40px",
              }}
            />
            {!["EMOJI"].includes(CHART_TYPES[catId]) && (
              <i
                className='fa fa-arrows-h fa-rotate-90 position-absolute icon-bni resizeHandle'
                style={{
                  cursor: "grab",
                  transform: "rotate(45deg)",
                  zIndex: 10,
                  right: "-15px",
                  bottom: "-15px",
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
