import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../wrapper/wrapper";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import { UserContext } from "../../contexts/UserContext";
import MyAlertProvider from "../../contexts/AlertContext";
import AppExpiry from "../Timers/AppExpiry";
import GlobalHeader from "../GlobalHeader";
import { useIdleTimer } from "react-idle-timer";
import IdleReminder from "../Timers/IdleReminder";
import Footer from "./Footer";
import NetworkIndicator from "./NetworkIndicator";
import { ProgressBar } from "react-bootstrap";
import useAxios from "../../services/apiServices";
import { db } from "../../services/indexedDb";
import { useIntl } from "react-intl";
import Loader from "../resuable/Loader";

function MainApp() {
  const intl = useIntl();
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const location = useLocation();
  const [navBarExpanded, setNavBarExpanded] = useState(false);
  const timeout = 1000 * 60 * 60; // 1 hour
  const [progress, setProgress] = useState({});
  const [isDownload, setIsDownload] = useState(false);
  const [allProgress, setAllProgress] = useState(false);

  const onIdle = () => {
    if (location.pathname !== "/") {
      userContext.setIdleState("idle");
    }
  };

  useIdleTimer({
    crossTab: true,
    disabled: userContext?.userData?.userName === null ? true : false,
    onIdle,
    timeout,
    throttle: 500,
    eventsThrottle: 1000,
  });

  const onNavBarToggle = () => {
    setNavBarExpanded(!navBarExpanded);
  };

  const onNavBarClose = () => {
    setNavBarExpanded(false);
  };

  useEffect(() => {
    if (!userContext.userConfig?.tenantId) {
      return;
    }
    downloadOfflineData();
  }, [userContext.userConfig?.tenantId]);

  const downloadOfflineData = async () => {
    try {
      setIsDownload(true);
      await downloadCategories();
      await downloadBanks();
      await downloadCreditCards();
      await downloadBankYearList();
      await downloadCreditCardYearList();
    } catch (error) {
      console.error("Offline data download failed:", error);
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "bulkImportFailed",
          defaultMessage: "bulkImportFailed",
        }),
      });
    } finally {
      setTimeout(() => {
        setIsDownload(false);
      }, 1000);
    }
  };
  const downloadCategories = async () => {
    await downloadWithCursor({
      apiUrl: "/account_planner/inc_exp_list",
      dbTable: db.categoryList,
      progressKey: "categories",
    });
  };

  const downloadBanks = async () => {
    await downloadWithCursor({
      apiUrl: "/account_planner/bank_list",
      dbTable: db.bankList,
      progressKey: "banks",
    });
  };

  const downloadCreditCards = async () => {
    await downloadWithCursor({
      apiUrl: "/account_planner/credit_card_list",
      dbTable: db.creditCardList,
      progressKey: "creditCards",
    });
  };

  const downloadBankYearList = async () => {
    await downloadWithCursor({
      apiUrl: "/account_planner/year_list",
      dbTable: db.bankYearList,
      progressKey: "bankYears",
    });
  };

  const downloadCreditCardYearList = async () => {
    await downloadWithCursor({
      apiUrl: "/account_planner/cc_year_list",
      dbTable: db.ccYearList,
      progressKey: "creditCardYears",
    });
  };

  const downloadWithCursor = async ({ apiUrl, dbTable, progressKey }) => {
    const limit = 500; // default is 500
    let cursor = 0;
    let hasMore = true;
    let totalDownloaded = 0;
    let totalCount = 0;
    do {
      const formdata = new FormData();
      formdata.append("tenantId", userContext.userConfig.tenantId);
      formdata.append("cursor", cursor);
      formdata.append("limit", limit);
      try {
        const res = await apiInstance.post(apiUrl, formdata);
        const { data = [], nextCursor, hasMore: responseHasMore, totalCount: responseTotalCount } = res.data.response;
        // Total count is normally returned only on first request
        if (responseTotalCount != null) {
          totalCount = responseTotalCount;
        }
        // Save current batch to Dexie
        if (data.length > 0) {
          await dbTable.bulkPut(data);
          totalDownloaded += data.length;
        }
        // Calculate progress
        const percentage = totalCount > 0 ? Math.min((totalDownloaded / totalCount) * 100, 100) : 0;
        // Update only the corresponding API's state
        setProgress(prev => ({
          ...prev,
          [progressKey]: {
            percentage: Number(percentage.toFixed(2)),
            totalDownloaded,
            totalCount,
            nextCursor,
            hasMore: responseHasMore,
          },
        }));
        cursor = nextCursor;
        hasMore = responseHasMore;
      } catch (error) {
        console.error(`Download failed: ${apiUrl}`, error);
        hasMore = false;
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      }
    } while (hasMore);
  };

  useEffect(() => {
    const overallProgress = Object.keys(progress)
      .map(p => Math.trunc((progress[p].percentage / 5) * 100) / 100)
      .reduce((a, b) => a + b, 0);
    setAllProgress(overallProgress);
  }, [progress]);

  const LoaderComp = () => {
    return (
      <div className={`relativeSpinner middle bg-${userContext?.userData.theme}`}>
        <Loader />
      </div>
    );
  };

  return (
    <GlobalHeader>
      {isDownload && (
        <div
          className='position-fixed w-100'
          style={{
            zIndex: 10001,
            top: 0,
            left: 0,
          }}
        >
          <ProgressBar now={allProgress} />;
        </div>
      )}
      {userContext?.userData?.userName && userContext.idleState === "idle" && (
        <IdleReminder
          className=''
          show={true}
          onHide={() => false}
          size='md'
          animation={true}
          keyboard={false}
          backdrop='static'
          centered
          onStayLoggedIn={stat => userContext.setIdleState(stat)}
        />
      )}
      {isDownload ? (
        <LoaderComp />
      ) : (
        <div
          className={`${userContext?.userData.userName ? "application-wrapper" : ""} ${
            userContext?.userConfig?.webLayoutType
          } ${userContext.userData.theme === "dark" ? "bg-dark" : "bg-white"}`}
        >
          <div className='' />
          <div className={`application-content ${userContext?.userConfig?.webMenuType}`}>
            {userContext?.userData?.userName && (
              <div
                className={`menu-wrapper d-print-none p-0 ${
                  ["sideMenuRight", "sideMenuLeft"].includes(userContext?.userConfig?.webMenuType) ? "col-sm-2" : ""
                }`}
              >
                <div className='fixed-content'>
                  <DesktopApp />
                </div>
                <MobileApp onNavBarToggle={onNavBarToggle} navBarExpanded={navBarExpanded} onNavBarClose={onNavBarClose} />
              </div>
            )}
            <div
              className={`wrapper ${userContext?.userData?.userName ? userContext?.userConfig?.webMenuType : ""} ${
                userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
              } p-0 ${["sideMenuRight", "sideMenuLeft"].includes(userContext?.userConfig?.webMenuType) ? "col-sm-10" : "col-sm-12"}`}
            >
              <MyAlertProvider>
                <AppExpiry />
                <Wrapper />
                <NetworkIndicator />
                {userContext?.userData?.userName && <Footer />}
              </MyAlertProvider>
            </div>
          </div>
          <div className='' />
        </div>
      )}
    </GlobalHeader>
  );
}

export default MainApp;
