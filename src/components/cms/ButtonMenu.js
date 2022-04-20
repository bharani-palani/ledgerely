import React, { useEffect, useContext, useState } from 'react';
import {
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Button,
  Alert,
} from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { LayoutContext } from './layoutDesign';
import { UserContext } from '../../contexts/UserContext';
import AddPage from './AddPage';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import ConfirmationModal from '../configuration/Gallery/ConfirmationModal';

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
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const minScrollValue = 400;

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    layoutContext.setState(prevState => ({
      ...prevState,
      loading: true,
    }));
    getPages();
    const a = apiInstance.get('/getPageStatuses');
    const b = apiInstance.get('/getAccessLevels');

    Promise.all([a, b])
      .then(res => {
        layoutContext.setState(prevState => ({
          ...prevState,
          statusList: res[0].data.response,
          accessLevels: res[1].data.response,
        }));
      })
      .catch(() => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Unable to fetch pages. Please try again later',
        });
      })
      .finally(() => {
        layoutContext.setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      });
  }, []);

  const listenToScroll = () => {
    const height = window.pageYOffset;
    setScrollPosition(height);
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
    layoutContext.setState(prevState => ({
      ...prevState,
      loading: true,
    }));
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
      })
      .finally(() => {
        layoutContext.setState(prevState => ({
          ...prevState,
          loading: false,
        }));
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
        layoutContext.setState(prevState => ({
          ...prevState,
          selectedNodeId: '',
          selectedComponent: '',
        }));
      });
  };

  const onPushAction = type => {
    if (type.pub_value === 'deleted') {
      setDeleteOpenModal(true);
    } else {
      updateApiAction(type);
    }
  };

  const approveDeletePage = () => {
    const deletObj = layoutContext.state.statusList.filter(
      f => f.pub_value === 'deleted'
    )[0];
    updateApiAction(deletObj);
    setDeleteOpenModal(false);
  };

  const updateApiAction = type => {
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
    layoutContext.setState(prevState => ({
      ...prevState,
      loading: true,
    }));
    apiInstance
      .post('/updatePage', formdata)
      .then(res => {
        if (res.data.response) {
          layoutContext.setState(prevState => ({
            ...prevState,
            loading: false,
            pageDetails: {
              ...prevState.pageDetails,
              pageStatus: type.pub_id,
            },
          }));
          userContext.renderToast({
            message: `Page successfully ${type.pub_value}`,
          });
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
          <ConfirmationModal
            show={deleteOpenModal}
            confirmationstring={`Are you sure to delete page?`}
            handleHide={() => {
              setDeleteOpenModal(false);
            }}
            handleYes={() => approveDeletePage()}
            size="md"
          />

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
                {layoutDetails.state.statusList &&
                  layoutDetails.state.accessLevels && (
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
                      {layoutDetails.state.pageDetails &&
                        layoutDetails.state.pageList &&
                        layoutDetails.state.pageList.map((page, i) => (
                          <Dropdown.Item
                            key={i}
                            onClick={() => getPageDetails(page)}
                            active={
                              page.pageId ===
                              layoutDetails.state.pageDetails.pageId
                            }
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
                        disabled={!layoutDetails.state.pageDetails}
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
            {!layoutDetails.state ||
              !layoutDetails.state.pageList ||
              (!layoutDetails.state.pageList.length && (
                <Col xs={12}>
                  <Alert variant="danger" className="mt-2 text-center">
                    <Alert.Heading>
                      Hey, There are no pages found to design.{' '}
                    </Alert.Heading>
                    <p>Please add a page from pages dropdown</p>
                    <hr />
                    <p className="mb-0">
                      <kbd>Note:</kbd> Dont forget to publish your pages once
                      saved
                    </p>
                  </Alert>
                </Col>
              ))}
          </Row>
          {scrollPosition > minScrollValue && (
            <div
              className={`col-md-2 col-12 ${
                userContext.userData.theme === 'dark' ? 'bg-dark' : 'bg-light'
              }`}
              style={{
                zIndex: 1,
                position: 'fixed',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <div className="d-flex btn-group btn-group-sm">
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
                        className={`px-3 ${
                          statusInfo[status.pub_value].rowClass
                        }`}
                        disabled={!layoutDetails.state.pageDetails}
                        onClick={() => onPushAction(status)}
                      >
                        <i className={statusInfo[status.pub_value].icon} />
                      </Button>
                    ))}

                <button
                  className={`px-3 btn btn-secondary ${
                    layoutDetails.state.viewMode === 'tree' ? 'active' : ''
                  }`}
                  onClick={() =>
                    layoutContext.setState(prevState => ({
                      ...prevState,
                      viewMode: 'tree',
                    }))
                  }
                >
                  <i className="fa fa-list-ul" />
                </button>
                <button
                  className={`px-3 btn btn-secondary ${
                    layoutDetails.state.viewMode === 'design' ? 'active' : ''
                  }`}
                  onClick={() =>
                    layoutContext.setState(prevState => ({
                      ...prevState,
                      viewMode: 'design',
                    }))
                  }
                >
                  <i className="fa fa-object-ungroup" />
                </button>
                <button
                  className={`px-3 btn btn-secondary ${
                    layoutDetails.state.viewMode === 'preview' ? 'active' : ''
                  }`}
                  onClick={() =>
                    layoutContext.setState(prevState => ({
                      ...prevState,
                      viewMode: 'preview',
                    }))
                  }
                >
                  <i className="fa fa-play" />
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </LayoutContext.Consumer>
  );
}

export default ButtonMenu;
