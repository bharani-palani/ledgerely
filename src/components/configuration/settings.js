import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Config from './config';
import Gallery from './Gallery';
import Users from './users';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import OffCanvas from '../shared/OffCanvas';

const Settings = props => {
  const userContext = useContext(UserContext);
  const [collapse, setCollapse] = useState('');

  const compList = [
    {
      id: 1,
      label: 'Config',
      component: Config,
      help: {
        heading: 'Config help',
        points: [
          'Google & Geo: To integrate google maps and google based apps in your application. A super admin can login directly using google auth login.',
          'Address: The location where your entity is located (personal or company)',
          'Money & locale: Your regional locale to maintain currency and math decimal points in yous applications. UPI key to receive payments from your buyers or payers. As UPI keys are secured by bankers, do not worry to disclose.',
          'Web defauts: This is the core crux which decides how your application looks. You can leave text boxes with white space(type space bar) if not required or to disable that feature.',
          'AWS: Here you can declare your AWS S3 bucket credentials, to load images and videos in your application. AWS is lightning fast. Note that all your declared credentials are encrypted.',
          'Social media: Allow your users to view your walls and blogs like facebook, Twitter, LinkedIn and Instagram.',
        ],
      },
    },
    {
      id: 2,
      label: 'Users',
      component: Users,
      help: {
        heading: 'Users help',
        points: [
          'Set users to handle and maintain your application',
          'There are 2 types, Admin and Super Admin',
          'Super Admin has access to control entire application along with layout design. Confirm before giving access to a user.',
          'Where an admin has access only to control layout design',
          'CRUD operations are available (create, update and delete users) for super admin only',
          'Edit user requires new password to set for security purpose. Please inform the updated user on his/her new password',
          'Once users created, they can login on clicking the top right dropdown menu in global header',
        ],
      },
    },
    {
      id: 3,
      label: 'AWS S3 Gallery',
      component: Gallery,
      help: {
        heading: 'Gallery help',
        points: [
          'AWS S3 bucket is used to access images and videos in your application.',
          'These files can be maintained in your Gallery module, CRUD operations',
          'Plese follow the steps, clearly defined in the help content in config form',
          'Please take a backup of your credentials and keep them safe. Once forgotten or lost, it can never be brought back.',
          'You can maintain multiple buckets in your application, but can be viewed 1 at a time',
          "We use signed URL's, to load your media files for security purpose",
          'You can copy the location of your file which can be placed in your config area for loading media files.',
          'For more details about AWS S3 visit https://aws.amazon.com/s3/',
        ],
      },
    },
  ];

  function CustomToggle({ children, eventKey, eventLabel }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      setCollapse(eventLabel)
    );

    return (
      <button
        type="button"
        className={`col-11 text-start btn ${
          userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-white'
        }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <section className={`pt-5`}>
      <div className="pt-4">
        <div className="text-center">
          <h2 className="">Settings</h2>
          <hr className="my-3" />
          <i className="fa fa-gears fa-2x py-2" />
          <p className="">Configure your appliation settings</p>
        </div>
      </div>
      <div className="settings">
        <div className="">
          <Accordion bsPrefix="util" defaultActiveKey={-1} className="">
            {compList.map((t, i) => (
              <Card
                key={t.id}
                className={`my-2 ${
                  userContext.userData.theme === 'dark'
                    ? 'bg-dark text-light'
                    : 'bg-light text-dark'
                }`}
              >
                <Card.Header className="row m-0">
                  <CustomToggle eventLabel={t.label} eventKey={t.id}>
                    {t.label}
                  </CustomToggle>
                  <OffCanvas
                    className={`text-center ${
                      userContext.userData.theme === 'dark'
                        ? 'bg-dark text-white-50'
                        : 'bg-light text-black'
                    }`}
                    btnValue="<i class='fa fa-question-circle' />"
                    btnClassName={`col-1 btn btn-sm ${
                      userContext.userData.theme === 'dark'
                        ? 'text-light'
                        : 'text-dark'
                    }`}
                    placement="end"
                    key={t.id}
                    label={t.help.heading}
                  >
                    {t.help.points.length > 0 && (
                      <ul className={`list-group list-group-flush`}>
                        {t.help.points.map((point, j) => (
                          <li
                            key={j}
                            className={`list-group-item ${
                              userContext.userData.theme === 'dark'
                                ? 'bg-dark text-white-50'
                                : 'bg-light text-black'
                            }`}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </OffCanvas>
                </Card.Header>
                <Accordion.Collapse eventKey={t.id}>
                  <Card.Body className="p-2">
                    {t.label === collapse && React.createElement(t.component)}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

Settings.propTypes = {
  property: PropTypes.string,
};
Settings.defaultProps = {
  property: 'String name',
};

export default Settings;
