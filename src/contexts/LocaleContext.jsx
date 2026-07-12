import React, { useState, createContext, useEffect, useContext } from "react";
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
      await db.syncQueue.where("updatedAt").below(oneDayAgo).delete();
    };
    const getUniqueLocaleApi = apiInstance.get("/getUniqueLocales");
    getUniqueLocaleApi
      .then(response => {
        const uniqueLoc = response.data.response;
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

  useEffect(() => {
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

    const loadLocale = async () => {
      if (!localeId || !localeList?.length) return;
      const fetch = localeList.some(f => f.string === localeId) ? localeId : defaultLocale;
      const filter = localeList.find(f => f.string === fetch);

      const isFound = await isLocaleDataExistInLocalDB(fetch);
      if (isFound && isFound?.localeId) {
        const localDbLocale = await getLocalDbLocaleData(fetch);
        const group = massageLocaleData(localDbLocale[0].data);
        setMsg(group);
        setLocaleId(fetch);
        setLocaleCurrency(filter.currency);
        setLocaleLanguage(filter.language);
        return;
      }
      try {
        const formdata = new FormData();
        formdata.append("localeCode", fetch);
        const response = await apiInstance.post("/getLocale", formdata);
        const group = massageLocaleData(response.data.response);
        setMsg(group);
        setLocaleId(fetch);
        setLocaleCurrency(filter.currency);
        setLocaleLanguage(filter.language);
        await db.localeTable.put({
          locale: fetch,
          data: response.data.response,
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      } catch (err) {
        console.log("Unable to load selected locale objects. Please try again later", err);
      }
    };

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
