import React, { useContext } from "react";
import { AccountContext } from "./AccountPlanner";
import { injectIntl, useIntl } from "react-intl";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { UserContext } from "../../contexts/UserContext";

const SetYear = () => {
  const intl = useIntl();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const { yearList, yearSelected, setYearSelected } = accountContext;

  return (
    <FilterSelect
      placeholder={intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      })}
      onChange={(ind, value) => {
        setYearSelected(value);
      }}
      element={{
        fetch: {
          dropDownList: yearList.map(row => ({
            id: row.id,
            value: row.value,
          })),
        },
        searchable: true,
      }}
      value={yearSelected}
      type={"single"}
      searchable={true}
      theme={userContext.userData.theme}
    />
  );
};

export default injectIntl(SetYear);
