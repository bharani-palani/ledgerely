import React, { useEffect, useRef, useState, useContext } from "react";
import { BarChart } from "../shared/D3";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = props => {
  const userContext = useContext(UserContext);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(containerRef?.current?.clientWidth);
  }, []);

  return (
    <div className='container-fluid'>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark" ? "bg-dark" : "bg-light"
        } ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-cubes fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='dashboard' defaultMessage='dashboard' />
            </div>
          </div>
        </div>
      </div>
      <div ref={containerRef}>{width && <BarChart />}</div>
    </div>
  );
};

export default Dashboard;
