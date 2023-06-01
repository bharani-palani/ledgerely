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
    const browserLocale = navigator.language ? navigator.language.toLowerCase() : 'en-in';
    const [localeId, setLocaleId] = useState(browserLocale);

    useEffect(() => {
        const formdata = new FormData();
        formdata.append('localeCode', localeId);    
        const a = apiInstance.post('/getLocale', formdata);
        const b = apiInstance.get('/getUniqueLocales');
        Promise.all([a, b])
            .then(response => {
                const data = response[0].data.response;
                const uniqueLoc = response[1].data.response;
                let group = Object.entries(_.groupBy(data, 'locale_language'))
                    .map(o => ({ [o[0]]: Object.assign({}, ...o[1].map(v => ({ [v.locale_key]: v.locale_value }))) }));
                group = Object.assign({}, ...group);
                setMsg(group);

                const list = uniqueLoc
                    .map(u => (
                        { string: u.locale_string, label: u.locale_label, id: u.locale_id, currency: u.locale_currency, language: u.locale_language }
                    ))
                    .sort((a, b) => (a - b.locale_sort));
                setLocaleList(list);
                const pointLocale = list.filter(f => f.language === browserLocale).length > 0 && browserLocale ? browserLocale : "en";
                setLocale(pointLocale);
            })
            .catch(error => {
                userContext.renderToast({
                    type: 'error',
                    icon: 'fa fa-times-circle',
                    message: 'Unable to load browser locale objects. Please try again later',
                });
            })
            .finally(error => false);
    }, []);

    useEffect(() => {
        if (localeId && localeList && localeList.length > 0) {
            const formdata = new FormData();
            formdata.append('localeCode', localeId);    
            const a = apiInstance.post('/getLocale', formdata);
    
            Promise.all([a])
            .then(response => {
                const filter = localeList.filter(f => (f.language === localeId))[0]
                const { currency, language } = filter;

                const data = response[0].data.response;
                let group = Object
                .entries(_.groupBy(data, 'locale_language'))
                .map(o => ({ [o[0]]: Object.assign({}, ...o[1].map(v => ({ [v.locale_key]: v.locale_value }))) }));
                group = Object.assign({}, ...group);
                setMsg(group);
                setLocale(localeId);
                setLocaleCurrency(currency);
                setLocaleLanguage(language);

            })
            .catch(error => {
                userContext.renderToast({
                    type: 'error',
                    icon: 'fa fa-times-circle',
                    message: 'Unable to load selected locale objects. Please try again later',
                });
            })
        }
    }, [localeId, localeList]);

    return (
        <LocaleContext.Provider value={{
            setLocale,
            localeList,
            localeId,
            setLocaleId,
            locale,
            localeCurrency,
            localeLanguage,
        }}>
            {Object.keys(msg).length > 0 &&
                locale &&
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
