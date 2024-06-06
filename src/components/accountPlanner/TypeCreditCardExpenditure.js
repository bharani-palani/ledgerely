import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { creditCardConfig } from "../configuration/backendTableConfig";
import BackendCore from "../../components/configuration/backend/BackendCore";
import helpers from "../../helpers";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import { AccountContext } from "./AccountPlanner";
import { UserContext } from "../../contexts/UserContext";
import CreditCardModal from "./CreditCardModal";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";

const TypeCreditCardExpenditure = props => {
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const { intl } = props;
  const {
    ccMonthYearSelected,
    ccBankSelected,
    ccDetails,
    incExpList,
    ccBankList,
  } = accountContext;
  const [openCreditCardModal, setOpenCreditCardModal] = useState(false); // change to false
  const [dbData, setDbData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [insertCloneData, setInsertCloneData] = useState([]);

  useEffect(() => {
    getAllApi();
  }, [
    ccMonthYearSelected,
    ccBankSelected,
    ccDetails,
    incExpList,
    ccBankList,
    intl,
  ]);

  const getAllApi = () => {
    const [smonth, year] = ccMonthYearSelected.split("-");
    const month = helpers.strToNumMonth[smonth];
    const ccStartDay = Number(ccDetails.credit_card_start_date);
    const ccEndDay = Number(ccDetails.credit_card_end_date);

    const eDate = new Date(
      `${Number(year)}-${Number(month)}-${ccEndDay}`.replace(/-/g, "/"),
    );
    const eDateStr = `${eDate.getFullYear()}-${helpers.leadingZeros(
      eDate.getMonth() + 1,
    )}-${helpers.leadingZeros(eDate.getDate())}`;

    const dateOffset = 24 * 60 * 60 * 1000 * 30; // 30 days
    let sDate = eDate.setTime(eDate.getTime() - dateOffset);
    sDate = new Date(sDate);
    sDate = new Date(sDate.setDate(ccStartDay));
    const sDateStr = `${sDate.getFullYear()}-${helpers.leadingZeros(
      sDate.getMonth() + 1,
    )}-${helpers.leadingZeros(sDate.getDate())}`;

    const wClause = `cc_date between "${sDateStr}" and "${eDateStr}" and cc_for_card = ${ccBankSelected}`;

    setDbData([]);
    setLoader(true);
    const a = getBackendAjax(wClause);
    Promise.all([a]).then(async r => {
      setInsertCloneData([]);
      setDbData(r[0].data.response);
      setLoader(false);
      creditCardConfig[0].rowElements[8] = {
        fetch: {
          dropDownList: ccBankList,
        },
      };
      creditCardConfig[0].rowElements[9] = {
        fetch: {
          dropDownList: incExpList,
        },
      };
      creditCardConfig[0].rowElements[8].searchable = false;
    });
  };

  const onReFetchData = () => {
    getAllApi();
  };

  const getBackendAjax = wClause => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    formdata.append("TableRows", creditCardConfig[0].TableRows);
    formdata.append("Table", creditCardConfig[0].Table);
    if (wClause) {
      formdata.append("WhereClause", wClause);
    }
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onPostApi = response => {
    const { status, data } = response;
    if (status) {
      if (response && data && data.response !== null && data.response) {
        accountContext.renderToast({
          message: intl.formatMessage({
            id: "transactionSavedSuccessfully",
            defaultMessage: "transactionSavedSuccessfully",
          }),
        });
      }
      if (
        response &&
        data &&
        data.response !== null &&
        data.response === false
      ) {
        accountContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "noFormChangeFound",
            defaultMessage: "noFormChangeFound",
          }),
        });
      }
      if (response && data && data.response === null) {
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: <UpgradeHeading />,
          content: <UpgradeContent />,
        });
      }
    } else {
      accountContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "unableToReachServer",
          defaultMessage: "unableToReachServer",
        }),
      });
    }
  };
  const creditCardMassageConfig = creditCardConfig.map(crud => {
    const obj = {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: "total", defaultMessage: "total" }),
          locale: ccDetails.credit_card_locale,
          currency: ccDetails.credit_card_currency,
          maxDecimal: 2,
        },
        pagination: {
          currentPage: "first",
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    };
    crud.config = obj;
    crud.TableAliasRows = [
      "id",
      "transaction",
      "date",
      "openingBalance",
      "credits",
      "purchases",
      "taxesAndInterest",
      "balance",
      "creditCard",
      "category",
      "status",
      "comments",
      "recorded",
    ].map(al => intl.formatMessage({ id: al, defaultMessage: al }));
    return crud;
  });

  const renderCloneTooltip = (props, content) => (
    <Tooltip id='button-tooltip-1' className='in show' {...props}>
      {content}
    </Tooltip>
  );

  return (
    <div className='settings'>
      {openCreditCardModal && (
        <CreditCardModal
          className='creditCardModal'
          show={openCreditCardModal}
          onHide={() => setOpenCreditCardModal(false)}
          size='xl'
          animation={false}
          onImport={data => {
            setInsertCloneData(data);
            setOpenCreditCardModal(false);
          }}
        />
      )}
      <div className=''>
        <div className='row py-2'>
          <div className='col-md-12'>
            <OverlayTrigger
              placement='left'
              delay={{ show: 250, hide: 400 }}
              overlay={renderCloneTooltip(
                props,
                intl.formatMessage({
                  id: "importYourCreditCardStatement",
                  defaultMessage: "importYourCreditCardStatement",
                }),
              )}
              triggerType='hover'
            >
              <i
                onClick={() => setOpenCreditCardModal(!openCreditCardModal)}
                className='fa fa-upload roundedButton pull-right'
              />
            </OverlayTrigger>
          </div>
        </div>
        {!loader ? (
          dbData && dbData.length > 0 ? (
            creditCardMassageConfig
              .sort((a, b) => a.id > b.id)
              .map((t, i) => (
                <BackendCore
                  key={i}
                  id={"ccTable"}
                  Table={t.Table}
                  config={t.config}
                  TableRows={t.TableRows}
                  TableAliasRows={t.TableAliasRows}
                  dbData={dbData}
                  rowElements={t.rowElements}
                  showTotal={t.showTotal}
                  rowKeyUp={t.rowKeyUp}
                  postApiUrl='/account_planner/postAccountPlanner'
                  onPostApi={response => onPostApi(response)}
                  showTooltipFor={t.showTooltipFor}
                  defaultValues={t.defaultValues}
                  onReFetchData={onReFetchData}
                  insertCloneData={insertCloneData}
                  cellWidth={[4, 13, 8, 8, 8, 8, 8, 8, 13, 13, 13, 13, 10]}
                  ajaxButtonName={intl.formatMessage({
                    id: "submit",
                    defaultMessage: "submit",
                  })}
                  appIdKeyValue={{
                    key: "cc_appId",
                    value: userContext.userConfig.appId,
                  }}
                  theme={userContext.userData.theme}
                />
              ))
          ) : (
            <div className='py-3 text-center'>
              <FormattedMessage
                id='noRecordsGenerated'
                defaultMessage='noRecordsGenerated'
              />
            </div>
          )
        ) : (
          <div className='relativeSpinner'>
            <Loader
              type={helpers.loadRandomSpinnerIcon()}
              color={document.documentElement.style.getPropertyValue(
                "--app-theme-bg-color",
              )}
              height={100}
              width={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

TypeCreditCardExpenditure.propTypes = {
  property: PropTypes.string,
};
TypeCreditCardExpenditure.defaultProps = {
  property: "String name",
};

export default injectIntl(TypeCreditCardExpenditure);
