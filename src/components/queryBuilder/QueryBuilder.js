import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import QueryBuilderAccordion from "../accountPlanner/QueryBuilderAccordion";

const QueryBuilder = props => {
  const userContext = useContext(UserContext);
  return (
    <div className='m-2'>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-light lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-database fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage
                id='queryBuilder'
                defaultMessage='queryBuilder'
              />
            </div>
          </div>
        </div>
      </div>
      <QueryBuilderAccordion />
    </div>
  );
};

export default QueryBuilder;
