import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { FormattedMessage, useIntl } from 'react-intl'
import apiInstance from '../../services/apiServices';

const FundTransferModal = props => {
  const { srcArr, ...rest } = props;
  const [sources, setSources] = useState([]);
  const [dest, setDest] = useState([]);
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({
    amount: "",
    source: "", dest: "",
    description: intl.formatMessage({ id: 'fundTransfer' })
  });

  useEffect(() => {
    if (srcArr && srcArr.length > 0) {
      setSources(srcArr);
    }
  }, [srcArr]);

  const onsubmit = () => {
    const formdata = new FormData();
    formdata.append('formData', formData);
    apiInstance
      .post('/account_planner/postFundTransfer', formdata)
      .then(response => {
        const { data } = response;
        response && data && data.response
          ? userContext.renderToast({ message: intl.formatMessage({ id: 'fundTransferSuccess' }) })
          : userContext.renderToast({
            type: 'error',
            icon: 'fa fa-times-circle',
            message: intl.formatMessage({ id: 'fundTransferFail' }),
          });
      })
      .catch(err => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: intl.formatMessage({ id: 'unableToReachServer' }),
        })
      })
  }

  const onSourceChange = (srcId) => {
    const bSrc = [...sources];
    const des = bSrc.filter(f => f.id !== srcId);
    setDest(des);
    setFormData(ev => ({ ...ev, dest: "", amount: "" }));
  };

  return (
    <Modal {...rest} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id="fundTransfer" /></Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`p-0 rounded-bottom ${userContext.userData.theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'
          }`}
      >
        <div className={`row text-center m-0`}>
          <div className="col-5 pt-3">
            <div><i className='fa fa-bank fa-3x' /></div>
            <small><FormattedMessage id="sourceBank" /></small>
            <div className="form-floating mt-1">
              <select id="source" className='form-control' value={formData.source} onChange={e => { setFormData(ev => ({ ...ev, source: e.target.value })); onSourceChange(e.target.value); }}>
                <option value="">--</option>
                {sources.length && sources.map((d, i) => (
                  <option key={i} value={d.id}>{d.value}</option>
                ))}
              </select>
              <label htmlFor="source" className='text-dark'><FormattedMessage id="selectSourceAccount" /></label>
            </div>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center">
            <i className='fa fa-arrow-circle-right fa-3x' />
          </div>
          <div className="col-5 pt-3">
            <div><i className='fa fa-bank fa-3x' /></div>
            <small><FormattedMessage id="destinationBank" /></small>
            <div className="form-floating mt-1">
              <select id="dest" className='form-control' value={formData.dest} onChange={e => setFormData(ev => ({ ...ev, dest: e.target.value }))}>
                <option value="">--</option>
                {dest.length && dest.map((d, i) => (
                  <option key={i} value={d.id}>{d.value}</option>
                ))}
              </select>
              <label htmlFor="dest" className='text-dark'><FormattedMessage id="selectDestinationAccount" /></label>
            </div>
          </div>
          <div className="col-12 pt-3">
            <div className="form-floating">
              <input
                id="amount"
                value={formData.amount}
                onChange={e => setFormData(ev => ({ ...ev, amount: e.target.value }))}
                placeholder={intl.formatMessage({ id: 'amount' })}
                type="number"
                className="form-control form-control-sm"
              />
              <label htmlFor="amount" className='text-dark'><FormattedMessage id="amount" /></label>
            </div>
          </div>
          <div className="col-12 py-3">
            <button disabled={!(formData.dest && formData.amount && formData.source)} className='btn btn-bni w-100' onClick={() => onsubmit()}><FormattedMessage id="submit" /></button>
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
