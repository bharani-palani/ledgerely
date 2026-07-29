import React, { useState, createContext, useEffect, useContext } from "react";
import { db } from "../services/indexedDb";
import { UserContext } from "./UserContext";
import { ProgressBar } from "react-bootstrap";
import useAxios from "../services/apiServices";
import { useIntl } from "react-intl";

export const ClientHydrationContext = createContext([{}, () => {}]);

const ClientHydrationContextProvider = props => {
  const intl = useIntl();
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const [isDownload, setIsDownload] = useState(false);
  const [allProgress, setAllProgress] = useState(false);
  const [progress, setProgress] = useState({});

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

  return (
    <ClientHydrationContext.Provider
      value={{
        downloadCategories,
        downloadBanks,
        downloadCreditCards,
        downloadBankYearList,
        downloadCreditCardYearList,
        downloadOfflineData,
      }}
    >
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
      {props.children}
    </ClientHydrationContext.Provider>
  );
};
export default ClientHydrationContextProvider;
