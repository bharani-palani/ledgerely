import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, useAccordionButton, Tooltip, OverlayTrigger } from 'react-bootstrap';
import BackendCore from '../../components/configuration/backend/BackendCore';
import { crudFormArray } from '../configuration/backendTableConfig';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { UserContext } from '../../contexts/UserContext';
import { injectIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import _ from 'lodash';
import CsvDownloader from 'react-csv-downloader';

const CreateModule = (props) => {
  const { intl } = props;
  const [collapse, setCollapse] = useState('');
  const [dbData, setDbData] = useState([]);
  const [bool, setBool] = useState(true);
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const currencies = _.uniqBy(localeContext.localeList.map(l => ({ id: l.currency, value: l.currency })), 'id').sort((a, b) => (a.id < b.id ? -1 : 1));
  const locales = _.uniqBy(localeContext.localeList.map(l => ({ id: l.language, value: l.language })), 'id').sort((a, b) => (a.language < b.language ? -1 : 1));
  const defaultData = {
    banks: [{
      "bank_id": "",
      "bank_name": "",
      "bank_account_number": "",
      "bank_ifsc_code": "",
      "bank_card_no": "",
      "bank_card_validity": "",
      "isPrimaryAccount": "0",
      "bank_locale": "",
      "bank_currency": ""
    }],
    credit_cards: [{
      'credit_card_id': "",
      'credit_card_name': "",
      'credit_card_number': "",
      'credit_card_start_date': "",
      'credit_card_end_date': "",
      'credit_card_payment_date': "",
      'credit_card_annual_interest': "",
      'credit_card_locale': "",
      'credit_card_currency': "",
    }],
    income_expense_category: [{ 'inc_exp_cat_id': "", 'inc_exp_cat_name': "" }],
    income_expense_template: [{
      'template_id': "",
      'temp_inc_exp_name': "",
      'temp_amount': "",
      'temp_inc_exp_type': "Dr",
      'temp_inc_exp_date': "1",
    }]
  }

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append('TableRows', TableRows);
    formdata.append('Table', Table);
    return apiInstance.post('/account_planner/getAccountPlanner', formdata);
  };

  const onToggle = async t => {
    setDbData([]);
    const a = getBackendAjax(t.Table, t.TableRows);
    Promise.all([a]).then(async r => {
      r[0].data.response.length > 0 ? setDbData(r[0].data.response) : setDbData(defaultData[t.Table]);
      setCollapse(t.label);
    });
  };

  const loaderComp = () => {
    return (
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
    );
  };
  const onPostApi = response => {
    const { status, data } = response;
    if (status) {
      response && data && data.response
        ? userContext.renderToast({ message: intl.formatMessage({ id: 'transactionSavedSuccessfully' }) })
        : userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: intl.formatMessage({ id: 'noFormChangeFound' }),
        });
    } else {
      userContext.renderToast({
        type: 'error',
        icon: 'fa fa-times-circle',
        message: intl.formatMessage({ id: 'unableToReachServer' }),
      });
    }
  };

  const alias = {
    bankAccounts: [
      'id',
      'bank',
      'accountNumber',
      'ifscCode',
      'cardNumber',
      'validity',
      'primaryAccount',
      'localeLanguage',
      'localeCurrency'
    ],
    creditCardAccounts: [
      'id',
      'name',
      'cardNumber',
      'startDate',
      'endDate',
      'payDate',
      'annuaInterestRate',
      'localeLanguage',
      'localeCurrency'
    ],
    incExpCat: ['id', 'name'],
    incExpTemp: ['id', 'name', 'amount', 'type', 'date'],
  };

  useEffect(() => {
    setBool(false);
    setTimeout(() => {
      setBool(true);
    }, 100);
  }, [intl])

  const rElements = {
    bankAccounts: [
      'checkbox',
      'textbox',
      'textbox',
      'textbox',
      'textbox',
      'textbox',
      {
        radio: {
          radioList: [
            { label: intl.formatMessage({ id: 'yes' }), value: '1', checked: false },
            { label: intl.formatMessage({ id: 'no' }), value: '0', checked: true },
          ],
        },
      },
      {
        fetch: {
          dropDownList: locales,
        },
      },
      {
        fetch: {
          dropDownList: currencies,
        },
      },
    ],
    creditCardAccounts: [
      'checkbox',
      'textbox',
      'textbox',
      'number',
      'number',
      'number',
      'number',
      {
        fetch: {
          dropDownList: locales,
        },
      },
      {
        fetch: {
          dropDownList: currencies,
        },
      },
    ],
    incExpCat: ['checkbox', 'textbox'],
    incExpTemp: [
      'checkbox',
      'textbox',
      'number',
      {
        radio: {
          radioList: [
            { label: intl.formatMessage({ id: 'credit' }), value: 'Cr', checked: false },
            { label: intl.formatMessage({ id: 'debit' }), value: 'Dr', checked: true },
          ],
        },
      },
      {
        fetch: {
          dropDownList: new Array(25).fill("_").map((_, i) => ({ checked: String(i + 1) === "1", id: String(i + 1), value: String(i + 1) })),
        },
      },
    ],
  };

  const shTotal = {
    bankAccounts: null,
    creditCardAccounts: null,
    incExpCat: null,
    incExpTemp: [
      {
        whichKey: 'temp_amount',
        forKey: 'temp_inc_exp_type',
        forCondition: 'equals',
        forValue: [{ key: 'credit', value: 'Cr' }, { key: 'debit', value: 'Dr' }],
        showDifference: { indexes: [0, 1], showStability: false },
      },
    ],
  }

  const crudFormMassageArray = crudFormArray.map(crud => {
    const obj = {
      header: {
        searchPlaceholder: intl.formatMessage({ id: 'searchHere' }),
      },
      footer: {
        total: {
          locale: localeContext.localeLanguage,
          currency: localeContext.localeCurrency,
          maxDecimal: 2,
        },
        pagination: {
          currentPage: 'last',
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    };
    crud.config = obj;
    crud.TableAliasRows = alias[crud.id].map(al => intl.formatMessage({ id: al }));
    crud.rowElements = rElements[crud.id];
    crud.showTotal = shTotal[crud.id];
    return crud;
  });

  function CustomToggle({ children, eventKey, object }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      onToggle(object)
    );

    return (
      <button
        type="button"
        className={`col-12 text-start btn ${userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-white'
          }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const renderCloneTooltip = (props, content) => (
    <Tooltip id={`button-tooltip-${Math.random()}`} className="in show">
      {content}
    </Tooltip>
  );

  return (
    <div className="settings">
      <Accordion bsPrefix="util" defaultActiveKey={1} className="">
        {crudFormMassageArray
          .sort((a, b) => a.id - b.id)
          .map((t, i) => (
            <Card
              key={t.id}
              className={`my-2 ${userContext.userData.theme === 'dark'
                ? 'bg-dark text-white'
                : 'bg-white text-dark'
                }`}
            >
              <Card.Header className="row m-0">
                <CustomToggle eventKey={t.id} object={t}>
                  {intl.formatMessage({ id: t.id })}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={t.id}>
                <Card.Body>
                  {t.label === collapse && bool ? (
                    <div className="pt-10">
                      <div className='text-end pb-2'>
                        {dbData.length > 0 && <CsvDownloader
                          datas={helpers.stripCommasInCSV(dbData)}
                          filename={`${t.id}.csv`}
                        >
                            <OverlayTrigger
                              placement="left"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderCloneTooltip(props, intl.formatMessage({ id: 'download' }))}
                              triggerType="hover"
                            >
                              <i className='fa fa-download roundedButton' />
                            </OverlayTrigger>
                        </CsvDownloader>}
                      </div>
                      <BackendCore
                        key={i}
                        config={t.config}
                        Table={t.Table}
                        TableRows={t.TableRows}
                        TableAliasRows={t.TableAliasRows}
                        showTotal={t.showTotal}
                        rowElements={t.rowElements}
                        defaultValues={t.defaultValues}
                        dbData={dbData}
                        postApiUrl="/account_planner/postAccountPlanner"
                        onPostApi={response => onPostApi(response)}
                        onReFetchData={() => onToggle(t)}
                        cellWidth="12rem"
                        ajaxButtonName={intl.formatMessage({ id: 'submit' })}
                      />
                    </div>
                  ) : (
                    loaderComp()
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </div>
  );
};

CreateModule.propTypes = {
  property: PropTypes.string,
};
CreateModule.defaultProps = {
  property: 'String name',
};

export default injectIntl(CreateModule);
