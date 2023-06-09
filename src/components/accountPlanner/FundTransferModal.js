import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { AccountContext } from './AccountPlanner';
import { FormattedMessage, useIntl } from 'react-intl'
import apiInstance from '../../services/apiServices';
import moment from 'moment';

const FundTransferModal = props => {
  const accountContext = useContext(AccountContext);
  const { srcArr, ...rest } = props;
  const { incExpList } = accountContext;
  const [sources, setSources] = useState([]);
  const [dest, setDest] = useState([]);
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({
    amount: "",
    source: "", dest: "",
    description: intl.formatMessage({ id: 'fundTransfer', defaultMessage: 'fundTransfer' }),
    category: "",
    availableFunds: 0
  });

  useEffect(() => {
    if (srcArr && srcArr.length > 0) {
      setSources(srcArr);
    }
  }, [srcArr]);

  const onsubmit = () => {
    const formdata = new FormData();
    formdata.append('amount', formData.amount);
    formdata.append('source', formData.source);
    formdata.append('dest', formData.dest);
    formdata.append('description', `${formData.description}: ${sources.filter(f => f.id === formData.source)[0].value} -> ${sources.filter(f => f.id === formData.dest)[0].value}`);
    formdata.append('category', formData.category);
    formdata.append('date', moment(new Date()).format('YYYY-MM-DD'));
    formdata.append('dateTime', moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
    apiInstance
      .post('/account_planner/postFundTransfer', formdata)
      .then(response => {
        const { data } = response;
        if (response && data && data.response) {
          userContext.renderToast({ message: intl.formatMessage({ id: 'fundTransferSuccess', defaultMessage: 'fundTransferSuccess' }) });
          setFormData(ev => ({
            ...ev,
            source: "",
            dest: "",
            amount: "",
            category: "",
            description: intl.formatMessage({ id: 'fundTransfer', defaultMessage: 'fundTransfer' }),
          }))
        } else {
          userContext.renderToast({
            type: 'error',
            icon: 'fa fa-times-circle',
            message: intl.formatMessage({ id: 'fundTransferFail', defaultMessage: 'fundTransferFail' }),
          });
        }
      })
      .catch(err => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: intl.formatMessage({ id: 'unableToReachServer', defaultMessage: 'unableToReachServer' }),
        })
      })
  }
  useEffect(() => {
    const postData = new FormData();
    postData.append('id', formData.source);
    apiInstance
      .post('/account_planner/getFundDetails', postData)
      .then(res => {
        setFormData(ev => ({
          ...ev,
          availableFunds: res.data.response[0].availableFunds
        }));
      })
      .catch(err => {
        console.log(err)
      });
  }, [formData.source]);

  const onSourceChange = (srcId) => {
    const bSrc = [...sources];
    const des = bSrc.filter(f => f.id !== srcId);
    setDest(des);
    setFormData(ev => ({ ...ev, source: srcId, dest: "", amount: "", category: "" }));
  };

  return (
    <Modal {...rest} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id="fundTransfer" defaultMessage="fundTransfer" /></Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`p-0 rounded-bottom ${userContext.userData.theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'
          }`}
      >
        <div className={`row m-0`}>
          <div className="col-5 pt-3">
            <div className='py-3 text-center'>
              <div><i className='fa fa-bank fa-3x' /></div>
              <small><FormattedMessage id="sourceBank" defaultMessage="sourceBank" /></small>
            </div>
            <div className="form-floating mt-1">
              <select id="source" className='form-control' value={formData.source} onChange={e => { onSourceChange(e.target.value); }}>
                <option value="">--</option>
                {sources.length && sources.map((d, i) => (
                  <option key={i} value={d.id}>{d.value}</option>
                ))}
              </select>
              <label htmlFor="source" className='text-dark'><FormattedMessage id="selectSourceAccount" defaultMessage="selectSourceAccount" /></label>
              {Number(formData.availableFunds) > 0 && <small className='text-danger'>
                <FormattedMessage id="balance" defaultMessage="balance" />:
                {Number(formData.availableFunds).toLocaleString()}
              </small>}
            </div>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center">
            <i className='fa fa-arrow-circle-right fa-3x' />
          </div>
          <div className="col-5 pt-3">
            <div className='py-3 text-center'>
              <div><i className='fa fa-bank fa-3x' /></div>
              <small><FormattedMessage id="destinationBank" defaultMessage="destinationBank" /></small>
            </div>
            <div className="form-floating mt-1">
              <select id="dest" className='form-control' value={formData.dest} onChange={e => setFormData(ev => ({ ...ev, dest: e.target.value }))}>
                <option value="">--</option>
                {dest.length && dest.map((d, i) => (
                  <option key={i} value={d.id}>{d.value}</option>
                ))}
              </select>
              <label htmlFor="dest" className='text-dark'><FormattedMessage id="selectDestinationAccount" defaultMessage="selectDestinationAccount" /></label>
            </div>
          </div>
          <div className="col-6 pt-3">
            <div className="form-floating">
              <input
                id="amount"
                value={formData.amount}
                onChange={e => setFormData(ev => ({ ...ev, amount: e.target.value }))}
                placeholder={intl.formatMessage({ id: 'amount', defaultMessage: 'amount' })}
                type="number"
                className="form-control form-control-sm"
              />
              <label htmlFor="amount" className='text-dark'><FormattedMessage id="amount" defaultMessage="amount" /></label>
            </div>
          </div>
          <div className="col-6 pt-3">
            <div className="form-floating">
              <select id="cat" className='form-control' value={formData.category} onChange={e => setFormData(ev => ({ ...ev, category: e.target.value }))}>
                <option value="">--</option>
                {incExpList.length && incExpList.map((d, i) => (
                  <option key={i} value={d.id}>{d.value}</option>
                ))}
              </select>
              <label htmlFor="cat" className='text-dark'><FormattedMessage id="category" defaultMessage="category" /></label>
            </div>
          </div>
          <div className="col-12 py-3">
            <button
              disabled={!(formData.dest && formData.amount && formData.source && formData.category)} className='btn btn-bni w-100'
              onClick={() => onsubmit()}
            >
              <FormattedMessage id="submit" defaultMessage="submit" />
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

FundTransferModal.propTypes = {
  property: PropTypes.string,
};
FundTransferModal.defaultProps = {
  property: 'String name',
};

export default FundTransferModal;
