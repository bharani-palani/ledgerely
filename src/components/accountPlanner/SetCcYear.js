import React, { useContext } from "react";
import { AccountContext } from "./AccountPlanner";
import { injectIntl, useIntl } from "react-intl";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { UserContext } from "../../contexts/UserContext";

const SetCcYear = props => {
  const intl = useIntl();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const { ccYearList, ccYearSelected, setCcYearSelected } = accountContext;

  return (
    <FilterSelect
      placeholder={intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      })}
      onChange={(ind, value, pKey) => {
        setCcYearSelected(value);
      }}
      element={{
        fetch: {
          dropDownList: ccYearList.map(row => ({
            id: row.id,
            value: row.value,
          })),
        },
        searchable: true,
      }}
      value={ccYearSelected}
      type={"single"}
      searchable={true}
      theme={userContext.userData.theme}
    />
  );
};

export default injectIntl(SetCcYear);
