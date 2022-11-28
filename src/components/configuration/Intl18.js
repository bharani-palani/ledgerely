import React, { useContext, useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import BackendCore from '../../components/configuration/backend/BackendCore';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';

const Intl18 = props => {
    const intl = useIntl();
    const [masterData, setMasterData] = useState([]);
    const [childData, setChildData] = useState([]);
    const userContext = useContext(UserContext);

    const master = {
        config: {
            header: {
                searchPlaceholder: intl.formatMessage({ id: 'searchHere' }),
            },
            footer: {
                total: {},
                pagination: {
                    currentPage: 'last',
                    recordsPerPage: 10,
                    maxPagesToShow: 5,
                },
            },
        },
        id: 'intlMaster',
        Table: 'locale_master',
        label: 'Locale master',
        TableRows: [
            'locale_id',
            'locale_label',
            'locale_string',
            'locale_language',
            'locale_currency',
            'locale_sort',
        ],
        TableAliasRows: [
            intl.formatMessage({ id: 'id' }),
            intl.formatMessage({ id: 'localeLabel' }),
            intl.formatMessage({ id: 'localeString' }),
            intl.formatMessage({ id: 'localeLanguage' }),
            intl.formatMessage({ id: 'localeCurrency' }),
            intl.formatMessage({ id: 'localeSort' }),
        ],
        defaultValues: [{ locale_sort: 1 }],
        rowElements: [
            'checkbox',
            'textbox',
            'textbox',
            'textbox',
            'textbox',
            'number',
        ]
    };
    const child = {
        config: {
            header: {
                searchPlaceholder: intl.formatMessage({ id: 'searchHere' }),
            },
            footer: {
                total: {},
                pagination: {
                    currentPage: 'last',
                    recordsPerPage: 10,
                    maxPagesToShow: 5,
                },
            },
        },
        id: 'intlChild',
        Table: 'locale_child',
        label: 'Locale child',
        TableRows: [
            'loc_id',
            'locale_ref_id',
            'locale_key',
            'locale_value',
        ],
        TableAliasRows: [
            intl.formatMessage({ id: 'id' }),
            intl.formatMessage({ id: 'localeLanguage' }),
            intl.formatMessage({ id: 'id' }),
            intl.formatMessage({ id: 'value' }),
        ],
        defaultValues: [],
        rowElements: [
            'checkbox',
            {
                fetch: {
                    dropDownList: masterData.map(d => ({ checked: false, id: d.locale_id, value: d.locale_label }))
                },
            },
            'textbox',
            'textbox',
        ]
    };
    const defaultData = [];

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        setMasterData([]);
        setChildData([]);
        const a = getFromTable(master);
        const b = getFromTable(child);
        Promise.all([a, b])
            .then(async r => {
                r[0].data.response.length > 0 ? setMasterData(r[0].data.response) : setMasterData(defaultData);
                r[1].data.response.length > 0 ? setChildData(r[1].data.response) : setChildData(defaultData);
            })
            .catch(() => {
                setMasterData([]);
                setChildData([]);
            });
    };

    const getFromTable = (t) => {
        const formdata = new FormData();
        formdata.append('TableRows', t.TableRows);
        formdata.append('Table', t.Table);
        return apiInstance.post('/account_planner/getAccountPlanner', formdata);
    };

    // useEffect(() => {
    //     setMasterData(masterData)
    // }, [masterData]);

    const onPostApi = response => {
        const { status, data } = response;
        if (status) {
            response && data && data.response
                ? userContext.renderToast({ message: intl.formatMessage({ id: 'transactionSavedSuccessfully' }) })
                : userContext.renderToast({
                    type: 'error',
                    icon: 'fa fa-times-circle',
                    message: intl.formatMessage({ id: 'noFormChangeFound' }),
                });
        } else {
            userContext.renderToast({
                type: 'error',
                icon: 'fa fa-times-circle',
                message: intl.formatMessage({ id: 'unableToReachServer' }),
            });
        }
    };

    return (
        <div className="pt-10">
            {masterData.length > 0 &&
                <>
                    <h5><FormattedMessage id="master" /></h5>
                    <BackendCore
                        key={'lcale-master-table'}
                        config={master.config}
                        Table={master.Table}
                        TableRows={master.TableRows}
                        TableAliasRows={master.TableAliasRows}
                        rowElements={master.rowElements}
                        defaultValues={master.defaultValues}
                        dbData={masterData}
                        postApiUrl="/account_planner/postAccountPlanner"
                        onPostApi={response => onPostApi(response)}
                        onReFetchData={() => getAll()}
                        cellWidth="12rem"
                        ajaxButtonName={intl.formatMessage({ id: 'submit' })}
                    />
                </>
            }
            {childData.length > 0 &&
                <>
                    <h5><FormattedMessage id="child" /></h5>
                    <BackendCore
                        key={'lcale-master-table'}
                        config={child.config}
                        Table={child.Table}
                        TableRows={child.TableRows}
                        TableAliasRows={child.TableAliasRows}
                        rowElements={child.rowElements}
                        defaultValues={child.defaultValues}
                        dbData={childData}
                        postApiUrl="/account_planner/postAccountPlanner"
                        onPostApi={response => onPostApi(response)}
                        onReFetchData={() => getAll()}
                        cellWidth="12rem"
                        ajaxButtonName={intl.formatMessage({ id: 'submit' })}
                    />
                </>
            }
        </div>)
}

export default Intl18;