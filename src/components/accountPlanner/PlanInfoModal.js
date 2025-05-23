import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import useAxios from "../../services/apiServices";
import helpers from "../../helpers";
import Loader from "../resuable/Loader";
import { UserContext } from "../../contexts/UserContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { FormattedMessage, useIntl } from "react-intl";

const PlanInfoModal = props => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const { monthYearSelected, bankSelected, selectedPlan, ...rest } = props;
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const [table, setTable] = useState([]);
  const [allLoader, setAllLoader] = useState(true);
  useEffect(() => {
    setAllLoader(true);
    const a = getPlanDetails();
    Promise.all([a]).then(r => {
      const data = r[0];
      setTable(data);
      setAllLoader(false);
    });
  }, [monthYearSelected, bankSelected, selectedPlan]);

  const getPlanDetails = () => {
    const formdata = new FormData();
    formdata.append("startDate", selectedPlan.startDate);
    formdata.append("endDate", selectedPlan.endDate);
    formdata.append("bankSelected", bankSelected);
    formdata.append("criteria", selectedPlan.criteria);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/getPlanDetails", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };
  const loaderComp = () => {
    return (
      <div className='relativeSpinner'>
        <Loader />
      </div>
    );
  };
  const doDifference = (plan, actual) => {
    if (selectedPlan.criteria === "E0") {
      // no plan
      return Number(plan);
    }
    if (selectedPlan.criteria === "0TO100") {
      // bad plan
      return Number(plan) - Number(actual);
    }
    if (selectedPlan.criteria === "E100") {
      // acheived plan
      return Number(plan) - Number(actual);
    }
    if (selectedPlan.criteria === "G100") {
      // Good plan
      return Number(plan) - Number(actual);
    }
    return 0;
  };
  const getTotal = array => {
    const total = array.reduce((a, b) => a + b, 0);
    return helpers.countryCurrencyLacSeperator(
      localeContext.localeLanguage,
      localeContext.localeCurrency,
      total,
      2,
    );
  };
  const commitTotal = [];
  const plannedTotal = [];
  const diffTotal = [];
  return (
    <Modal {...rest} style={{ zIndex: 10000 }}>
      <Modal.Header closeButton>
        <Modal.Title>
          {intl.formatMessage({
            id: monthYearSelected.split("-")[0].toLowerCase(),
            defaultMessage: monthYearSelected.split("-")[0].toLowerCase(),
          })}{" "}
          {monthYearSelected.split("-")[1]}{" "}
          <i className='fa fa-angle-double-right' /> {selectedPlan.label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`rounded-bottom ${
          userContext.userData.theme === "dark"
            ? "bg-dark text-white"
            : "bg-white text-dark"
        }`}
      >
        <div className='table-responsive p-10'>
          {!allLoader ? (
            <table
              className={`table ${
                userContext.userData.theme === "dark"
                  ? "table-dark"
                  : "table-white"
              }`}
            >
              <tbody>
                <tr>
                  <th>#</th>
                  <th>
                    <FormattedMessage id='expense' defaultMessage='expense' />
                  </th>
                  <th>
                    <FormattedMessage
                      id='committed'
                      defaultMessage='committed'
                    />
                  </th>
                  <th>
                    <FormattedMessage id='plan' defaultMessage='plan' />
                  </th>
                  <th>
                    <FormattedMessage
                      id='difference'
                      defaultMessage='difference'
                    />
                  </th>
                </tr>
                {table && table.length > 0 ? (
                  table.map((t, i) => {
                    const diff = doDifference(
                      t.inc_exp_plan_amount,
                      t.inc_exp_amount,
                    );
                    commitTotal.push(Number(t.inc_exp_amount));
                    plannedTotal.push(Number(t.inc_exp_plan_amount));
                    const dArr = doDifference(
                      t.inc_exp_plan_amount,
                      t.inc_exp_amount,
                    );
                    diffTotal.push(dArr);
                    return (
                      <tr key={i}>
                        <td>{i + 1}.</td>
                        <td>{t.inc_exp_name}</td>
                        <td>{t.inc_exp_amount}</td>
                        <td>{t.inc_exp_plan_amount}</td>
                        <td
                          className={`text-${diff >= 0 ? "success" : "danger"}`}
                        >
                          {diff >= 0
                            ? `+${helpers.countryCurrencyLacSeperator(
                                localeContext.localeLanguage,
                                localeContext.localeCurrency,
                                diff,
                                2,
                              )}`
                            : `(${helpers.countryCurrencyLacSeperator(
                                localeContext.localeLanguage,
                                localeContext.localeCurrency,
                                diff,
                                2,
                              )})`}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className='text-center py-3' colSpan='5'>
                      <FormattedMessage
                        id='noRecordsGenerated'
                        defaultMessage='noRecordsGenerated'
                      />
                    </td>
                  </tr>
                )}
                {table && table.length > 0 && (
                  <tr>
                    <td>
                      <FormattedMessage id='total' defaultMessage='total' />
                    </td>
                    <td />
                    <td>{getTotal(commitTotal)}</td>
                    <td>{getTotal(plannedTotal)}</td>
                    <td>{getTotal(diffTotal)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            loaderComp()
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

PlanInfoModal.propTypes = {
  property: PropTypes.string,
};

export default PlanInfoModal;
