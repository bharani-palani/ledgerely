import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { VerticalPanes, Pane } from "./VerticalPane";
import WorkbookContext from "./WorkbookContext";
import SheetPane from "./SheetPane";
import { v4 as uuidv4 } from "uuid";
import { useIntl } from "react-intl";
import Canvas from "./Canvas";
import FeatureNotAvailable from "./FeatureNotAvailable";
import GraphList from "./GraphList";
import ChartOptions from "./ChartOptions";

const Workbook = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [sheets, setSheets] = useState([
    {
      id: uuidv4(),
      order: 0,
      label: `${intl.formatMessage({
        id: "sheet",
        defaultMessage: "sheet",
      })} 1`,
      data: {},
    },
  ]);
  const [activeSheet, setActiveSheet] = useState("");
  const maxZoom = 100;
  const [zoom, setZoom] = useState(100);

  return (
    <WorkbookContext.Provider
      value={{
        sheets,
        setSheets,
        theme: userContext.userData.theme,
        activeSheet,
        setActiveSheet,
        zoom,
        maxZoom,
        setZoom,
      }}
    >
      <FeatureNotAvailable />
      <div className='container-fluid small d-none d-sm-block'>
        <VerticalPanes
          theme={userContext.userData.theme}
          className={`border border-1 ${
            userContext.userData.theme === "dark" ? "border-secondary" : ""
          } rounded-top`}
        >
          <Pane width={"5%"} className='text-center overflow-auto'>
            <GraphList />
          </Pane>
          <Pane
            width={"80%"}
            className={`border border-1 ${
              userContext.userData.theme === "dark" ? "border-secondary" : ""
            } border-top-0 border-bottom-0`}
          >
            <Canvas />
          </Pane>
          <Pane width={"15%"}>
            <ChartOptions />
          </Pane>
        </VerticalPanes>
        <SheetPane />
      </div>
    </WorkbookContext.Provider>
  );
};

export default Workbook;
