import React, { useContext } from "react";
import { AccountContext } from "./AccountPlanner";
import { injectIntl, useIntl } from "react-intl";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { UserContext } from "../../contexts/UserContext";

const SetBank = () => {
  const intl = useIntl();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const { bankList, bankSelected, setBankSelected } = accountContext;

  return (
    <FilterSelect
      placeholder={intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      })}
      onChange={(ind, value) => {
        setBankSelected(value);
      }}
      element={{
        fetch: {
          dropDownList: bankList.map(row => ({
            id: row.id,
            value: row.value,
          })),
        },
        searchable: true,
      }}
      value={bankSelected}
      type={"single"}
      searchable={true}
      theme={userContext.userData.theme}
    />
  );
};

export default injectIntl(SetBank);
