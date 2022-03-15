import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import Switch from "react-switch";
import helpers from "../../helpers";
import apiInstance from "../../services/apiServices";
import SetBank from "./SetBank";
import SelectableContext from "react-bootstrap/SelectableContext";
import { Dropdown } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { UserContext } from "../../contexts/UserContext";

const FastShopping = props => {
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
  const [incExpStr, setIncExpStr] = useState("");
  const [ccBank, setCcBank] = useState("");
  const [ccBankStr, setCcBankStr] = useState("");
  const [isDecimal, setIsDecimal] = useState(false);
  const delIcon = "&Lang;";
  const numPads = [1, 2, 3, 4, 5, 6, 7, 8, 9, delIcon, 0, ".", "C"];
  const userContext = useContext(UserContext);

  const loaderComp = () => {
    return (
      <div className="relativeSpinner">
        <Loader
          type={helpers.LoadRandomSpinnerIcon()}
          color={helpers.fluorescentColor}
          height={100}
          width={100}
        />
      </div>
    );
  };

  const getBankList = () => {
    return apiInstance
      .get("/account_planner/bank_list")
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const getIncExpList = () => {
    return apiInstance
      .get("/account_planner/inc_exp_list")
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const getCcBankList = () => {
    return apiInstance
      .get("/account_planner/credit_card_list")
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
      setBankList(r[0]);
      setBank(r[0][0].id);
      setIncExpList(r[1]);
      setIncExp(r[1][0].id);
      setIncExpStr(r[1][0].value);
      setCcBankList(r[2]);
      setCcBank(r[2][0].id);
      setCcBankStr(r[2][0].value);
    });
  }, []);

  const objectToDate = date => {
    const [YYYY, MM, DD] = [
      date.getFullYear(),
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
      date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
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
    if (
      newDigit.length > 0 &&
      newDigit.substring(0, 1) === "0" &&
      !newDigit.includes(".")
    ) {
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
    const postData = {
      Table: cardType ? "income_expense" : "credit_card_transactions",
      insertData: cardType
        ? [
            {
              inc_exp_id: "",
              inc_exp_name: transaction,
              inc_exp_amount: amount,
              inc_exp_plan_amount: amount,
              inc_exp_type: type ? "Dr" : "Cr",
              inc_exp_date: objectToDate(date),
              inc_exp_category: incExp,
              inc_exp_bank: bank,
              inc_exp_comments: comments
            }
          ]
        : [
            {
              cc_id: "",
              cc_transaction: transaction,
              cc_date: objectToDate(date),
              cc_opening_balance: 0,
              cc_payment_credits: 0,
              cc_purchases: amount,
              cc_taxes_interest: 0,
              cc_expected_balance: amount,
              cc_for_card: ccBank,
              cc_comments: comments
            }
          ]
    };
    const formdata = new FormData();
    document.getElementById("transactForm").reset();
    formdata.append("postData", JSON.stringify(postData));
    apiInstance
      .post("/account_planner/postAccountPlanner", formdata)
      .then(res => {
        res.data.response
          ? userContext.renderToast({ message: "Transaction saved successfully" })
          : userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: "Oops.. No form change found"
          });
        setAmount("0");
        setTransaction("");
        setComments("");
        document.getElementById("transactForm").reset();
      })
      .catch(error => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: "Unable to reach server. Please try again later"
        });
        console.log(error);
      });
  };

  return (
    <Modal {...props} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title>Fast Shopping</Modal.Title>
      </Modal.Header>
      <Modal.Body className='rounded-bottom'>
        <form id="transactForm" onSubmit={e => e.preventDefault()}>
          <div className="">
            <input
              type="text"
              className="form-control"
              placeholder="Transaction"
              onChange={e => setTransaction(e.target.value)}
            />
          </div>
          <div className="overflow text-end">{amount}</div>
          <div className="">
            <div className="numPads form-group">
              {numPads.map((digit, i) => (
                <div key={i} className="text-center buttonContainer">
                  <button
                    disabled={amount.toString().includes(".") && digit === "."}
                    onClick={() => onNumPadClick(digit)}
                    dangerouslySetInnerHTML={{ __html: digit }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6 py-2">
              <DateTimePicker
                onChange={value => {
                  setDate(value);
                }}
                value={date}
                format={`y-MM-dd`}
                required
                clearIcon={null}
                className="fastShoppingDatePicker"
              />
            </div>
            <div className="col-6 py-2">
              <div className="d-flex align-items-center">
                <div
                  onClick={() => setCardType(!cardType)}
                  className=""
                >
                  {cardType ? "Debit" : "Credit"} Card
                </div>
                <i
                  onClick={() => setCardType(!cardType)}
                  className={`fa fa-circle ps-2 ${cardType ? "debit" : "credit"}`}
                />
              </div>
            </div>
          </div>
          <div className="py-2">
            <input
              type="text"
              className="form-control"
              placeholder="Comments"
              onChange={e => setComments(e.target.value)}
            />
          </div>
          {bankList.length > 0 &&
          incExpList.length > 0 &&
          ccBankList.length > 0 ? (
            cardType ? (
              <>
                <div className="py-2">
                  <div className="d-flex align-items-center justify-content-evenly">
                    <div
                      onClick={() => setType(true)}
                      className=""
                    >
                      Expense
                    </div>
                    <Switch
                      onColor={helpers.fluorescentColor}
                      offColor="#333"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      height={20}
                      width={45}
                      onChange={() => setType(!type)}
                      checked={type === true}
                    />
                    <div
                      onClick={() => setType(false)}
                      className=""
                    >
                      Income
                    </div>
                    <Switch
                      onColor={helpers.fluorescentColor}
                      offColor="#333"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      height={20}
                      width={45}
                      onChange={() => setType(!type)}
                      checked={type === false}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <SetBank
                    bankList={bankList}
                    onSelectBank={bank => setBank(bank)}
                  />
                </div>
                <div className="py-2">
                  <SelectableContext.Provider value={false}>
                    <Dropdown>
                      <Dropdown.Toggle>
                        {incExpStr} <i className="fa fa-chevron-down" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {incExpList.map((d, i) => (
                          <Dropdown.Item
                            key={i}
                            onClick={e => {
                              setIncExp(d.id);
                              setIncExpStr(d.value);
                            }}
                          >
                            {d.value}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </SelectableContext.Provider>
                </div>
              </>
            ) : (
              <div className="py-2">
                <SelectableContext.Provider value={false}>
                  <Dropdown>
                    <Dropdown.Toggle>
                      {ccBankStr} <i className="fa fa-chevron-down" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {ccBankList.map((d, i) => (
                        <Dropdown.Item
                          key={i}
                          onClick={e => {
                            setCcBank(d.id);
                            setCcBankStr(d.value);
                          }}
                        >
                          {d.value}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </SelectableContext.Provider>
              </div>
            )
          ) : (
            loaderComp()
          )}
          <div className="py-2">
            <button
              disabled={!(Number(amount) > 0 && transaction)}
              onClick={() => saveExpense()}
              className="btn btn-bni"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

FastShopping.propTypes = {
  property: PropTypes.string
};
FastShopping.defaultProps = {
  property: "String name"
};

export default FastShopping;
