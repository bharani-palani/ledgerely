import React, { useState, useEffect, useContext } from 'react';
import { Router } from 'react-router-dom';
import Wrapper from '../wrapper/wrapper';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';
import history from '../../history';
import AccountPlanner from '../accountPlanner/AccountPlanner';
import Settings from '../configuration/settings';
import Boogle from '../Home/Boogle';
import BniApps from '../apps/Apps';
import { UserContext } from '../../contexts/UserContext';
import SignedUrl from '../configuration/Gallery/SignedUrl';

function MainApp(props) {
  const { appData } = props;
  const userContext = useContext(UserContext);
  const [navBarExpanded, setNavBarExpanded] = useState(false);

  useEffect(() => {
    if (userContext.userData.type) {
      const list = [
        {
          page_id: 'home',
          hasAccessTo: ['public', 'admin', 'superAdmin'],
          href: '/',
          label: 'Home',
          description: 'Your landing page to access menu options with todays relevant information',
          icon: 'fa fa-home',
          component: Boogle,
        },
        {
          page_id: 'moneyPlanner',
          hasAccessTo: ['superAdmin'],
          href: '/moneyPlanner',
          label: 'Money Planner',
          description: 'Handle your credit & debit card transactions with visualizations and query builder',
          icon: 'fa fa-inr',
          component: AccountPlanner,
        },
        {
          page_id: 'settings',
          hasAccessTo: ['superAdmin'],
          href: '/settings',
          label: 'Settings',
          description: 'Maintain application configuration, web settings, google & AWS settings',
          icon: 'fa fa-cogs',
          component: Settings,
        },
        {
          page_id: 'applications',
          hasAccessTo: ['public', 'admin', 'superAdmin'],
          href: '/apps',
          label: 'Apps',
          description: 'Some common usefull apps',
          icon: 'fa fa-code',
          component: BniApps,
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
          <>
          <SignedUrl
            className="d-none d-print-none"
            optionalAttr={{ 
              controls: true, 
              loop: true,
              playing: userContext.userData.audioShown, 
              width: '0px', height: '0px'}}
            type="audio"
            appData={appData}
            unsignedUrl={`${appData.bgSong}`}
            key={1}
          />
          <SignedUrl
            className="videoTag d-print-none"
            optionalAttr={{ playing: userContext.userData.videoShown, loop: true, muted: true, controls: true, width: '100%', height: '100vh'}}
            style={{ display: userContext.userData.videoShown ? 'block' : 'none' }}
            type="video"
            appData={appData}
            unsignedUrl={appData.bgVideo}
            key={2}
          />
          <Router history={history}>
            <div
              className={`application-wrapper ${appData.webLayoutType} ${userContext.userData.theme === 'dark' ? 'bg-dark' : 'bg-white'
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
                    ? 'bg-dark text-white'
                    : 'bg-white text-dark'
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
          </>
        )}
    </React.Fragment>
  );
}

export default MainApp;
