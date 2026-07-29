import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { IntlProvider } from "react-intl";
import useAxios from "../services/apiServices";
import _ from "lodash";
import { UserContext } from "./UserContext";
import { db } from "../services/indexedDb";
import moment from "moment";

export const LocaleContext = createContext([{}, () => {}]);

const LocaleContextProvider = props => {
  const { apiInstance } = useAxios();
  const [localeList, setLocaleList] = useState([]);
  const [localeCurrency, setLocaleCurrency] = useState("");
  const [localeLanguage, setLocaleLanguage] = useState("");
  const [msg, setMsg] = useState({});
  const userContext = useContext(UserContext);
  const defaultLocale = "en";
  const browserLocale = navigator?.language ? navigator.language.toLowerCase() : defaultLocale;
  const [localeId, setLocaleId] = useState(browserLocale);

  useEffect(() => {
    const deleteOlderLocales = async () => {
      const oneDayAgo = moment().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss");
      await db.localeTable.where("updatedAt").below(oneDayAgo).delete();
    };
    const getUniqueLocaleApi = apiInstance.get("/getUniqueLocales");
    getUniqueLocaleApi
      .then(res => {
        const uniqueLoc = res.data.response;
        const list = uniqueLoc
          .map(u => ({
            string: u.locale_string,
            label: u.locale_label,
            id: u.locale_id,
            currency: u.locale_currency,
            language: u.locale_language,
          }))
          .sort((a, b) => a - b.locale_sort);
        setLocaleList(list);
      })
      .catch(() => {
        userContext?.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: "Unable to load browser locale lists. Please try again later",
        });
      })
      .finally(() => deleteOlderLocales());
  }, []);

  const getLocalDbLocaleData = async localeId => {
    const data = db.localeTable.where("locale").equals(localeId).toArray();
    return data;
  };

  const isLocaleDataExistInLocalDB = async localeId => {
    const first = await db.localeTable.where("locale").equals(localeId).first();
    return first;
  };

  const downloadWithCursor = async ({ apiUrl, dbTable, localeCode }) => {
    const limit = 500; // default is 500
    let cursor = 0;
    let hasMore = true;
    do {
      const formdata = new FormData();
      formdata.append("cursor", cursor);
      formdata.append("limit", limit);
      formdata.append("localeCode", localeCode);
      try {
        const res = await apiInstance.post(apiUrl, formdata);
        const { data = [], nextCursor, hasMore: responseHasMore } = res.data.response;
        if (data.length > 0) {
          await dbTable.put({
            locale: localeCode,
            data,
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
        }
        cursor = nextCursor;
        hasMore = responseHasMore;
      } catch (error) {
        console.error(`Download failed: ${apiUrl}`, error);
        hasMore = false;
      }
    } while (hasMore);
  };

  const massageLocaleData = data => {
    let group = Object.entries(_.groupBy(data, "locale_string")).map(o => ({
      [o[0]]: Object.assign(
        {},
        ...o[1].map(v => ({
          [v.locale_key]: v.locale_value,
        })),
      ),
    }));

    return Object.assign({}, ...group);
  };

  const loadLocale = useCallback(async () => {
    if (!localeId || !localeList?.length) return;
    const fetched = localeList.some(f => f.string === localeId) ? localeId : defaultLocale;
    const filter = localeList.find(f => f.string === fetched);

    const isFound = await isLocaleDataExistInLocalDB(fetched);
    if (isFound && isFound?.localeId) {
      const localDbLocale = await getLocalDbLocaleData(fetched);
      let list = localDbLocale.flatMap(item => item.data);
      const group = massageLocaleData(list);
      setMsg(group);
      setLocaleId(fetched);
      setLocaleCurrency(filter.currency);
      setLocaleLanguage(filter.language);
      return;
    }
    try {
      await downloadWithCursor({
        apiUrl: "/getLocale",
        dbTable: db.localeTable,
        localeCode: fetched,
      });
      let list = await db.localeTable.where("locale").equals(localeId).toArray();
      list = list.flatMap(item => item.data);
      const group = massageLocaleData(list);
      await setMsg(group);
      setLocaleId(fetched);
      setLocaleCurrency(filter.currency);
      setLocaleLanguage(filter.language);
    } catch (err) {
      console.log("Unable to load selected locale objects. Please try again later", err);
    }
  }, [localeId, localeList]);

  useEffect(() => {
    loadLocale();
  }, [localeId, localeList]);

  return (
    <LocaleContext.Provider
      value={{
        localeList,
        localeId,
        setLocaleId,
        localeCurrency,
        localeLanguage,
        msg,
      }}
    >
      {Object.keys(msg).length > 0 && localeId && (
        <IntlProvider messages={msg[localeId]} locale={localeId} defaultLocale={localeId}>
          {props.children}
        </IntlProvider>
      )}
    </LocaleContext.Provider>
  );
};
export default LocaleContextProvider;
