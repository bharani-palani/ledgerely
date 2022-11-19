import React, { useState, createContext, useEffect, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import apiInstance from '../services/apiServices';
import _ from 'lodash';
import { UserContext } from './UserContext';

export const LocaleContext = createContext([{}, () => { }]);

const LocaleContextProvider = (props) => {
    const [locale, setLocale] = useState("");
    const [localeList, setLocaleList] = useState("");
    const [localeCurrency, setLocaleCurrency] = useState("");
    const [localeLanguage, setLocaleLanguage] = useState("");
    const [msg, setMsg] = useState({});
    const userContext = useContext(UserContext);

    const [currencyList, setCurrencyList] = useState({});
    const [langList, setLangList] = useState({});

    const browserLocale = navigator.language ? navigator.language.split("-")[0].toLowerCase() : false;

    const getListByKey = (d, search, key, value) => {
        let list = _.uniqBy(d, search).map(d => ({ [d[key]]: d[value] }));
        list = Object.assign({}, ...list);
        return list;
    };


    useEffect(() => {
        const a = apiInstance.get('/getLocale');
        const b = apiInstance.get('/getUniqueLocales');
        Promise.all([a, b])
            .then(response => {
                const data = response[0].data.response;
                const uniqueLoc = response[1].data.response;
                let group = Object.entries(_.groupBy(data, 'locale_string'))
                    .map(o => ({ [o[0]]: Object.assign({}, ...o[1].map(v => ({ [v.locale_key]: v.locale_value }))) }));
                group = Object.assign({}, ...group);
                setMsg(group);

                let list = uniqueLoc.map(u => ({ [u.locale_string]: u.locale_label }));
                list = Object.assign({}, ...list);
                setLocaleList(list);
                const pointLocale = Object.keys(list).includes(browserLocale) && browserLocale ? browserLocale : "en";
                setLocale(pointLocale);


                const clist = getListByKey(data, 'locale_string', 'locale_string', 'locale_currency');
                setCurrencyList(clist);
                const pointLocaleCurr = Object.keys(clist).includes(browserLocale) && browserLocale ? clist[browserLocale] : "USD";
                setLocaleCurrency(pointLocaleCurr);


                const languageList = getListByKey(data, 'locale_string', 'locale_string', 'locale_language');
                setLangList(languageList);
                const pointLocaleLang = Object.keys(languageList).includes(browserLocale) && browserLocale ? languageList[browserLocale] : "en-IN";
                setLocaleLanguage(pointLocaleLang);
            })
            .catch(error => {
                userContext.renderToast({
                    type: 'error',
                    icon: 'fa fa-times-circle',
                    message: 'Unable to load locale objects. Please try again later',
                });
            })
            .finally(error => false);
    }, []);


    useEffect(() => {
        setLocale(locale);
        setLocaleCurrency(currencyList[locale]);
        setLocaleLanguage(langList[locale]);
    }, [locale, currencyList, langList])

    return (
        <LocaleContext.Provider value={{
            setLocale,
            localeList,
            locale,
            localeCurrency,
            localeLanguage,
            currencyList,
            langList
        }}>
            {Object.keys(msg).length > 0 &&
                locale && Object.keys(currencyList).length > 0 &&
                Object.keys(langList).length > 0 &&
                <IntlProvider
                    messages={msg[locale]}
                    locale={locale}
                    defaultLocale={locale}
                >
                    {props.children}
                </IntlProvider>}
        </LocaleContext.Provider>
    );
}
export default LocaleContextProvider;
