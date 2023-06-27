import React, { useState, createContext, useEffect, useContext } from "react";
import { IntlProvider } from "react-intl";
import apiInstance from "../services/apiServices";
import _ from "lodash";
import { UserContext } from "./UserContext";

export const LocaleContext = createContext([{}, () => {}]);

const LocaleContextProvider = props => {
  const [localeList, setLocaleList] = useState([]);
  const [localeCurrency, setLocaleCurrency] = useState("");
  const [localeLanguage, setLocaleLanguage] = useState("");
  const [msg, setMsg] = useState({});
  const userContext = useContext(UserContext);
  const defaultLocale = "en";
  const browserLocale = navigator?.language
    ? navigator.language.toLowerCase()
    : defaultLocale;
  const [localeId, setLocaleId] = useState(browserLocale);

  useEffect(() => {
    const b = apiInstance.get("/getUniqueLocales");
    Promise.all([b])
      .then(response => {
        const uniqueLoc = response[0].data.response;
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
      .catch(error => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message:
            "Unable to load browser locale lists. Please try again later",
        });
      })
      .finally(error => false);
  }, []);

  useEffect(() => {
    if (localeId && localeList && localeList.length > 0) {
      const fetch =
        localeList.filter(f => f.string === localeId).length > 0
          ? localeId
          : defaultLocale;
      const formdata = new FormData();
      formdata.append("localeCode", fetch);
      const a = apiInstance.post("/getLocale", formdata);

      Promise.all([a])
        .then(response => {
          const filter = localeList.filter(f => f.string === fetch)[0];
          const { currency, language } = filter;

          const data = response[0].data.response;
          let group = Object.entries(_.groupBy(data, "locale_string")).map(
            o => ({
              [o[0]]: Object.assign(
                {},
                ...o[1].map(v => ({ [v.locale_key]: v.locale_value })),
              ),
            }),
          );
          group = Object.assign({}, ...group);
          setMsg(group);
          setLocaleId(fetch);
          setLocaleCurrency(currency);
          setLocaleLanguage(language);
        })
        .catch(error => {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message:
              "Unable to load selected locale objects. Please try again later",
          });
        });
    }
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
        <IntlProvider
          messages={msg[localeId]}
          locale={localeId}
          defaultLocale={localeId}
        >
          {props.children}
        </IntlProvider>
      )}
    </LocaleContext.Provider>
  );
};
export default LocaleContextProvider;
