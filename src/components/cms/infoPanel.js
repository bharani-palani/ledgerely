import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from './layoutDesign';
import ReactiveForm from '../configuration/ReactiveForm';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { UserContext } from '../../contexts/UserContext';

function InfoPanel(props) {
  const layoutContext = useContext(LayoutContext);
  const userContext = useContext(UserContext);

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

  return (
    <LayoutContext.Consumer>
      {layoutDetails =>
        layoutDetails.state.pageDetails &&
        Object.keys(layoutDetails.state.pageDetails).length > 0 && (
          <Row className="mt-3">
            <Col xs={12}>
              <div className="border border-secondary rounded-2 p-3">
                <Row className="align-items-center">
                  <Col md={4}>
                    <Col xs={12}>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip {...props}>Modified By</Tooltip>}
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
                        overlay={<Tooltip {...props}>Created At</Tooltip>}
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
                        overlay={<Tooltip {...props}>Updated At</Tooltip>}
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
                  <Col md={4}>
                    <div className="d-grid">
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
                        <div className="bg-secondary text-white rounded text-center">
                          {layoutDetails.state.pageDetails.pageLabel}
                        </div>
                      </OverlayTrigger>
                    </div>
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
                  </Col>
                  <Col md={4}>
                    {layoutContext.state.selectedNodeId && (
                      <div>
                        <div className="">
                          <small>Node Id:</small>{' '}
                        </div>
                        <span className="badge bg-secondary">
                          {layoutContext.state.selectedNodeId}
                        </span>
                      </div>
                    )}
                    {layoutContext.state.selectedComponent && (
                      <div>
                        <div className="">
                          <small>Component:</small>{' '}
                        </div>
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
        )
      }
    </LayoutContext.Consumer>
  );
}

export default InfoPanel;
