import React, { useEffect, useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import Switch from "react-switch";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";
import { AccountContext } from "./AccountPlanner";
import { UserContext } from "../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import { MyAlertContext } from "../../contexts/AlertContext";
import helpers from "../../helpers";
import moment from "moment";

const FastShopping = props => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const [date, setDate] = useState(new Date());
  const [transaction, setTransaction] = useState("");
  const [comments, setComments] = useState("");
  const [amount, setAmount] = useState("0");
  const [type, setType] = useState(true);
  const [cardType, setCardType] = useState(true);
  const [bankList, setBankList] = useState([]);
  const [ccBankList, setCcBankList] = useState([]);
  const [bank, setBank] = useState("");

  const [incExpList, setIncExpList] = useState([]);
  const [incExp, setIncExp] = useState("");
  const [ccBank, setCcBank] = useState("");
  const [isDecimal, setIsDecimal] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const delIcon = "&Lang;";
  const numPads = [
    { 1: intl.formatMessage({ id: "1", defaultMessage: "1" }) },
    { 2: intl.formatMessage({ id: "2", defaultMessage: "2" }) },
    { 3: intl.formatMessage({ id: "3", defaultMessage: "3" }) },
    { 4: intl.formatMessage({ id: "4", defaultMessage: "4" }) },
    { 5: intl.formatMessage({ id: "5", defaultMessage: "5" }) },
    { 6: intl.formatMessage({ id: "6", defaultMessage: "6" }) },
    { 7: intl.formatMessage({ id: "7", defaultMessage: "7" }) },
    { 8: intl.formatMessage({ id: "8", defaultMessage: "8" }) },
    { 9: intl.formatMessage({ id: "9", defaultMessage: "9" }) },
    { "&Lang;": delIcon },
    { 0: intl.formatMessage({ id: "0", defaultMessage: "0" }) },
    { ".": "." },
    { C: "C" },
  ];

  const loaderComp = () => {
    return (
      <div className='relativeSpinner'>
        <Loader />
      </div>
    );
  };

  const getBankList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/bank_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const getIncExpList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/inc_exp_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const getCcBankList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/credit_card_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const a = getBankList();
    const b = getIncExpList();
    const c = getCcBankList();
    Promise.all([a, b, c]).then(r => {
      r[0].length > 0 ? setBankList(r[0]) : setBankList([{ id: null, value: "NULL" }]);
      r[0].length > 0 && r[0][0].id ? setBank(r[0][0].id) : setBank("");
      r[1].length > 0 ? setIncExpList(r[1]) : setIncExpList([{ id: null, value: "NULL" }]);
      r[1].length > 0 && r[1][0].id ? setIncExp(r[1][0].id) : setIncExp("");
      r[2].length > 0 ? setCcBankList(r[2]) : setCcBankList([{ id: null, value: "NULL" }]);
      r[2].length > 0 && r[2][0].id ? setCcBank(r[2][0].id) : setCcBank("");
    });
  }, []);

  const objectToDate = date => {
    const [YYYY, MM, DD] = [
      date.getFullYear(),
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
      date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`,
    ];
    const dateString = `${YYYY}-${MM}-${DD}`;
    return dateString;
  };
  const onNumPadClick = digit => {
    let newDigit = amount;
    if (typeof digit === "number") {
      newDigit = !isDecimal ? `${amount}${digit}` : `${newDigit}.${digit}`;
      setIsDecimal(false);
    }
    if (digit === ".") {
      setIsDecimal(true);
      if (newDigit.substring(0, 1) === "0") {
        newDigit = "0" + newDigit;
      }
    }
    if (newDigit.length > 0 && newDigit.substring(0, 1) === "0" && !newDigit.includes(".")) {
      newDigit = newDigit.substring(1, newDigit.length);
    }
    if (newDigit.length > 0 && newDigit.substring(0, 1) === ".") {
      newDigit = `0${newDigit}`;
    }
    if (digit === "C") {
      newDigit = "0";
      setIsDecimal(false);
    }
    if (digit === delIcon) {
      newDigit = newDigit.length > 1 ? newDigit.slice(0, -1) : "0";
      if (newDigit.length > 0 && newDigit.slice(newDigit.length - 1) === ".") {
        newDigit = newDigit.slice(0, -1);
        setIsDecimal(false);
      }
    }
    setAmount(newDigit);
  };
  const saveExpense = () => {
    setBtnLoader(true);
    const postData = {
      Table: cardType ? "income_expense" : "credit_card_transactions",
      insertData: cardType
        ? [
            {
              inc_exp_id: null,
              inc_exp_appId: userContext.userConfig.appId,
              inc_exp_name: transaction,
              inc_exp_amount: amount,
              inc_exp_plan_amount: 0,
              inc_exp_type: type ? "Dr" : "Cr",
              inc_exp_date: objectToDate(date),
              inc_exp_category: incExp,
              inc_exp_bank: bank,
              inc_exp_comments: comments,
            },
          ]
        : [
            {
              cc_id: null,
              cc_appId: userContext.userConfig.appId,
              cc_transaction: transaction,
              cc_date: objectToDate(date),
              cc_opening_balance: 0,
              cc_payment_credits: !type ? amount : 0,
              cc_purchases: type ? amount : 0,
              cc_taxes_interest: 0,
              cc_for_card: ccBank,
              cc_inc_exp_cat: incExp,
              cc_comments: comments,
              cc_transaction_status: 0,
            },
          ],
    };
    const formdata = new FormData();
    document.getElementById("transactForm").reset();
    formdata.append("postData", JSON.stringify(postData));
    apiInstance
      .post("/account_planner/postAccountPlanner", formdata)
      .then(response => {
        const { data } = response;
        if (response && data && typeof data.response === "boolean" && data.response !== null && data.response) {
          accountContext.renderToast({
            message: intl.formatMessage({
              id: "transactionSavedSuccessfully",
              defaultMessage: "transactionSavedSuccessfully",
            }),
          });
        }
        if (response && data && typeof data.response === "boolean" && data.response !== null && data.response === false) {
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
          props.onHide(false);
        }
        setAmount("0");
        setTransaction("");
        setComments("");
        if (document.getElementById("transactForm") != null) {
          document.getElementById("transactForm").reset();
        }
      })
      .catch(error => {
        accountContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
        console.log(error);
      })
      .finally(() => setBtnLoader(false));
  };

  const onTransactionGetCategory = useCallback(() => {
    if (transaction && incExpList.length > 0) {
      const selectedCat = incExpList.filter(inc => {
        const strings = transaction.split(" ");
        return strings.some(str => inc?.value?.toLowerCase().includes(str.toLowerCase()));
      });
      if (selectedCat.length > 0) {
        setIncExp(selectedCat[0]?.id);
      }
    }
  }, [incExpList, transaction]);

  return (
    <Modal {...props} style={{ zIndex: 10000 }} enforceFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id='fastShopping' defaultMessage='fastShopping' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`react-responsive-ajax-data-table rounded-bottom ${
          userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
        }`}
      >
        <form id='transactForm' onSubmit={e => e.preventDefault()}>
          <div className=''>
            <input
              type='text'
              className='form-control'
              placeholder={intl.formatMessage({
                id: "transaction",
                defaultMessage: "transaction",
              })}
              onChange={e => setTransaction(e.target.value)}
              onBlur={() => onTransactionGetCategory()}
            />
          </div>
          <div className='overflow text-end'>{amount}</div>
          <div className=''>
            <div className='numPads pb-2'>
              {numPads.map((digit, i) => {
                const m = !isNaN(Number(Object.keys(digit)[0])) ? Number(Object.keys(digit)[0]) : Object.keys(digit)[0];
                const val = Object.values(digit)[0];
                return (
                  <div key={i} className='text-center buttonContainer'>
                    <button
                      disabled={amount.toString().includes(".") && m === "."}
                      onClick={() => onNumPadClick(m)}
                      dangerouslySetInnerHTML={{ __html: val }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className='row py-2'>
            <div className='col-6 py-2 react-responsive-ajax-data-table'>
              <DateTimePicker
                onChange={value => {
                  setDate(value);
                }}
                value={date}
                format={`y-MM-dd`}
                required
                clearIcon={null}
                className='fastShoppingDatePicker'
                minDate={helpers.getCustomDayOfCustomMonth(1, 0)}
                maxDate={helpers.getCustomDayOfCustomMonth(moment(new Date()).daysInMonth(), 0)}
              />
            </div>
            <div className='col-6 py-2'>
              <div className='d-flex align-items-center'>
                <div onClick={() => setCardType(!cardType)} className=''>
                  {cardType
                    ? intl.formatMessage({
                        id: "debitCard",
                        defaultMessage: "debitCard",
                      })
                    : intl.formatMessage({
                        id: "creditCard",
                        defaultMessage: "creditCard",
                      })}
                </div>
                <i onClick={() => setCardType(!cardType)} className={`fa fa-circle ps-2 ${cardType ? "debit" : "credit"}`} />
              </div>
            </div>
          </div>
          <div className='py-2'>
            <input type='text' className='form-control' placeholder='Comments' onChange={e => setComments(e.target.value)} />
          </div>
          <div>
            {bankList.length > 0 && incExpList.length > 0 && ccBankList.length > 0 ? (
              <>
                <>
                  <div className='py-2'>
                    <div className='d-flex align-items-center justify-content-evenly'>
                      <div onClick={() => setType(true)} className=''>
                        <FormattedMessage id={cardType ? "expense" : "purchases"} defaultMessage={cardType ? "expense" : "purchases"} />
                      </div>
                      <Switch
                        onColor={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
                        offColor='#333'
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={20}
                        width={45}
                        onChange={() => setType(!type)}
                        checked={type === true}
                      />
                      <div onClick={() => setType(false)} className=''>
                        <FormattedMessage id={cardType ? "income" : "credits"} defaultMessage={cardType ? "income" : "credits"} />
                      </div>
                      <Switch
                        onColor={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
                        offColor='#333'
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={20}
                        width={45}
                        onChange={() => setType(!type)}
                        checked={type === false}
                      />
                    </div>
                  </div>
                  {cardType && (
                    <div className='py-2'>
                      <FilterSelect
                        key={1}
                        placeholder={intl.formatMessage({
                          id: "select",
                          defaultMessage: "select",
                        })}
                        onChange={(ind, value) => {
                          setBank(value);
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
                        value={bank}
                        type={"single"}
                        searchable={true}
                        theme={userContext.userData.theme}
                      />
                    </div>
                  )}
                </>
                {!cardType && (
                  <div className='py-2'>
                    <FilterSelect
                      key={1}
                      placeholder={intl.formatMessage({
                        id: "select",
                        defaultMessage: "select",
                      })}
                      onChange={(ind, value) => {
                        setCcBank(value);
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
                      value={ccBank}
                      type={"single"}
                      searchable={true}
                      theme={userContext.userData.theme}
                    />
                  </div>
                )}
                <div className='py-2'>
                  <FilterSelect
                    key={1}
                    placeholder={intl.formatMessage({
                      id: "select",
                      defaultMessage: "select",
                    })}
                    onChange={(ind, value) => {
                      setIncExp(value);
                    }}
                    element={{
                      fetch: {
                        dropDownList: incExpList.map(row => ({
                          id: row.id,
                          value: row.value,
                        })),
                      },
                      searchable: true,
                    }}
                    value={incExp}
                    type={"single"}
                    searchable={true}
                    theme={userContext.userData.theme}
                  />
                </div>
              </>
            ) : (
              loaderComp()
            )}
          </div>
          <div className='py-2'>
            <button disabled={!(Number(amount) > 0 && transaction && !btnLoader)} onClick={() => saveExpense()} className='btn btn-bni border-0'>
              {btnLoader ? <i className='fa fa-circle-o-notch fa-spin fa-fw' /> : <FormattedMessage id='submit' defaultMessage='submit' />}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

FastShopping.propTypes = {
  property: PropTypes.string,
};

export default FastShopping;
