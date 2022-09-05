import React, { useEffect, useState, useContext } from 'react';
import apiInstance from '../../services/apiServices';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { AccountContext } from './AccountPlanner';

const TotalHoldings = props => {
  const accountContext = useContext(AccountContext);
  const [holdings, setHoldings] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log('bbb', holdings)
  }, [holdings]);

  useEffect(() => {
    setLoader(true);
    apiInstance
      .get('/account_planner/getTotalHoldings')
      .then(res => {
        setHoldings(res.data.response.result);
      })
      .catch(() => {
        accountContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Unable to fetch total holdings. Please try again later',
        });
      })
      .finally(() => setLoader(false));
  }, []);

  const total = (location, key) => Object.keys(holdings).length > 0 ? holdings[location].reduce((a, b) => {
    return Number(a) + Number(b[key]) || 0;
  }, 0) : 0;

  return !loader ? (
    <div className="totalHoldings">
      <div className="h5 bni-border bottom pb-1">Bank</div>
      <div className="h5 text-end bni-border bottom pb-1">Balance</div>
      {Object.keys(holdings).length > 0 ? (
        holdings.bankBalance.map(hold => (
          <>
            <div>{hold.Bank}</div>
            <div className="text-end">
              {helpers.countryCurrencyLacSeperator(
                'en-IN',
                'INR',
                Number(hold.Balance),
                2
              )}
            </div>
          </>
        ))
          .concat(
            holdings.bankBalance.length > 0 ? <>
              <div className="total h5 py-2">Total</div>
              <div className="text-end total h5 py-2">
                {helpers.countryCurrencyLacSeperator('en-IN', 'INR', total('bankBalance', 'Balance'), 2)}
              </div>
            </> : null
          )
          .concat(
            <>
              <div className="h5 bni-border bottom pb-1">Credit Card</div>
              <div className="h5 text-end bni-border bottom pb-1">Balance</div>
              {holdings.creditBalance.length > 0 ? holdings.creditBalance.map(hold => (
                <>
                  <div>{hold.cardName}</div>
                  <div className="text-end">
                    {helpers.countryCurrencyLacSeperator(
                      'en-IN',
                      'INR',
                      Number(hold.total),
                      2
                    )}
                  </div>
                </>

              )) : (
                <div className="noData">No credit card balance</div>
              )}
            </>
          )
          .concat(
            holdings.creditBalance.length > 0 ? <>
              <div className="total h5 py-2">Total</div>
              <div className="text-end total h5 py-2">
                {helpers.countryCurrencyLacSeperator('en-IN', 'INR', total('creditBalance', 'total'), 2)}
              </div>
            </> : null
          )
      ) : (
        <div className="noData">No Data</div>
      )}
    </div>
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
  );
};

TotalHoldings.propTypes = {
  property: PropTypes.string,
};
TotalHoldings.defaultProps = {
  property: 'String name',
};

export default TotalHoldings;
