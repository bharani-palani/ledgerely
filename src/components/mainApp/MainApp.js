import React, { useState, useEffect, useContext } from 'react';
import { Router } from 'react-router-dom';
import Wrapper from '../wrapper/wrapper';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';
import history from '../../history';
import AccountPlanner from '../accountPlanner/AccountPlanner';
import Settings from '../configuration/settings';
import Home from '../Home/Home';
import { UserContext } from '../../contexts/UserContext';

function MainApp(props) {
  const { appData } = props;
  const userContext = useContext(UserContext);
  const [navBarExpanded, setNavBarExpanded] = useState(false);

  useEffect(() => {
    if (userContext.userData.type) {
      const list = [
        {
          page_id: '0',
          hasAccessTo: ['public', 'admin', 'superAdmin'],
          href: '/',
          label: 'Home',
          description: 'Your landing page to access menu options with todays relevant information',
          icon: 'fa fa-home',
          component: Home,
        },
        {
          page_id: '1',
          hasAccessTo: ['superAdmin'],
          href: '/moneyPlanner',
          label: 'Money Planner',
          description: 'Handle your credit & debit card transactions with visualizations and query builder',
          icon: 'fa fa-inr',
          component: AccountPlanner,
        },
        {
          page_id: '2',
          hasAccessTo: ['superAdmin'],
          href: '/settings',
          label: 'Settings',
          description: 'Maintain application configuration, web settings, google & AWS settings',
          icon: 'fa fa-cogs',
          component: Settings,
        },
      ];
      const bMenu = list.filter(f =>
        f.hasAccessTo.includes(userContext.userData.type)
      );
      userContext.updateUserData('menu', bMenu);
    }
  }, [userContext.userData.type]);

  const onNavBarToggle = () => {
    setNavBarExpanded(!navBarExpanded);
  };

  const onNavBarClose = () => {
    setNavBarExpanded(false);
  };

  return (
    <React.Fragment>
      {Object.keys(appData).length > 0 &&
        userContext.userData.menu &&
        userContext.userData.menu.length > 0 && (
          <Router history={history}>
            <div
              className={`application-wrapper ${appData.webLayoutType} ${userContext.userData.theme === 'dark' ? 'bg-dark' : 'bg-light'
                }`}
            >
              <div className="" />
              <div className={`application-content ${appData.webMenuType}`}>
                <div
                  className={`menu-wrapper d-print-none p-0 ${['sideMenuRight', 'sideMenuLeft'].includes(
                    appData.webMenuType
                  )
                    ? 'col-sm-2'
                    : ''
                    }`}
                >
                  <div className="fixed-content">
                    <DesktopApp appData={appData} />
                  </div>
                  <MobileApp
                    onNavBarToggle={onNavBarToggle}
                    navBarExpanded={navBarExpanded}
                    onNavBarClose={onNavBarClose}
                    appData={appData}
                  />
                </div>
                <div
                  style={{ opacity: userContext.userData.videoShown ? 0.9 : 1 }}
                  className={`wrapper ${appData.webLayoutType} ${userContext.userData.theme === 'dark'
                    ? 'bg-dark text-light'
                    : 'bg-light text-dark'
                    } p-0 ${appData.webMenuType} ${['sideMenuRight', 'sideMenuLeft'].includes(
                      appData.webMenuType
                    )
                      ? 'col-sm-10'
                      : 'col-sm-12'
                    }`}
                >
                  <Wrapper />
                </div>
              </div>
              <div className="" />
            </div>
          </Router>
        )}
    </React.Fragment>
  );
}

export default MainApp;
