import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { VerticalPanes, Pane } from "./VerticalPane";
import WorkbookContext from "./WorkbookContext";
import SheetPane from "./SheetPane";

const Workbook = props => {
  const userContext = useContext(UserContext);
  const [sheets, setSheets] = useState(1);
  return (
    <WorkbookContext.Provider
      value={{ sheets, setSheets, theme: userContext.userData.theme }}
    >
      <div className='container-fluid'>
        <VerticalPanes
          theme={userContext.userData.theme}
          className='border border-1 border-secondary rounded-top'
        >
          <Pane width={"5%"}>abc</Pane>
          <Pane
            width={"75%"}
            className='border border-1 border-secondary border-top-0 border-bottom-0'
          >
            xyz
          </Pane>
          <Pane width={"20%"}>bni</Pane>
        </VerticalPanes>
        <SheetPane />
      </div>
    </WorkbookContext.Provider>
  );
};

export default Workbook;
