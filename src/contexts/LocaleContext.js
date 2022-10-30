import React, { useState, createContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { en } from '../i18n/en';
import { ta } from '../i18n/ta';

export const LocaleContext = createContext([{}, () => { }]);

const messages = {
    en, ta
}

const LocaleContextProvider = (props) => {
    const [locale, setLocale] = useState("en");

    useEffect(() => {
        setLocale(locale);
    }, [locale])

    return (
        <LocaleContext.Provider value={{
            setLocale
        }}>
            <IntlProvider
                messages={messages[locale]}
                locale={locale}
                defaultLocale="en"
            >
                {props.children}
            </IntlProvider>
        </LocaleContext.Provider>
    );
}
export default LocaleContextProvider;
