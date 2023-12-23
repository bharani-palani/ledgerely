import React, { useContext } from "react";
import WorkbookContext from "../WorkbookContext";
import { DSContext } from "./DataSource";

const DynamicClause = props => {
  const { targetKey, type } = props;
  const workbookContext = useContext(WorkbookContext);
  const dSContext = useContext(DSContext);
  const { clause, setClause } = dSContext;
  const { theme } = workbookContext;

  const onDropHandle = e => {
    setClause(prev => ({
      ...prev,
      ...(type === "array"
        ? {
            [targetKey]: [
              ...new Set([
                ...clause[targetKey],
                e.dataTransfer.getData("text"),
              ]),
            ],
          }
        : { [targetKey]: e.dataTransfer.getData("text") }),
    }));
  };

  return (
    <div className='m-1'>
      <div
        className={`rounded p-1 border border-1 ${
          theme === "dark" ? "border-secondary" : ""
        }`}
        onDrop={e => onDropHandle(e)}
      >
        <div className='pb-1 small'>{targetKey.toUpperCase()}</div>
        <ul className='list-group'>
          {Array.isArray(clause[targetKey]) && clause[targetKey].length > 0
            ? clause[targetKey].map((s, i) => (
                <li
                  key={i}
                  className={`p-1 d-flex align-items-center justify-content-between small list-group-item ${
                    theme === "dark"
                      ? "bg-dark text-white border-secondary"
                      : "bg-white text-dark"
                  }`}
                >
                  <i className='fa fa-bars cursor-pointer' />
                  <span>{s}</span>
                  <i
                    onClick={() =>
                      setClause(prev => ({
                        ...prev,
                        [targetKey]: clause[targetKey].filter(
                          (_, j) => j !== i,
                        ),
                      }))
                    }
                    className='fa fa-times-circle cursor-pointer text-danger'
                  />
                </li>
              ))
            : typeof clause[targetKey] === "string" &&
              clause[targetKey] !== "" && (
                <li
                  className={`p-1 d-flex align-items-center justify-content-between small list-group-item ${
                    theme === "dark"
                      ? "bg-dark text-white border-secondary"
                      : "bg-white text-dark"
                  }`}
                >
                  <i className='fa fa-bars cursor-pointer' />
                  <span>{clause[targetKey]}</span>
                  <i className='fa fa-times-circle cursor-pointer text-danger' />
                </li>
              )}
        </ul>
      </div>
    </div>
  );
};

export default DynamicClause;
