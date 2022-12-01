import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Config from './config';
import Gallery from './Gallery';
import Intl18 from './Intl18';
import Users from './users';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import OffCanvas from '../shared/OffCanvas';
import { FormattedMessage, useIntl } from 'react-intl'

const Settings = props => {
  const userContext = useContext(UserContext);
  const [collapse, setCollapse] = useState('AWSS3');
  const intl = useIntl();

  const compList = [
    {
      id: 'configuration',
      label: intl.formatMessage({ id: 'configuration' }),
      component: Config,
      help: {
        heading: intl.formatMessage({ id: 'configuration' }),
        points: [
          intl.formatMessage({ id: 'configGoogleApi' }),
          intl.formatMessage({ id: 'configWebDefaults' }),
          intl.formatMessage({ id: 'configAwsS3' }),
          intl.formatMessage({ id: 'configSocialMedia' }),
        ],
      },
    },
    {
      id: 'users',
      label: intl.formatMessage({ id: 'users' }),
      component: Users,
      help: {
        heading: intl.formatMessage({ id: 'users' }),
        points: [
          intl.formatMessage({ id: 'setUsersToHandleAndMaintainYourApp' }),
          intl.formatMessage({ id: 'superAdminIsAddedByDefault' }),
          intl.formatMessage({ id: 'superAdminHasAccessToControl' }),
          intl.formatMessage({ id: 'crudOperationsAreAvailable' }),
          intl.formatMessage({ id: 'editUserRequiresNewPassword' }),
          intl.formatMessage({ id: 'onceUsersCreated' }),
        ],
      },
    },
    {
      id: 'AWSS3',
      label: intl.formatMessage({ id: 'AWSS3' }),
      component: Gallery,
      help: {
        heading: intl.formatMessage({ id: 'AWSS3' }),
        points: [
          intl.formatMessage({ id: 'awsS3BucketIsUsedTo' }),
          intl.formatMessage({ id: 'theseFilesCanBeMaintained' }),
          intl.formatMessage({ id: 'pleseFollowTheSteps' }),
          intl.formatMessage({ id: 'pleaseTakeBackupOfYour' }),
          intl.formatMessage({ id: 'youCanMaintainMultipleBuckets' }),
          intl.formatMessage({ id: 'weUseSignedURLs' }),
          intl.formatMessage({ id: 'youCanCopyTheLocationOfYourFile' }),
          intl.formatMessage({ id: 'forMoreDetailsAboutAwsS3' }, { link: `<a target="_blank" href="https://aws.amazon.com/s3/" class="btn-link">https://aws.amazon.com/s3/</a>` }),
        ],
      },
    },
    {
      id: 'internationalization',
      label: intl.formatMessage({ id: 'internationalization ' }),
      component: Intl18,
      help: {
        heading: intl.formatMessage({ id: 'internationalization ' }),
        points: [
          intl.formatMessage({ id: 'indentOfIntlForm' }),
          intl.formatMessage({ id: 'pleaseDonotEditIntlKey' }),
          intl.formatMessage({ id: 'updateTheValuesCorrespondingYourLocales' }),
          intl.formatMessage({ id: 'submitTheFormToSaveChanges' }),
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
        className={`col-11 text-start btn ${userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-white'
          }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <section className={``}>
      <div className="">
        <div className="text-center">
          <h2 className=""><FormattedMessage id="settings" /></h2>
          <hr className="my-3" />
          <i className="fa fa-gears fa-2x py-2" />
          <p className=""><FormattedMessage id="settingsTitle" /></p>
        </div>
      </div>
      <div className="px-1">
        <div className="">
          <Accordion bsPrefix="util" defaultActiveKey={-1} className="">
            {compList.map((t, i) => (
              <Card
                key={t.id}
                className={`my-2 ${userContext.userData.theme === 'dark'
                  ? 'bg-dark text-white'
                  : 'bg-white text-dark'
                  }`}
              >
                <Card.Header className="row m-0">
                  <CustomToggle eventLabel={t.label} eventKey={t.id}>
                    {t.label}
                  </CustomToggle>
                  <OffCanvas
                    className={`text-center ${userContext.userData.theme === 'dark'
                      ? 'bg-dark text-white-50'
                      : 'bg-white text-black'
                      }`}
                    btnValue="<i class='fa fa-question-circle' />"
                    btnClassName={`col-1 btn btn-sm ${userContext.userData.theme === 'dark'
                      ? 'text-white'
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
                            className={`list-group-item ${userContext.userData.theme === 'dark'
                              ? 'bg-dark text-white-50'
                              : 'bg-white text-black'
                              }`}
                            dangerouslySetInnerHTML={{ __html: point }}
                          ></li>
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
