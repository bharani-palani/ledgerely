import React, { useEffect, useState, useContext } from 'react';
import apiInstance from '../../services/apiServices';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { AccountContext } from './AccountPlanner';
import { FormattedMessage, useIntl } from 'react-intl'
import { LocaleContext } from '../../contexts/LocaleContext';

const TotalHoldings = props => {
  const intl = useIntl()
  const accountContext = useContext(AccountContext);
  const localeContext = useContext(LocaleContext);
  const [holdings, setHoldings] = useState({});
  const [loader, setLoader] = useState(false);

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
          message: intl.formatMessage({ id: 'unableToReachServer', defaultMessage: 'unableToReachServer' }),
        });
      })
      .finally(() => setLoader(false));
  }, []);

  const total = (location, key) => Object.keys(holdings).length > 0 ? holdings[location].reduce((a, b) => {
    return Number(a) + Number(b[key]) || 0;
  }, 0) : 0;

  return !loader ? (
    <div className="totalHoldings">
      <div className="h5 bni-border bottom pb-1"><FormattedMessage id="bank" defaultMessage="bank" /></div>
      <div className="h5 text-end bni-border bottom pb-1"><FormattedMessage id="balance" defaultMessage="balance" /></div>
      {Object.keys(holdings).length > 0 ? (
        holdings.bankBalance.map((hold, i) => (
          <React.Fragment key={i}>
            <div>{hold.Bank}</div>
            <div className="text-end">
              {helpers.countryCurrencyLacSeperator(
                localeContext.localeLanguage,
                localeContext.localeCurrency,
                Number(hold.Balance),
                2
              )}
            </div>
          </React.Fragment>
        ))
          .concat(
            holdings.bankBalance.length > 0 ?
              <React.Fragment key={'a'}>
                <div className="total h5 py-2 pb-2"><FormattedMessage id="total" defaultMessage="total" /></div>
                <div className="text-end total h5 py-2 pb-2 btn-bni pe-1">
                  {helpers.countryCurrencyLacSeperator(localeContext.localeLanguage, localeContext.localeCurrency, total('bankBalance', 'Balance'), 2)}
                </div>
              </React.Fragment> : null
          )
          .concat(
            <>
              <div className="h5 bni-border bottom pb-1 mt-5"><FormattedMessage id="creditCard" defaultMessage="creditCard" /></div>
              <div className="h5 text-end bni-border bottom pb-1 mt-5"><FormattedMessage id="balance" defaultMessage="balance" /></div>
              {holdings.creditBalance.length > 0 ? holdings.creditBalance.map((hold, j) => (
                <React.Fragment key={j}>
                  <div>{hold.cardName}</div>
                  <div className="text-end">
                    {helpers.countryCurrencyLacSeperator(
                      localeContext.localeLanguage,
                      localeContext.localeCurrency,
                      Number(hold.total),
                      2
                    )}
                  </div>
                </React.Fragment>
              )) : (
                <div className="noData"><FormattedMessage id="noRecordsGenerated" defaultMessage="noRecordsGenerated" /></div>
              )}
            </>
          )
          .concat(
            holdings.creditBalance.length > 0 ?
              <React.Fragment key={'b'}>
                <div className="total h5 py-2"><FormattedMessage id="total" defaultMessage="total" /></div>
                <div className="text-end total h5 py-2 btn-bni pe-1">
                  {helpers.countryCurrencyLacSeperator(localeContext.localeLanguage, localeContext.localeCurrency, total('creditBalance', 'total'), 2)}
                </div>
              </React.Fragment> : null
          )
      ) : (
        <div className="noData"><FormattedMessage id="noRecordsGenerated" defaultMessage="noRecordsGenerated" /></div>
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
