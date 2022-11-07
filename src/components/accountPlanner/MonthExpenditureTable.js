/* eslint-disable new-cap */
/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { monthExpenditureConfig } from '../configuration/backendTableConfig';
import BackendCore from '../../components/configuration/backend/BackendCore';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PlanInfoModal from './PlanInfoModal';
import TallyModal from './TallyModal';
import Loader from 'react-loader-spinner';
import { AccountContext } from './AccountPlanner';
import CsvDownloader from 'react-csv-downloader';
import { injectIntl } from 'react-intl';

const MonthExpenditureTable = (props, context) => {
  const accountContext = useContext(AccountContext);
  const { monthYearSelected, bankSelected, intl, ...rest } = props;
  const [insertData, setInsertData] = useState([]);
  const [planCards, setPlanCards] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [totals, setTotals] = useState([]);
  const [openPlanModal, setOpenPlanModal] = useState(false); // change to false
  const [openTallyModal, setOpenTallyModal] = useState(false); // change to false
  const [selectedPlan, setSelectedPlan] = useState({});
  const columns = [
    { displayName: 'Transaction', id: 'inc_exp_name' },
    { displayName: 'Date', id: 'inc_exp_date' },
    { displayName: 'Type', id: 'inc_exp_type' },
    { displayName: 'Amount', id: 'inc_exp_amount' },
  ];
  const now = helpers.getNow();

  const getAllApi = () => {
    setDbData([]);
    const [smonth, year] = monthYearSelected.split('-');
    const month = helpers.strToNumMonth[smonth];
    const calDays = new Date(year, month, 0).getDate();
    const wClause = `inc_exp_date between "${year}-${month}-01" and "${year}-${month}-${calDays}" and inc_exp_bank = ${bankSelected}`;
    const a = getBackendAjax(wClause);
    const b = getDropDownAjax('/account_planner/inc_exp_list');
    const c = getDropDownAjax('/account_planner/bank_list');
    Promise.all([a, b, c]).then(async r => {
      setInsertData([]);
      setDbData(r[0].data.response);
      monthExpenditureConfig[0].rowElements[6] = r[1];
      monthExpenditureConfig[0].rowElements[7] = r[2];
      monthExpenditureConfig[0].rowElements[4] = {
        radio: {
          radioList: [
            { label: intl.formatMessage({ id: 'credit' }), value: 'Cr', checked: false },
            { label: intl.formatMessage({ id: 'debit' }), value: 'Dr', checked: true },
          ],
        },
      }
    });
  };

  useEffect(() => {
    calculatePlanning(dbData);
  }, [intl]);

  useEffect(() => {
    getAllApi();
  }, [monthYearSelected, bankSelected]);

  const onReFetchData = () => {
    getAllApi();
  };

  useEffect(() => {
    calculatePlanning(dbData);
  }, [dbData]);

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
    formdata.append('TableRows', monthExpenditureConfig[0].TableRows);
    formdata.append('Table', monthExpenditureConfig[0].Table);
    if (wClause) {
      formdata.append('WhereClause', wClause);
    }
    return apiInstance.post('/account_planner/getAccountPlanner', formdata);
  };

  const getTemplate = () => {
    return apiInstance
      .get('/account_planner/getIncExpTemplate')
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };
  const renderCloneTooltip = (props, content) => (
    <Tooltip id="button-tooltip-1" className="in show" {...rest}>
      {content}
    </Tooltip>
  );

  const cloneFromTemplate = () => {
    const a = getTemplate();
    Promise.all([a]).then(r => {
      const data = r[0];
      const insertData = data.map(
        ({ temp_inc_exp_name, temp_amount, temp_inc_exp_type, temp_inc_exp_date }) => {
          return {
            inc_exp_id: '',
            inc_exp_name: temp_inc_exp_name,
            inc_exp_amount: 0,
            inc_exp_plan_amount: temp_amount,
            inc_exp_type: temp_inc_exp_type,
            inc_exp_date: helpers.getNextMonthDate(temp_inc_exp_date),
            inc_exp_category: '',
            inc_exp_bank: '',
            inc_exp_comments: '',
          };
        }
      );
      setInsertData(insertData);
    });
  };

  const calculatePlanning = dbData => {
    const plan = dbData
      .map(data => {
        data.inc_exp_plan_amount = Number(data.inc_exp_plan_amount);
        data.inc_exp_amount = Number(data.inc_exp_amount);
        return data;
      })
      .reduce(
        (a, b) => {
          if (b.inc_exp_type === 'Cr') {
            a.incomeTotal += b.inc_exp_amount;
          }
          if (b.inc_exp_type === 'Dr') {
            a.expenseTotal += b.inc_exp_amount;
            a.planTotal += b.inc_exp_plan_amount;
          }
          let diff = b.inc_exp_plan_amount / b.inc_exp_amount;
          diff = Number(
            ((diff === Infinity || isNaN(diff) ? 0 : diff) * 100).toFixed(2)
          );
          a.totalPlans.push(diff);
          const rest = {
            percent: diff,
            ...b,
          };
          if (diff === 0) {
            a.noPlans.push(rest);
          }
          if (diff === 100) {
            a.achievedPlans.push(rest);
          }
          if (diff > 100) {
            a.goodPlans.push(rest);
          }
          if (diff < 100 && diff > 0) {
            a.badPlans.push(rest);
          }

          return a;
        },
        {
          planTotal: 0,
          expenseTotal: 0,
          incomeTotal: 0,
          totalPlans: [],
          goodPlans: [],
          badPlans: [],
          noPlans: [],
          achievedPlans: [],
        }
      );

    const totals = [
      { amount: plan.incomeTotal, label: intl.formatMessage({ id: 'income' }), flagString: 'success' },
      { amount: plan.expenseTotal, label: intl.formatMessage({ id: 'expense' }), flagString: 'info' },
      {
        amount: plan.incomeTotal - plan.expenseTotal,
        label: intl.formatMessage({ id: 'balance' }),
        flagString: 'danger',
      },
      { amount: plan.planTotal, label: intl.formatMessage({ id: 'planning' }), flagString: 'warning' },
    ];
    setTotals(totals);
    const cards = [
      {
        key: 'goodPlans',
        flagString: 'success',
        planString: intl.formatMessage({ id: 'goodPlans' }),
        planArray: plan.goodPlans,
      },
      {
        key: 'achievedPlans',
        flagString: 'info',
        planString: intl.formatMessage({ id: 'achievedPlans' }),
        planArray: plan.achievedPlans,
      },
      {
        key: 'badPlans',
        flagString: 'danger',
        planString: intl.formatMessage({ id: 'badPlans' }),
        planArray: plan.badPlans,
      },
      {
        key: 'noPlans',
        flagString: 'warning',
        planString: intl.formatMessage({ id: 'noPlans' }),
        planArray: plan.noPlans,
      },
    ];
    setPlanCards(cards);
  };

  const config = monthExpenditureConfig.map(crud => {
    const obj = {
      header: {
        searchPlaceholder: intl.formatMessage({ id: 'searchHere' }),
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: 'total' }),
          locale: 'en-IN',
          currency: 'INR',
          maxDecimal: 2,
          doubleEntryBalanceStrings: {
            zero: intl.formatMessage({ id: 'solved' }),
            plus: intl.formatMessage({ id: 'ahead' }),
            minus: intl.formatMessage({ id: 'balance' }),
          },
        },
        pagination: {
          currentPage: 'last',
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    };
    crud.config = obj;
    crud.TableAliasRows = [
      'id',
      'transaction',
      'amount',
      'plan',
      'type',
      'date',
      'category',
      'bank',
      'comments',
    ].map(al => intl.formatMessage({ id: al }))
    crud.showTotal = [
      {
        whichKey: 'inc_exp_amount',
        forKey: 'inc_exp_type',
        forCondition: 'equals', // includes or equals
        forValue: [{ key: 'credit', value: 'Cr' }, { key: 'debit', value: 'Dr' }],
        showDifference: { indexes: [0, 1], showStability: true },
        // Ex:
        // 1. difference result = "Cr - Dr = Balance" Ex: "1000 - 750 = 250"
        // 2. showStability: (Settled), (Ahead), (YetTo) strings will be shown
      },
      {
        whichKey: 'inc_exp_plan_amount',
        forKey: 'inc_exp_type',
        forCondition: 'equals',
        forValue: [{ key: 'credit', value: 'Cr' }, { key: 'debit', value: 'Dr' }],
        showDifference: { indexes: [0, 1], showStability: true },
      },
    ]
    return crud;
  });

  const getPlanAmount = planArray =>
    planArray.reduce(
      (x, y) => x + (y.inc_exp_plan_amount - y.inc_exp_amount),
      0
    );

  const exportToPdf = () => {
    const body = dbData.map(
      (
        {
          inc_exp_name,
          inc_exp_amount,
          inc_exp_plan_amount,
          inc_exp_type,
          inc_exp_date,
          inc_exp_comments,
        },
        i
      ) => {
        return [
          i + 1,
          inc_exp_name,
          inc_exp_amount,
          inc_exp_plan_amount,
          inc_exp_type,
          inc_exp_date,
          inc_exp_comments,
        ];
      }
    );
    const head = [
      '#',
      'Transaction',
      'Amount',
      'Planned',
      'Type',
      'Date',
      'Comments',
    ];
    const doc = new jsPDF();
    doc.text(
      `${helpers.stringToCapitalize(
        monthExpenditureConfig[0].Table
      )} (${monthYearSelected})`,
      15,
      10
    );
    doc.autoTable({
      styles: { overflow: 'linebreak' },
      theme: 'grid',
      head: [head],
      body: [...body],
    });

    const mTotal = totals.map(total => helpers.lacSeperator(total.amount));
    doc.autoTable({
      styles: { overflow: 'linebreak', halign: 'center' },
      theme: 'striped',
      head: [['Income', 'Expense', 'Balance', 'Planning']],
      body: [mTotal],
    });

    const pTotal = planCards.map(plan =>
      helpers.lacSeperator(getPlanAmount(plan.planArray))
    );
    doc.autoTable({
      styles: { overflow: 'linebreak', halign: 'center' },
      theme: 'striped',
      head: [['Good Plans', 'Achieved Plans', 'Bad Plans', 'No Plans']],
      body: [pTotal],
    });

    doc.save(`${monthExpenditureConfig[0].Table}-${now}`);
  };

  const onPlanClick = key => {
    const [smonth, year] = monthYearSelected.split('-');
    const month = helpers.strToNumMonth[smonth];
    const calDays = new Date(year, month, 0).getDate();
    let clause = {
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-${calDays}`,
      bankSelected,
    };
    switch (key) {
      case 'goodPlans':
        clause = { ...clause, label: 'Good plans', criteria: `G100` };
        break;
      case 'achievedPlans':
        clause = { ...clause, label: 'Achieved plans', criteria: `E100` };
        break;
      case 'badPlans':
        clause = { ...clause, label: 'Bad plans', criteria: `0TO100` };
        break;
      case 'noPlans':
        clause = { ...clause, label: 'No plans', criteria: `E0` };
        break;
      default:
    }
    setOpenPlanModal(true);
    setSelectedPlan(clause);
  };

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

  return (
    <div className="settings">
      {openPlanModal && (
        <PlanInfoModal
          className="planInfoModal"
          show={openPlanModal}
          onHide={() => setOpenPlanModal(false)}
          size="lg"
          animation={false}
          monthYearSelected={monthYearSelected}
          bankSelected={bankSelected}
          selectedPlan={selectedPlan}
        />
      )}
      {openTallyModal && (
        <TallyModal
          className="planInfoModal"
          show={openTallyModal}
          onHide={() => setOpenTallyModal(false)}
          size="sm"
          totals={totals}
          animation={false}
        />
      )}
      <div className="">
        {monthYearSelected && bankSelected && dbData.length > 0 ? (
          <>
            <div className="buttonGrid">
              {monthYearSelected && dbData && (
                <>
                  <h6>
                    {`${intl.formatMessage({ id: monthYearSelected.split("-")[0].toLowerCase() })} ${monthYearSelected.split("-")[1]}`}
                  </h6>
                  <div>
                    <div>
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(props, 'Clone from template')}
                        triggerType="hover"
                      >
                        <i
                          onClick={() => cloneFromTemplate()}
                          className="fa fa-copy roundedButton pull-right"
                        />
                      </OverlayTrigger>
                    </div>
                    <div>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(props, 'Export PDF')}
                        triggerType="hover"
                      >
                        <i
                          onClick={() => exportToPdf()}
                          className="fa fa-file-pdf-o roundedButton pull-right"
                        />
                      </OverlayTrigger>
                    </div>

                    <CsvDownloader
                      datas={helpers.stripCommasInCSV(dbData)}
                      filename={`Income-Expense-${now}.csv`}
                      columns={columns}
                    >
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(props, 'Export CSV')}
                        triggerType="hover"
                      >
                        <i className="fa fa-file-excel-o roundedButton pull-right" />
                      </OverlayTrigger>
                    </CsvDownloader>
                    <div>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderCloneTooltip(props, 'Tally')}
                        triggerType="hover"
                      >
                        <i
                          onClick={() => setOpenTallyModal(true)}
                          className="fa fa-text-width roundedButton pull-right"
                        />
                      </OverlayTrigger>
                    </div>
                  </div>
                </>
              )}
            </div>
            {config
              .sort((a, b) => a.id > b.id)
              .map((t, i) => (
                <BackendCore
                  key={i}
                  config={t.config}
                  Table={t.Table}
                  TableRows={t.TableRows}
                  TableAliasRows={t.TableAliasRows}
                  rowElements={t.rowElements}
                  showTotal={t.showTotal}
                  rowKeyUp={t.rowKeyUp}
                  dbData={dbData}
                  postApiUrl="/account_planner/postAccountPlanner"
                  onPostApi={response => onPostApi(response)}
                  insertCloneData={insertData}
                  showTooltipFor={t.showTooltipFor}
                  defaultValues={t.defaultValues}
                  onTableUpdate={data => {
                    // setDbData(data);
                    calculatePlanning(data);
                  }}
                  onReFetchData={onReFetchData}
                  cellWidth="12rem"
                  ajaxButtonName={intl.formatMessage({ id: 'submit' })}
                />
              ))}
            <div>
              <div className="row">
                {totals.map(total => (
                  <div key={total.label} className="col-md-3 col-6 py-4">
                    <div className="">
                      <div className="">
                        <div className={`p-6 text-center`}>
                          <h5>{total.label}</h5>
                        </div>
                      </div>
                      <div className={``}>
                        <div className={`text-center text-${total.flagString}`}>
                          {helpers.countryCurrencyLacSeperator(
                            'en-IN',
                            'INR',
                            total.amount,
                            2
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                {planCards.map(plan => (
                  <div key={plan.key} className="col-md-3 col-6 py-4">
                    <div className="">
                      <div className="">
                        <div className={`p-6 text-center`}>
                          <h5>
                            {plan.planString}
                            <sup
                              className={`superScript text-${plan.flagString}`}
                            >
                              {plan.planArray.length}
                            </sup>
                          </h5>
                        </div>
                      </div>
                      <div className={``}>
                        <div className={`text-center text-${plan.flagString}`}>
                          <button
                            onClick={() => onPlanClick(plan.key)}
                            className={`btn btn-sm btn-${plan.flagString}`}
                          >
                            {helpers.countryCurrencyLacSeperator(
                              'en-IN',
                              'INR',
                              getPlanAmount(plan.planArray),
                              2
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
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

MonthExpenditureTable.propTypes = {
  property: PropTypes.string,
};
MonthExpenditureTable.defaultProps = {
  property: 'String name',
};

export default injectIntl(MonthExpenditureTable);
