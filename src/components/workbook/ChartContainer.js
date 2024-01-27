import React, { useContext, Suspense } from "react";
import { Row, Col, InputGroup, Button, Dropdown, Form } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import WorkbookContext from "./WorkbookContext";
import * as cList from "../shared/D3";

const ChartContainer = () => {
  const intl = useIntl();
  const workbookContext = useContext(WorkbookContext);
  const chartList = Object.keys(cList).reduce(
    (obj, item) => ({ ...obj, [item]: cList[item] }),
    {},
  );
  const { theme, zoom, activeSheet, sheets, setSheets, chartData } =
    workbookContext;
  console.log("bbb", chartData); // work here: chart data on change shud interact existing props
  const selectedSheetCharts = sheets.filter(f => f.id === activeSheet)[0]
    ?.charts;

  const onDropHandle = e => {
    const data = {
      ...JSON.parse(e.dataTransfer.getData("workbookDragData")),
      ...{ clientX: e.clientX, clientY: e.clientY },
    };
    console.log("bbb", data);

    const updatedSheet = sheets.map(sheet =>
      sheet.id === activeSheet
        ? { ...sheet, charts: [...sheet.charts, data?.chart] }
        : sheet,
    );
    console.log("bbb", updatedSheet);
    setSheets(updatedSheet);
  };

  const Loader = () => (
    <div className='position-relative h-100'>
      <div className='position-absolute w-100 h-100 d-flex align-items-center justify-content-center'>
        <i className='fa fa-circle-o-notch fa-5x fa-spin icon-bni' />
      </div>
    </div>
  );

  return (
    <Suspense fallback={<Loader />}>
      <div className='position-relative'>
        <div
          style={{ zoom: zoom / 100 }}
          className={`chart-container chart-container-${theme} w-100`}
          onDrop={e => onDropHandle(e)}
          onDragOver={e => {
            e.preventDefault();
          }}
        >
          {selectedSheetCharts?.length > 0 &&
            selectedSheetCharts.map((s, i) => {
              const Component = chartList[s.chartKey];
              return <Component key={i} {...s.props} />;
            })}
          <div className='position-absolute w-100 top-0 start-0'>
            <Row>
              <Col md={6}>
                <InputGroup className={`p-1 bg-${theme} rounded`} size='sm'>
                  <Dropdown>
                    <Dropdown.Toggle
                      className={`bni-border bni-border-all bni-border-all-1 btn-bni`}
                    >
                      <FormattedMessage
                        id='workbook'
                        defaultMessage='workbook'
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant={theme}>
                      <Dropdown.Item href='#'>Menu 1</Dropdown.Item>
                      <Dropdown.Item href='#'>Menu 2</Dropdown.Item>
                      <Dropdown.Item href='#'>Menu 3</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href='#'>Menu 4</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Form.Control
                    className='bni-border bni-border-all bni-border-all-1'
                    placeholder={`${intl.formatMessage({
                      id: "workbook",
                      defaultMessage: "workbook",
                    })} ${intl.formatMessage({
                      id: "fileName",
                      defaultMessage: "fileName",
                    })}`}
                  />
                  <Button
                    variant='outline-secondary'
                    className='bni-border bni-border-all bni-border-all-1'
                  >
                    <i className='fa fa-save icon-bni' />
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ChartContainer;
