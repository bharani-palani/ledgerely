import React, { useContext } from "react";
import { Row, Col, InputGroup, Button, Dropdown, Form } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import WorkbookContext from "./WorkbookContext";

const Canvas = props => {
  const intl = useIntl();
  const workbookContext = useContext(WorkbookContext);
  const { theme } = workbookContext;

  return (
    <div className='position-relative'>
      <canvas className={`canvas canvas-${theme}`}></canvas>
      <div className='position-absolute w-100 top-0 start-0'>
        <Row>
          <Col md={6}>
            <InputGroup className='p-1' size='sm'>
              <Dropdown>
                <Dropdown.Toggle
                  className={`bni-border bni-border-all bni-border-all-1 btn-bni`}
                >
                  <FormattedMessage id='workbook' defaultMessage='workbook' />
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
  );
};

export default Canvas;
