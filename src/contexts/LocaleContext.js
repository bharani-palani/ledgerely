import React, { useState, createContext, useEffect, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import apiInstance from '../services/apiServices';
import _ from 'lodash';
import { UserContext } from './UserContext';

export const LocaleContext = createContext([{}, () => { }]);

const LocaleContextProvider = (props) => {
    const [locale, setLocale] = useState("");
    const [localeList, setLocaleList] = useState("");
    const [msg, setMsg] = useState({});
    const userContext = useContext(UserContext);

    useEffect(() => {
        apiInstance
            .get('/getLocale')
            .then(response => {
                const data = response.data.response;
                let group = Object.entries(_.groupBy(data, 'locale_string'))
                    .map(o => ({ [o[0]]: Object.assign({}, ...o[1].map(v => ({ [v.locale_key]: v.locale_value }))) }));
                group = Object.assign({}, ...group);
                setMsg(group);
                const loc = data.filter(d => d.locale_default === "1")[0].locale_string;
                setLocale(loc);
                let list = _.uniqBy(data, 'locale_string').map(d => ({ [d.locale_label]: d.locale_string }));
                list = Object.assign({}, ...list);
                setLocaleList(list)
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
    }, [locale])

    return (
        <LocaleContext.Provider value={{
            setLocale,
            localeList,
            locale
        }}>
            {Object.keys(msg).length > 0 && locale && <IntlProvider
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
