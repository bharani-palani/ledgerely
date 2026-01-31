import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { AccountContext } from "./AccountPlanner";
import { FormattedMessage, useIntl } from "react-intl";
import useAxios from "../../services/apiServices";
import moment from "moment";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";

const FundTransferModal = props => {
  const { apiInstance } = useAxios();
  const accountContext = useContext(AccountContext);
  const { srcArr, ...rest } = props;
  const { incExpList } = accountContext;
  const [sources, setSources] = useState([]);
  const [dest, setDest] = useState([]);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    dest: "",
    description: intl.formatMessage({
      id: "fundTransfer",
      defaultMessage: "fundTransfer",
    }),
    category: "",
    availableFunds: 0,
  });

  useEffect(() => {
    if (srcArr && srcArr.length > 0) {
      setSources(srcArr);
    }
  }, [srcArr]);

  const onsubmit = () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("amount", formData.amount);
    formdata.append("source", formData.source);
    formdata.append("dest", formData.dest);
    const desc = `${formData.description} - ${intl.formatMessage({
      id: "sourceBank",
      defaultMessage: "sourceBank",
    })}: ${sources.filter(f => f.id === formData.source)[0].value}, ${intl.formatMessage({
      id: "destinationBank",
      defaultMessage: "destinationBank",
    })}: ${sources.filter(f => f.id === formData.dest)[0].value}`;
    formdata.append("description", desc);
    formdata.append("category", formData.category);
    formdata.append("date", moment(new Date()).format("YYYY-MM-DD"));
    formdata.append("dateTime", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("/account_planner/postFundTransfer", formdata)
      .then(response => {
        const { data } = response;
        if (response && data && data.response) {
          userContext.renderToast({
            message: intl.formatMessage({
              id: "fundTransferSuccess",
              defaultMessage: "fundTransferSuccess",
            }),
          });
          setFormData(ev => ({
            ...ev,
            source: "",
            dest: "",
            amount: "",
            category: "",
            description: intl.formatMessage({
              id: "fundTransfer",
              defaultMessage: "fundTransfer",
            }),
          }));
        } else {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "fundTransferFail",
              defaultMessage: "fundTransferFail",
            }),
          });
        }
      })
      .catch(err => {
        console.error(err);
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const postData = new FormData();
    postData.append("id", formData.source);
    postData.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("/account_planner/getFundDetails", postData)
      .then(res => {
        setFormData(ev => ({
          ...ev,
          availableFunds: res.data.response[0].availableFunds,
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }, [formData.source]);

  const onSourceChange = srcId => {
    const bSrc = [...sources];
    const des = bSrc.filter(f => f.id !== srcId);
    setDest(des);
    setFormData(ev => ({
      ...ev,
      source: srcId,
      dest: "",
      amount: "",
      category: "",
    }));
  };

  return (
    <Modal {...rest} style={{ zIndex: 10000 }}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id='fundTransfer' defaultMessage='fundTransfer' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`p-0 rounded-bottom ${userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}>
        <div className={`row m-0`}>
          <div className='col-5 pt-3'>
            <div className='py-3 text-center'>
              <div>
                <i className='fa fa-bank fa-3x' />
              </div>
              <small>
                <FormattedMessage id='sourceBank' defaultMessage='sourceBank' />
              </small>
            </div>
            <div className='form-floating mt-1'>
              <FilterSelect
                placeholder={`${intl.formatMessage({
                  id: "selectSourceAccount",
                  defaultMessage: "selectSourceAccount",
                })}`}
                onChange={(ind, value) => {
                  onSourceChange(value);
                }}
                element={{
                  fetch: {
                    dropDownList: sources.map(row => ({
                      id: row.id,
                      value: row.value,
                    })),
                  },
                  searchable: true,
                }}
                value={formData.source}
                type={"single"}
                searchable={true}
                theme={userContext.userData.theme}
              />
              {Number(formData.availableFunds) > 0 && (
                <small className='text-danger'>
                  <FormattedMessage id='balance' defaultMessage='balance' />:{Number(formData.availableFunds).toLocaleString()}
                </small>
              )}
            </div>
          </div>
          <div className='col-2 d-flex align-items-center justify-content-center'>
            <i className='fa fa-arrow-circle-right fa-3x' />
          </div>
          <div className='col-5 pt-3'>
            <div className='py-3 text-center'>
              <div>
                <i className='fa fa-bank fa-3x' />
              </div>
              <small>
                <FormattedMessage id='destinationBank' defaultMessage='destinationBank' />
              </small>
            </div>
            <div className='form-floating mt-1'>
              <FilterSelect
                placeholder={`${intl.formatMessage({
                  id: "selectDestinationAccount",
                  defaultMessage: "selectDestinationAccount",
                })}`}
                onChange={(ind, value) => {
                  setFormData(ev => ({ ...ev, dest: value }));
                }}
                element={{
                  fetch: {
                    dropDownList: dest.map(row => ({
                      id: row.id,
                      value: row.value,
                    })),
                  },
                  searchable: true,
                }}
                value={formData.dest}
                type={"single"}
                searchable={true}
                theme={userContext.userData.theme}
              />
            </div>
          </div>
          <div className='col-12 pt-3'>
            <div className='form-floating'>
              <FilterSelect
                placeholder={`${intl.formatMessage({
                  id: "category",
                  defaultMessage: "category",
                })}`}
                onChange={(ind, value) => {
                  setFormData(ev => ({ ...ev, category: value }));
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
                value={formData.category}
                type={"single"}
                searchable={true}
                theme={userContext.userData.theme}
              />
            </div>
          </div>
          <div className='col-12 pt-3'>
            <div className='form-floating'>
              <input
                id='amount'
                value={formData.amount}
                onChange={e => setFormData(ev => ({ ...ev, amount: e.target.value }))}
                placeholder={intl.formatMessage({
                  id: "amount",
                  defaultMessage: "amount",
                })}
                type='number'
                className='form-control form-control-sm'
              />
              <label htmlFor='amount' className='text-dark'>
                <FormattedMessage id='amount' defaultMessage='amount' />
              </label>
            </div>
          </div>
          <div className='col-12 py-3'>
            <button
              disabled={!(formData.dest && formData.amount && formData.source && formData.category && !loading)}
              className='btn btn-bni w-100 border-0'
              onClick={() => onsubmit()}
            >
              {!loading ? <FormattedMessage id='submit' defaultMessage='submit' /> : <i className='fa fa-spin fa-circle-o-notch' />}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FundTransferModal;
