import React, { useState, useContext, useEffect } from 'react';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';
import BuiltInList from './BuiltInList';
import BootstrapList from './BootstrapList';
import PropsList from './PropsList';
import StyleList from './StyleList';
import Title from './Title';
import { LayoutContext } from '../layoutDesign';

function SideMenu(props) {
  const userContext = useContext(UserContext);
  const layoutContext = useContext(LayoutContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sideMenu] = useState([
    {
      id: 0,
      label: 'Components',
      children: [
        { id: 0.1, label: 'Built in', body: <BuiltInList /> },
        { id: 0.2, label: 'Bootstrap', body: <BootstrapList /> },
      ],
    },
    { id: 1, label: 'Props', body: <PropsList /> },
    { id: 2, label: 'Styles', body: <StyleList /> },
    { id: 3, label: 'Title', body: <Title /> },
    { id: 4, label: 'Functions', body: 'Functions body' },
    {
      id: 5,
      label: 'Database',
      children: [
        { id: 5.1, label: 'List', body: 'List table' },
        { id: 5.2, label: 'Create', body: 'Create table' },
        { id: 5.3, label: 'Fetch', body: 'Fetch table' },
      ],
    },
    {
      id: 6,
      label: 'Install Plugins',
      body: 'Install Plugins',
    },
  ]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
  }, []);

  const listenToScroll = () => {
    const height = window.pageYOffset;
    setScrollPosition(height);
  };

  const CustomToggle = ({ children, eventKey, object }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () => null);

    return (
      <button
        type="button"
        className={`btn-sm text-start btn ${
          userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-white'
        }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };

  const getSideBarWidth = () => {
    let width = 0;
    if (screen.width < 768) {
      width = 95;
    } else if (screen.width >= 768 && screen.width <= 1024) {
      width = 97;
    } else if (screen.width >= 1080 && screen.width <= 1366) {
      width = 23;
    } else if (screen.width >= 1366 && screen.width <= 1920) {
      width = 17;
    } else {
      width = 23;
    }
    return width;
  };

  const getSideBarHeight = () => {
    let height = 0;
    if (screen.width <= 768) {
      height = 300;
    } else {
      height = 500;
    }
    return height;
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div
      className={`pt-2 ${
        userContext.userData.theme === 'light' ? 'bg-light' : 'bg-dark'
      }`}
      style={{
        ...(scrollPosition > 100 && {
          position: 'fixed',
          top: '100px',
          width: `${getSideBarWidth()}%`,
        }),
      }}
    >
      <div
        style={{
          ...(scrollPosition > 100 && {
            height: `${getSideBarHeight()}px`,
            overflowY: 'auto',
          }),
        }}
      >
        {layoutContext.state.pageDetails &&
          Object.keys(layoutContext.state.pageDetails).length > 0 && (
            <>
              <Accordion defaultActiveKey={3} alwaysOpen>
                {sideMenu.map((side, i) => (
                  <Card
                    key={side.id}
                    className={`mb-1 ${
                      userContext.userData.theme === 'dark'
                        ? 'bg-dark text-light'
                        : 'bg-light text-dark'
                    }`}
                  >
                    <Card.Header className="row m-0 p-0">
                      <CustomToggle eventKey={side.id} object={side}>
                        {side.label}
                      </CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={side.id}>
                      <Card.Body className="p-1">
                        {side.body && side.body}
                        {side.children &&
                          side.children.length > 0 &&
                          side.children.map((ch, j) => (
                            <Accordion
                              key={ch.id}
                              defaultActiveKey={[]}
                              alwaysOpen
                            >
                              {' '}
                              {/* defaultActiveKey={[0.2]} alwaysOpen */}
                              <Card
                                key={ch.id}
                                className={`mb-1 ${
                                  userContext.userData.theme === 'dark'
                                    ? 'bg-dark text-light'
                                    : 'bg-light text-dark'
                                }`}
                              >
                                <Card.Header className="row m-0 p-0">
                                  <CustomToggle eventKey={ch.id} object={side}>
                                    {ch.label}
                                  </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={ch.id}>
                                  <Card.Body className="p-1">
                                    {ch.body}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          ))}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </>
          )}
      </div>
      <div className="d-flex justify-content-between py-2">
        <i
          className="fa fa-arrow-circle-up cursor-pointer fs-5"
          onClick={scrollTop}
        />
        <i
          className="fa fa-arrow-circle-down cursor-pointer fs-5"
          onClick={scrollBottom}
        />
      </div>
    </div>
  );
}

export default SideMenu;
