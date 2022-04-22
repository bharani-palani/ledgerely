/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../security/protectedRoute';
import ErrorPage from './errorpage';
import { UserContext } from '../../contexts/UserContext';
import Cms from '../cms/cms';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { useHistory } from 'react-router-dom';

const Wrapper = props => {
  const userContext = useContext(UserContext);
  const menu = userContext.userData.menu;
  const [structure, setStructure] = useState({});
  const [loader, setLoader] = useState(false);
  const { location } = props;
  const history = useHistory();

  useEffect(() => {
    const fPages = menu.filter(m => m.href === location.pathname);
    const pageId = fPages.length > 0 ? fPages[0].page_id : null;
    if (pageId) {
      setStructure({});
      setLoader(true);
      const formdata = new FormData();
      formdata.append('pageId', pageId);
      apiInstance
        .post('/getConfigPageDetails', formdata)
        .then(res => {
          const resStructure = res.data.response.pageObject;
          setStructure(resStructure);
        })
        .catch(() => {
          setStructure({});
          userContext.renderToast({
            type: 'error',
            icon: 'fa fa-times-circle',
            message: 'Oops.. Unable to fetch page data. Please try again.',
          });
        })
        .finally(() => setLoader(false));
    } else {
      setLoader(false);
      history.push('/error');
    }
  }, [location.pathname]);

  return (
    <>
      <Switch>
        {menu.map((menu, i) => {
          return (
            <ProtectedRoute
              accessGiven={menu.hasAccessTo}
              key={i}
              exact
              path={menu.href}
              component={Cms}
              structure={structure}
            />
          );
        })}
        <Route path="/error" component={ErrorPage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
      {loader && (
        <div className="spinner">
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
    </>
  );
};

export default withRouter(Wrapper);
