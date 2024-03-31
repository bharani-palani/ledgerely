import React, { useContext } from "react";
import WorkbookContext from "./WorkbookContext";
import { CHART_TYPES } from "../shared/D3/constants";

const ResizeRotate = ({ id, children, catId }) => {
  const workbookContext = useContext(WorkbookContext);
  const { activeChart, deleteChart } = workbookContext;

  return (
    <div className='position-relative'>
      {activeChart === id && (
        <>
          <i
            className='fa fa-times-circle position-absolute top-0 start-100 translate-middle text-danger heightHandle cursor-pointer'
            style={{ zIndex: 10 }}
            onClick={() => deleteChart(id)}
          />
          {["SHAPES"].includes(CHART_TYPES[catId]) && (
            <>
              <i
                className='fa fa-repeat fa-2x position-absolute icon-bni rotateHandle'
                style={{
                  cursor: "grabbing",
                  left: "calc(50% - 5px)",
                  top: "-50px",
                }}
              />
              <i
                className='fa fa-arrows-h position-absolute top-50 start-100 translate-middle widthHandle'
                style={{ cursor: "grabbing", zIndex: 10 }}
              />
              <i
                className='fa fa-arrows-v position-absolute top-100 start-50 translate-middle heightHandle'
                style={{ cursor: "grabbing", zIndex: 10 }}
              />
            </>
          )}
        </>
      )}
      {children}
    </div>
  );
};

export default ResizeRotate;
