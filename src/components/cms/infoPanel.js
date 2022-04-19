import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from './layoutDesign';
import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  FormControl,
  Form,
  Accordion,
  Card,
  useAccordionButton,
} from 'react-bootstrap';
import moment from 'moment';
import { UserContext } from '../../contexts/UserContext';
import Select from 'react-select';
import { statusInfo } from './ButtonMenu';

function InfoPanel(props) {
  const layoutContext = useContext(LayoutContext);
  const userContext = useContext(UserContext);
  const [accessorList, setAccessorList] = useState([]);
  const [formDefaults, setFormDefaults] = useState({});

  useEffect(() => {
    if (
      layoutContext.state.pageDetails &&
      layoutContext.state.accessLevels &&
      Object.keys(layoutContext.state.accessLevels).length &&
      Object.keys(layoutContext.state.pageDetails).length
    ) {
      const preDefined = layoutContext.state.pageDetails.hasAccessTo;
      const getSuperAdminId = layoutContext.state.accessLevels.filter(
        f => f.accessValue === 'superAdmin'
      )[0].accessId;

      const accessList = layoutContext.state.accessLevels.map(access => ({
        value: access.accessId,
        label: access.accessLabel,
        isSelected: preDefined.includes(access.accessId),
        isFixed: access.accessId === getSuperAdminId,
      }));
      setAccessorList(accessList);
      setFormDefaults({
        pageLabel: layoutContext.state.pageDetails.pageLabel,
        pageRoute: layoutContext.state.pageDetails.pageRoute,
      });
    }
  }, [layoutContext.state.pageDetails, layoutContext.state.accessLevels]);

  const onSetPageLabel = (key, value) => {
    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        [key]: value,
      },
    }));
  };

  const onSetPageRoute = value => {
    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageRoute: value.substr(0, 1) === '/' ? value : `/${value}`,
      },
    }));
  };

  const onAccessSelection = data => {
    const list = data.map(d => d.value);
    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        hasAccessTo: list,
      },
    }));
  };

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <div className="row p-0 m-0">
        <div className="col-11 d-grid p-0">
          <button
            type="button"
            className={`btn-sm text-start btn ${
              userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-white'
            }`}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        </div>
        {layoutContext.state.loading && (
          <div className="col-1 text-end">
            <div
              className="spinner-grow text-primary spinner-grow-sm"
              role="status"
            />
          </div>
        )}
      </div>
    );
  };

  const getPubClass = () => {
    const value = layoutContext.state.statusList.filter(f => {
      return f.pub_id === layoutContext.state.pageDetails.pageStatus;
    })[0].pub_value;
    return statusInfo[value].rowClass;
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails =>
        layoutDetails.state.pageDetails &&
        Object.keys(layoutDetails.state.pageDetails).length > 0 && (
          <Accordion defaultActiveKey={0} className="mt-2">
            <Card
              key={1}
              className={`mb-1 ${
                userContext.userData.theme === 'dark'
                  ? 'bg-dark text-light'
                  : 'bg-light text-dark'
              }`}
            >
              <Card.Header className="row m-0 p-0">
                <CustomToggle eventKey={0}>Page Config</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={0}>
                <Card.Body className="p-2">
                  <Row className="">
                    <Col xs={12}>
                      <div>
                        <Row>
                          <Col sm={6}>
                            <InputGroup size="sm" className="mb-1">
                              <InputGroup.Text>
                                <Form.Label
                                  htmlFor="pageLabel"
                                  className="mb-0"
                                >
                                  Page Name
                                </Form.Label>
                              </InputGroup.Text>
                              <FormControl
                                id="pageLabel"
                                defaultValue={formDefaults.pageLabel}
                                onChange={e =>
                                  onSetPageLabel('pageLabel', e.target.value)
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col sm={6}>
                            <InputGroup size="sm" className="mb-1">
                              <InputGroup.Text>
                                <Form.Label
                                  htmlFor="pageRoute"
                                  className="mb-0"
                                >
                                  Page Link
                                </Form.Label>
                              </InputGroup.Text>
                              <FormControl
                                id="pageRoute"
                                defaultValue={formDefaults.pageRoute}
                                onChange={e => onSetPageRoute(e.target.value)}
                              />
                            </InputGroup>
                          </Col>
                          <Col sm={12} className="pt-2">
                            {accessorList.length > 0 && (
                              <>
                                <label className="p-2 badge bg-primary pill mb-1 fw-normal">
                                  Page access for
                                </label>
                                <Select
                                  defaultValue={accessorList.filter(
                                    f => f.isSelected
                                  )}
                                  isMulti
                                  onChange={d => onAccessSelection(d)}
                                  options={accessorList}
                                  className="text-dark bg-light rounded mb-1"
                                  isClearable={false}
                                  backspaceRemovesValue={false}
                                  styles={{
                                    multiValueRemove: (base, state) => {
                                      return state.data.isFixed
                                        ? { ...base, display: 'none' }
                                        : base;
                                    },
                                  }}
                                />
                              </>
                            )}
                          </Col>
                        </Row>
                        <Row className="">
                          <Col md={6} className="mb-1">
                            <Col xs={12}>
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip {...props}>Modified By</Tooltip>
                                }
                              >
                                <i className="fa fa-user pe-2" />
                              </OverlayTrigger>
                              <em className="badge bg-secondary">
                                {layoutDetails.state.pageDetails.pageModifiedBy}
                              </em>
                            </Col>
                            <Col xs={12}>
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip {...props}>Created At</Tooltip>
                                }
                              >
                                <i className="fa fa-calendar pe-2" />
                              </OverlayTrigger>
                              <em className="badge bg-secondary">
                                {moment(
                                  new Date(
                                    layoutDetails.state.pageDetails.pageCreatedAt
                                  )
                                ).format('MMM Do YYYY, h:mm a')}
                              </em>
                            </Col>
                            <Col xs={12}>
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip {...props}>Updated At</Tooltip>
                                }
                              >
                                <i className="fa fa-clock-o pe-2" />
                              </OverlayTrigger>
                              <em className="badge bg-secondary">
                                {moment(
                                  new Date(
                                    layoutDetails.state.pageDetails.pageUpdatedAt
                                  )
                                ).format('MMM Do YYYY, h:mm a')}
                              </em>
                            </Col>
                          </Col>
                          <Col md={6} className="mb-1 text-end">
                            {layoutContext.state.pageDetails.pageStatus && (
                              <div>
                                <small className={`me-2`}>Status</small>
                                <span className={`badge pill ${getPubClass()}`}>
                                  {
                                    layoutContext.state.statusList.filter(f => {
                                      return (
                                        f.pub_id ===
                                        layoutContext.state.pageDetails
                                          .pageStatus
                                      );
                                    })[0].pub_name
                                  }
                                </span>
                              </div>
                            )}
                            {layoutContext.state.selectedNodeId && (
                              <div>
                                <small>Node Id:</small>{' '}
                                <span className="badge bg-secondary">
                                  {layoutContext.state.selectedNodeId}
                                </span>
                              </div>
                            )}
                            {layoutContext.state.selectedComponent && (
                              <div>
                                <small>Component:</small>{' '}
                                <span className="badge bg-secondary">
                                  {`<${layoutContext.state.selectedComponent}>`}
                                </span>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )
      }
    </LayoutContext.Consumer>
  );
}

export default InfoPanel;
