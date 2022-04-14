import React, { useState, useContext } from 'react';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';
import BuiltInList from './BuiltInList';
import BootstrapList from './BootstrapList';
import PropsList from './PropsList';
import StyleList from './StyleList';

function SideMenu(props) {
  const userContext = useContext(UserContext);
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
    { id: 3, label: 'Functions', body: 'Functions body' },
    {
      id: 4,
      label: 'Database',
      children: [
        { id: 4.1, label: 'List', body: 'List table' },
        { id: 4.2, label: 'Create', body: 'Create table' },
        { id: 4.3, label: 'Fetch', body: 'Fetch table' },
      ],
    },
    {
      id: 5,
      label: 'Install Plugins',
      body: 'Install Plugins',
    },
  ]);

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
  return (
    <Accordion defaultActiveKey={2} alwaysOpen>
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
                  <Accordion key={ch.id} defaultActiveKey={[0.2]} alwaysOpen>
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
                        <Card.Body className="p-1">{ch.body}</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}

export default SideMenu;
