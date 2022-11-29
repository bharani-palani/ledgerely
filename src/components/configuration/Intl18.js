import React, { useContext, useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import BackendCore from '../../components/configuration/backend/BackendCore';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import { Dropdown } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import helpers from "../../helpers";

const Intl18 = props => {
    const intl = useIntl();
    const [masterData, setMasterData] = useState([]);
    const [childData, setChildData] = useState([]);
    const [selectedLocaleId, setSelectedLocaleId] = useState("");
    const [loader, setLoader] = useState(false);
    const userContext = useContext(UserContext);

    const loaderComp = () => {
        return (
            <div className="relativeSpinner">
                <Loader
                    type={helpers.loadRandomSpinnerIcon()}
                    color={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
                    height={100}
                    width={100}
                />
            </div>
        );
    };

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
            'label',
            'textbox',
        ]
    };
    const defaultData = [{
        'locale_id': "",
        'locale_label': "",
        'locale_string': "",
        'locale_language': "",
        'locale_currency': "",
        'locale_sort': "",
    }];

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        setLoader(true);
        setMasterData([]);
        const a = getFromTable(master);
        Promise.all([a])
            .then(r => {
                const rows = r[0].data.response;
                rows.length > 0 ? setMasterData(rows) : setMasterData(defaultData);
                rows.length > 0 ? setSelectedLocaleId(rows[0].locale_id) : setSelectedLocaleId("");
            })
            .catch(() => {
                setMasterData([]);
            })
            .finally(() => setLoader(false));
    };

    const getFromTable = (t, wClause) => {
        const formdata = new FormData();
        formdata.append('TableRows', t.TableRows);
        formdata.append('Table', t.Table);
        if (wClause) {
            formdata.append('WhereClause', wClause);
        }
        return apiInstance.post('/account_planner/getAccountPlanner', formdata);
    };

    useEffect(() => {
        if (selectedLocaleId) {
            setChildData([]);
            setLoader(true);
            getFromTable(child, `locale_ref_id = ${selectedLocaleId}`)
                .then(async r => {
                    r.data.response.length > 0 ? setChildData(r.data.response) : setChildData(defaultData);
                })
                .catch(() => {
                    setChildData([]);
                })
                .finally(() => setLoader(false));
        }
    }, [selectedLocaleId]);

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
                    <h5><FormattedMessage id="child" /></h5>
                    <Dropdown className='pb-3'>
                        <Dropdown.Toggle className="btn btn-bni">
                            {
                                selectedLocaleId ?
                                    masterData.filter(f => (f.locale_id === selectedLocaleId))[0].locale_label :
                                    intl.formatMessage({ id: 'selectLanguage' })
                            }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {masterData.map((d, i) => (
                                <Dropdown.Item
                                    onClick={e => setSelectedLocaleId(d.locale_id)}
                                    key={i}
                                >
                                    {d.locale_label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {childData.length > 0 &&
                        <>
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
                                cellWidth="17rem"
                                ajaxButtonName={intl.formatMessage({ id: 'submit' })}
                            />
                        </>
                    }
                    {loader && loaderComp()}
                </>
            }
        </div>)
}

export default Intl18;