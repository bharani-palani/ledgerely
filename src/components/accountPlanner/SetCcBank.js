import React, { useContext } from "react";
import { AccountContext } from "./AccountPlanner";
import { injectIntl, useIntl } from "react-intl";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { UserContext } from "../../contexts/UserContext";

const SetCcBank = () => {
  const intl = useIntl();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const { ccBankList, ccBankSelected, setCcBankSelected } = accountContext;

  return (
    <FilterSelect
      placeholder={intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      })}
      onChange={(ind, value) => {
        setCcBankSelected(value);
      }}
      element={{
        fetch: {
          dropDownList: ccBankList.map(row => ({
            id: row.id,
            value: row.value,
          })),
        },
        searchable: true,
      }}
      value={ccBankSelected}
      type={"single"}
      searchable={true}
      theme={userContext.userData.theme}
    />
  );
};
export default injectIntl(SetCcBank);
