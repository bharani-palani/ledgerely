import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { creditCardConfig } from '../configuration/backendTableConfig';
import BackendCore from '../../components/configuration/backend/BackendCore';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import { AccountContext } from './AccountPlanner';
import CreditCardModal from './CreditCardModal';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment';
import { LocaleContext } from '../../contexts/LocaleContext';

const TypeCreditCardExpenditure = props => {
  const accountContext = useContext(AccountContext);
  const localeContext = useContext(LocaleContext);
  const { ccMonthYearSelected, ccBankSelected, ccDetails, intl } = props;
  const [dateRanges, setDateRanges] = useState({});
  const [openCreditCardModal, setOpenCreditCardModal] = useState(false); // change to false
  const [dbData, setDbData] = useState([]);
  const [insertCloneData, setInsertCloneData] = useState([]);

  useEffect(() => {
    getAllApi();
  }, [ccMonthYearSelected, ccBankSelected, ccDetails]);

  const getAllApi = () => {
    const [smonth, year] = ccMonthYearSelected.split('-');
    const month = helpers.strToNumMonth[smonth];
    const ccStartDay = Number(ccDetails.credit_card_start_date);
    const ccEndDay = Number(ccDetails.credit_card_end_date);

    const eDate = new Date(
      `${Number(year)}-${Number(month)}-${ccEndDay}`.replace(/-/g, '/')
    );
    const eDateStr = `${eDate.getFullYear()}-${helpers.leadingZeros(
      eDate.getMonth() + 1
    )}-${helpers.leadingZeros(eDate.getDate())}`;

    const dateOffset = 24 * 60 * 60 * 1000 * 30; // 30 days
    let sDate = eDate.setTime(eDate.getTime() - dateOffset);
    sDate = new Date(sDate);
    sDate = new Date(sDate.setDate(ccStartDay));
    const sDateStr = `${sDate.getFullYear()}-${helpers.leadingZeros(
      sDate.getMonth() + 1
    )}-${helpers.leadingZeros(sDate.getDate())}`;

    const wClause = `cc_date between "${sDateStr}" and "${eDateStr}" and cc_for_card = ${ccBankSelected}`;
    setDateRanges({ sDateStr, eDateStr });

    setDbData([]);
    const a = getBackendAjax(wClause);
    const b = getDropDownAjax('/account_planner/credit_card_list');
    const c = getDropDownAjax('/account_planner/inc_exp_list');
    Promise.all([a, b, c]).then(async r => {
      setInsertCloneData([]);
      setDbData(r[0].data.response);
      creditCardConfig[0].rowElements[8] = r[1];
      creditCardConfig[0].rowElements[9] = r[2];
      creditCardConfig[0].rowElements[8].searchable = false;
    });
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id="button-tooltip-1" className="in show" {...props}>
      {content}
    </Tooltip>
  );

  const onReFetchData = () => {
    getAllApi();
  };

  const getDropDownAjax = url => {
    return apiInstance
      .get(url)
      .then(r => ({
        fetch: {
          dropDownList: [...r.data.response],
        },
      }))
      .catch(error => {
        console.log(error);
      });
  };

  const getBackendAjax = wClause => {
    const formdata = new FormData();
    formdata.append('TableRows', creditCardConfig[0].TableRows);
    formdata.append('Table', creditCardConfig[0].Table);
    if (wClause) {
      formdata.append('WhereClause', wClause);
    }
    return apiInstance.post('/account_planner/getAccountPlanner', formdata);
  };

  let payDate = Number(ccDetails.credit_card_payment_date);
  payDate = payDate < 10 ? `0${payDate}` : payDate;
  payDate = new Date(`${payDate}-${ccMonthYearSelected}`);
  payDate = helpers.addMonths(payDate, 1);

  let [yyyy, mmm, dd] = [
    payDate.getFullYear(),
    payDate.getMonth() + 1,
    payDate.getDate(),
  ];
  mmm = mmm < 10 ? `0${mmm}` : mmm;
  dd = dd < 10 ? `0${dd}` : dd;
  payDate = `${yyyy}-${mmm}-${dd}`;

  const onPostApi = response => {
    const { status, data } = response;
    if (status) {
      response && data && data.response
        ? accountContext.renderToast({
          message: intl.formatMessage({ id: 'transactionSavedSuccessfully' }),
        })
        : accountContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: intl.formatMessage({ id: 'noFormChangeFound' }),
        });
    } else {
      accountContext.renderToast({
        type: 'error',
        icon: 'fa fa-times-circle',
        message: intl.formatMessage({ id: 'unableToReachServer' }),
      });
    }
  };
  const creditCardMassageConfig = creditCardConfig.map(crud => {
    const obj = {
      header: {
        searchPlaceholder: intl.formatMessage({ id: 'searchHere' })
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: 'total' }),
          locale: localeContext.localeLanguage,
          currency: localeContext.localeCurrency,
          maxDecimal: 2,
        },
        pagination: {
          currentPage: 'first',
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    };
    crud.config = obj;
    crud.TableAliasRows = [
      'id',
      'transaction',
      'date',
      'openingBalance',
      'credits',
      'purchases',
      'taxesAndInterest',
      'balance',
      'cardNumber',
      'category',
      'status',
      'comments',
    ].map(al => intl.formatMessage({ id: al }))
    return crud;
  });

  const getMonthLocale = (r) => {
    let date = "";
    date = moment(r).format('MMM');;
    const first = date.toLocaleString('default', { month: "short" }).toLowerCase();
    const last = r.getFullYear();
    date = `${intl.formatMessage({ id: first })} ${last}`
    return date;
  }

  return (
    <div className="settings">
      {openCreditCardModal && (
        <CreditCardModal
          className="creditCardModal"
          show={openCreditCardModal}
          onHide={() => setOpenCreditCardModal(false)}
          size="xl"
          animation={false}
          onImport={data => {
            setInsertCloneData(data);
            setOpenCreditCardModal(false);
          }}
        />
      )}
      <div className="">
        {ccMonthYearSelected && dateRanges && ccDetails && payDate && (
          <>
            <div className="row mt-10">
              <div className="col-md-3 small d-flex justify-content-evenly">
                <span><FormattedMessage id="month" /></span>
                <span>{getMonthLocale(new Date(ccMonthYearSelected))}</span>
              </div>
              <div className="col-md-3 small d-flex justify-content-evenly">
                <span><FormattedMessage id="cardNumber" /></span>
                <span>{ccDetails.credit_card_number}</span>
              </div>
              <div className="col-md-3 small d-flex justify-content-evenly">
                <span><FormattedMessage id="cycle" /></span>
                <span>{dateRanges.sDateStr} to {dateRanges.eDateStr}</span>
              </div>
              <div className="col-md-3 small d-flex justify-content-evenly">
                <span><FormattedMessage id="payDate" /></span>
                <span>{payDate}</span>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-12">
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderCloneTooltip(props, intl.formatMessage({ id: 'importYourCreditCardStatement' }))}
                  triggerType="hover"
                >
                  <i
                    onClick={() => setOpenCreditCardModal(!openCreditCardModal)}
                    className="fa fa-upload roundedButton pull-right"
                  />
                </OverlayTrigger>
              </div>
            </div>
          </>
        )}
        {ccMonthYearSelected && ccBankSelected && dbData.length > 0 ? (
          creditCardMassageConfig
            .sort((a, b) => a.id > b.id)
            .map((t, i) => (
              <BackendCore
                key={i}
                Table={t.Table}
                config={t.config}
                TableRows={t.TableRows}
                TableAliasRows={t.TableAliasRows}
                dbData={dbData}
                rowElements={t.rowElements}
                showTotal={t.showTotal}
                rowKeyUp={t.rowKeyUp}
                postApiUrl="/account_planner/postAccountPlanner"
                onPostApi={response => onPostApi(response)}
                showTooltipFor={t.showTooltipFor}
                defaultValues={t.defaultValues}
                onReFetchData={onReFetchData}
                insertCloneData={insertCloneData}
                cellWidth="12rem"
                ajaxButtonName={intl.formatMessage({ id: 'submit' })}
              />
            ))
        ) : (
          <div className="relativeSpinner">
            <Loader
              type={helpers.loadRandomSpinnerIcon()}
              color={document.documentElement.style.getPropertyValue(
                '--app-theme-bg-color'
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
  property: 'String name',
};

export default injectIntl(TypeCreditCardExpenditure);
