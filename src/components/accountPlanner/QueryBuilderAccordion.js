import React, { useState, useEffect, useContext } from 'react';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import QueryBuilder from './QueryBuilder/';
import { creditCard, incomeExpense } from './QueryBuilderMockData';
import apiInstance from '../../services/apiServices';
import BackendCore from '../../components/configuration/backend/BackendCore';
import { AccountContext } from './AccountPlanner';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import CsvDownloader from 'react-csv-downloader';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const QueryBuilderAccordion = props => {
  const accountContext = useContext(AccountContext);
  const now = helpers.getNow();
  const { ...rest } = props;
  const [collapse, setCollapse] = useState('Credit Cards');
  const [data, setData] = useState([]); // use sample for testing
  const [loaderState, setLoaderState] = useState(false);
  const [initQuery, setInitQuery] = useState(false);
  const [config, setConfig] = useState({
    TableAliasRows: [],
    TableRows: [],
  });
  const [columns, setColumns] = useState([]);

  const accordions = [
    {
      id: 2,
      label: 'Bank Accounts',
      component: (
        <QueryBuilder
          schema={incomeExpense}
          onUpdateSchema={sqlQuery => runQuery(sqlQuery)}
        />
      ),
    },
    {
      id: 1,
      label: 'Credit Cards',
      component: (
        <QueryBuilder
          schema={creditCard}
          onUpdateSchema={sqlQuery => runQuery(sqlQuery)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (data.length > 0) {
      const TableAliasRows = Object.keys(data[0]);
      setConfig({
        TableAliasRows,
        TableRows: TableAliasRows,
        rowElements: Array(TableAliasRows.length).fill('label'),
      });
      const cols = TableAliasRows.map(t => ({
        displayName: t.replace(/,/g, ''),
        id: t,
      }));
      setColumns(cols);
    }
  }, [data]);

  const apiTest = sqlQuery => {
    const formdata = new FormData();
    const refinedQuery = sqlQuery.replace(/%/g, '{%}');
    const postData = encodeURIComponent(refinedQuery);
    formdata.append('postData', postData);
    return apiInstance.post('/account_planner/runQuery', formdata);
  };

  const runQuery = sqlQuery => {
    setData([]);
    setLoaderState(true);
    setInitQuery(true);
    apiTest(sqlQuery)
      .then(async r => {
        setLoaderState(false);
        setData(r.data.response.result);
      })
      .catch(error => {
        setLoaderState(false);
        accountContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Some thing went wrong. Please check your query.',
        });
      });
  };

  const loaderComp = () => {
    return (
      <div className="relativeSpinner">
        <Loader
          type={helpers.loadRandomSpinnerIcon()}
          color={document.documentElement.style.getPropertyValue(
            '--app-theme-bg-color'
          )}
          height={100}
          width={100}
        />
      </div>
    );
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id="button-tooltip-1" className="in show" {...rest}>
      {content}
    </Tooltip>
  );

  function CustomToggle({ children, eventKey, object }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      setCollapse(object.label);
      setData([]);
      setInitQuery(false);
    });

    return (
      <button
        type="button"
        className={`col-12 text-start btn btn-dark`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="mt-15">
      <Accordion bsPrefix="util" defaultActiveKey={0}>
        {accordions.map((t, i) => (
          <Card key={t.id} className={`my-2 bg-dark text-light`}>
            <Card.Header className="m-0 row">
              <CustomToggle eventKey={t.id} object={t}>
                {t.label}
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={t.id}>
              <Card.Body className="p-2">
                {t.label === collapse && t.component}
                {data.length > 0 && (
                  <>
                    <div className="buttonGrid">
                      <div />
                      <CsvDownloader
                        datas={helpers.stripCommasInCSV(data)}
                        filename={`Query-result-${now}.csv`}
                        columns={columns}
                      >
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderCloneTooltip(props, 'Export CSV')}
                          triggerType="hover"
                        >
                          <i className="fa fa-file-excel-o roundedButton pull-right" />
                        </OverlayTrigger>
                      </CsvDownloader>
                    </div>
                    <BackendCore
                      dbData={data}
                      cellWidth={`20rem`}
                      TableAliasRows={config.TableAliasRows}
                      TableRows={config.TableRows}
                      rowElements={config.rowElements}
                    />
                  </>
                )}
                {!loaderState && !data.length && initQuery && (
                  <div className="py-3 text-center">No Records Generated</div>
                )}
                {loaderState && loaderComp()}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default QueryBuilderAccordion;
