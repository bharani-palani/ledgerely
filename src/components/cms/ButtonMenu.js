import React, { useEffect, useContext, useState } from 'react';
import {
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Button,
} from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { LayoutContext } from './layoutDesign';
import { UserContext } from '../../contexts/UserContext';
import AddPage from './AddPage';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const statusInfo = {
  saved: { icon: 'fa fa-save', rowClass: 'btn-primary' },
  published: { icon: 'fa fa-cloud-upload', rowClass: 'btn-success' },
  inactive: { icon: 'fa fa-lock', rowClass: 'btn-warning' },
  deleted: { icon: 'fa fa-trash', rowClass: 'btn-danger' },
};

function ButtonMenu(props) {
  const userContext = useContext(UserContext);
  const layoutContext = useContext(LayoutContext);
  const [showAddPage, setShowAddPage] = useState(false);
  const sortList = ['saved', 'published', 'inactive', 'deleted'];

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
        key: uuidv4(),
        props: {},
        title: `${data.pageLabel} page`,
        children: [],
        component: 'Main',
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

  const onPushAction = type => {
    const payLoad = {
      pageId: layoutContext.state.pageDetails.pageId,
      pageObject: layoutContext.state.pageDetails.pageObject,
      hasAccessTo: layoutContext.state.pageDetails.hasAccessTo,
      pageLabel: layoutContext.state.pageDetails.pageLabel,
      pageRoute: layoutContext.state.pageDetails.pageRoute,
      pageUpdatedAt: moment(new Date(), 'YYYY/MMM/DD').format(
        'YYYY-MM-DD:HH:mm:ss'
      ),
      pageModifiedBy: userContext.userData.userId,
      pageStatus: type.pub_id,
      pageIsFreezed: 0,
    };
    const formdata = new FormData();
    formdata.append('postData', JSON.stringify(payLoad));
    apiInstance
      .post('/updatePage', formdata)
      .then(res => {
        if (res.data.response) {
          // set pageStatus on success callback
          userContext.renderToast({
            message: `Page successfully ${type.pub_value}`,
          });
          getPages();
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Something went wrong. Please try again.',
        });
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
                        onClick={() => onPushAction(status)}
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
          </Row>
        </React.Fragment>
      )}
    </LayoutContext.Consumer>
  );
}

export default ButtonMenu;
