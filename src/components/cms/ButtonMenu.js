import React, { useEffect, useContext, useState } from 'react';
import {
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { LayoutContext } from './layoutDesign';
import { UserContext } from '../../contexts/UserContext';
import AddPage from './AddPage';
import moment from 'moment';
import ReactiveForm from '../configuration/ReactiveForm';

function ButtonMenu(props) {
  const userContext = useContext(UserContext);
  const layoutContext = useContext(LayoutContext);
  const [showAddPage, setShowAddPage] = useState(false); // set to false
  const sortList = ['saved', 'published', 'inactive', 'deleted'];
  const [formStructure, setFormStructure] = useState([
    {
      id: 'page_access_levels',
      index: 'page_access_levels',
      label: 'Page Access To',
      elementType: 'checkBox',
      value: [],
      isInline: true,
      placeHolder: '',
      className: '',
      list: [],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: 'At least 1 access level is required',
      },
    },
  ]);
  const statusInfo = {
    saved: { icon: 'fa fa-save', rowClass: 'btn-primary' },
    published: { icon: 'fa fa-cloud-upload', rowClass: 'btn-success' },
    inactive: { icon: 'fa fa-lock', rowClass: 'btn-warning' },
    deleted: { icon: 'fa fa-trash', rowClass: 'btn-danger' },
  };

  useEffect(() => {
    getPages();
    const a = apiInstance.get('/getPageStatuses');
    const b = apiInstance.get('/getAccessLevels');

    Promise.all([a, b])
      .then(res => {
        layoutContext.setState(prevState => ({
          ...prevState,
          statusList: res[0].data.response,
        }));
        layoutContext.setState(prevState => ({
          ...prevState,
          accessLevels: res[1].data.response,
        }));
      })
      .catch(() => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Unable to fetch pages. Please try again later',
        });
      });
  }, []);

  useEffect(() => {
    if (
      layoutContext.state.pageDetails &&
      layoutContext.state.accessLevels &&
      Object.keys(layoutContext.state.accessLevels).length &&
      Object.keys(layoutContext.state.pageDetails).length
    ) {
      const getSuperAdminId = layoutContext.state.accessLevels.filter(
        f => f.accessValue === 'superAdmin'
      )[0].accessId;
      let addAccessToForm = [...formStructure];
      addAccessToForm = addAccessToForm.map(form => {
        if (form.id === 'page_access_levels') {
          const selecteds = layoutContext.state.pageDetails.hasAccessTo.split(
            ','
          );
          form.value = selecteds;
          const accessList = layoutContext.state.accessLevels.map(access => ({
            id: access.accessId,
            value: access.accessId,
            label: access.accessLabel,
            checked: selecteds.includes(String(access.accessId)) ? true : false,
            disabled:
              String(access.accessId) === String(getSuperAdminId)
                ? true
                : false,
          }));
          form.list = accessList;
        }
        return form;
      });
      setFormStructure([]);
      setTimeout(() => {
        setFormStructure(addAccessToForm);
      }, 100);
    }
  }, [layoutContext.state.pageDetails, layoutContext.state.accessLevels]);

  // useEffect(() => {
  // 	if(formStructure.length > 0) {
  // 		setFormStructure([]);
  // 		setTimeout(() => {
  // 			setFormStructure(formStructure);
  // 		}, 100);
  // 	}
  // },[formStructure]);

  const onSetAccess = (index, value, list = {}) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.list &&
          backup.list.length > 0 &&
          backup.list.map(l => {
            if (String(l.id) === String(list.id)) {
              l.checked = list.checked;
            }
            return l;
          });
        const newValue =
          !value && Object.keys(list).length > 0
            ? backup.list.filter(f => f.checked).map(c => c.value)
            : value;
        backup.value = newValue;
      }
      return backup;
    });
    setFormStructure(backupStructure);
    // todo: set pageaccess in global properties
  };
  const getPages = () => {
    apiInstance
      .get('/getConfigPages')
      .then(res => {
        const list = res.data.response;
        layoutContext.setState(prevState => ({ ...prevState, pageList: list }));
        const lastPageAdded = list[list.length - 1];
        lastPageAdded && getPageDetails(lastPageAdded);
      })
      .catch(() => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Unable to fetch pages. Please try again later',
        });
      });
  };

  const getPageDetails = obj => {
    const formdata = new FormData();
    formdata.append('pageId', obj.pageId);
    apiInstance
      .post('/getConfigPageDetails', formdata)
      .then(res => {
        const details = res.data.response;
        layoutContext.setState(prevState => ({
          ...prevState,
          pageDetails: details,
        }));
      })
      .catch(() => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Unable to fetch page details. Please try again..',
        });
      });
  };

  const onAddPageFormAction = data => {
    const now = moment(new Date(), 'YYYY/MMM/DD').format('YYYY-MM-DD:HH:mm:ss');
    const payLoad = {
      ...data,
      modifiedBy: userContext.userData.userId,
      pageObject: {
        props: {},
        children: `${data.pageLabel} page`,
        component: 'div',
      },
      pageCreatedAt: now,
      pageUpatedAt: now,
      pageStatus:
        layoutContext.state.statusList.filter(f => f.pub_value === 'saved')[0]
          .pub_id || null,
    };

    const formdata = new FormData();
    formdata.append('postData', JSON.stringify(payLoad));
    apiInstance
      .post('/createPage', formdata)
      .then(res => {
        if (res.data.response) {
          userContext.renderToast({ message: 'Page successfully created' });
          getPages();
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Something went wrong. Please try again.',
        });
      })
      .finally(() => {
        setShowAddPage(false);
      });
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <React.Fragment>
          {showAddPage && (
            <AddPage
              {...props}
              show={showAddPage}
              onHide={() => setShowAddPage(false)}
              onFormSubmit={onAddPageFormAction}
            />
          )}
          <Row>
            <Col xs={12} className="d-grid">
              <ButtonGroup size="sm">
                {layoutDetails.state.pageList &&
                  layoutDetails.state.pageList.length > 0 && (
                    <DropdownButton
                      size="sm"
                      title="Pages"
                      variant={
                        userContext.userData.theme === 'dark'
                          ? 'light'
                          : 'secondary'
                      }
                      as={ButtonGroup}
                    >
                      <Dropdown.Item onClick={() => setShowAddPage(true)}>
                        <i className="fa fa-plus" /> Add Page
                      </Dropdown.Item>
                      {layoutDetails.state.pageList.map((page, i) => (
                        <Dropdown.Item
                          key={i}
                          onClick={() => getPageDetails(page)}
                        >
                          {page.pageLabel}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  )}
                {layoutDetails.state.statusList &&
                  layoutDetails.state.statusList.length > 0 &&
                  layoutDetails.state.statusList
                    .filter(f =>
                      ['published', 'inactive', 'deleted', 'saved'].includes(
                        f.pub_value
                      )
                    )
                    .sort((a, b) => {
                      return (
                        sortList.indexOf(a.pub_value) -
                        sortList.indexOf(b.pub_value)
                      );
                    })
                    .map((status, i) => (
                      <Button
                        key={i}
                        className={`${statusInfo[status.pub_value].rowClass}`}
                        disabled={
                          layoutDetails.state.pageDetails &&
                          !Object.keys(layoutDetails.state.pageDetails).length >
                            0
                        }
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <i className={statusInfo[status.pub_value].icon} />
                          <span className="d-none d-sm-block ps-2">
                            {status.pub_verb}
                          </span>
                        </div>
                      </Button>
                    ))}
              </ButtonGroup>
            </Col>
            {layoutDetails.state.pageDetails &&
              Object.keys(layoutDetails.state.pageDetails).length > 0 && (
                <React.Fragment>
                  <Col xs={12}>
                    <div className="text-center py-2">
                      <div>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip {...props}>
                              <i className="fa fa-link px-2 text-primary" />{' '}
                              {layoutDetails.state.pageDetails.pageRoute}
                            </Tooltip>
                          }
                        >
                          <span className="badge bg-light text-dark">
                            {layoutDetails.state.pageDetails.pageLabel}
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="row pb-2">
                      <div className="col-md-4 py-1">
                        <Col xs={12}>
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip {...props}>Modified By</Tooltip>}
                          >
                            <i className="fa fa-user pe-2" />
                          </OverlayTrigger>
                          <em className="badge bg-light text-dark">
                            {layoutDetails.state.pageDetails.pageModifiedBy}
                          </em>
                        </Col>
                        <Col xs={12}>
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip {...props}>Created At</Tooltip>}
                          >
                            <i className="fa fa-calendar pe-2" />
                          </OverlayTrigger>
                          <em className="badge bg-light text-dark">
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
                            overlay={<Tooltip {...props}>Updated At</Tooltip>}
                          >
                            <i className="fa fa-clock-o pe-2" />
                          </OverlayTrigger>
                          <em className="badge bg-light text-dark">
                            {moment(
                              new Date(
                                layoutDetails.state.pageDetails.pageUpdatedAt
                              )
                            ).format('MMM Do YYYY, h:mm a')}
                          </em>
                        </Col>
                      </div>
                      <div className="col-md-8 py-1">
                        {formStructure.length > 0 && (
                          <ReactiveForm
                            parentClassName={`reactive-form ${
                              userContext.userData.theme === 'dark'
                                ? 'text-light'
                                : 'text-dark'
                            }`}
                            structure={formStructure}
                            onChange={onSetAccess}
                            submitBtnLabel={'Save'}
                            showSubmit={false}
                          />
                        )}
                      </div>
                    </div>
                  </Col>
                </React.Fragment>
              )}
          </Row>
        </React.Fragment>
      )}
    </LayoutContext.Consumer>
  );
}

export default ButtonMenu;
