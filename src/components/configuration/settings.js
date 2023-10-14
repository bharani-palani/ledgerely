import React, { useContext, useState } from "react";
import Config from "./config";
import Intl18 from "./Intl18";
import Users from "./users";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import OffCanvas from "../shared/OffCanvas";
import { FormattedMessage, useIntl } from "react-intl";

const Settings = props => {
  const userContext = useContext(UserContext);
  const [collapse, setCollapse] = useState(""); // 'File storage type'
  const intl = useIntl();

  const compList = [
    {
      id: "configuration",
      label: intl.formatMessage({
        id: "configuration",
        defaultMessage: "configuration",
      }),
      component: Config,
      help: {
        heading: intl.formatMessage({
          id: "configuration",
          defaultMessage: "configuration",
        }),
        points: [
          intl.formatMessage({
            id: "configGoogleApi",
            defaultMessage: "configGoogleApi",
          }),
          intl.formatMessage({
            id: "configWebDefaults",
            defaultMessage: "configWebDefaults",
          }),
          intl.formatMessage({
            id: "configAwsS3",
            defaultMessage: "configAwsS3",
          }),
          intl.formatMessage({
            id: "configSocialMedia",
            defaultMessage: "configSocialMedia",
          }),
        ],
      },
    },
    {
      ...(Number(userContext.userConfig.planUsersLimit) > 1 && {
        id: "users",
        label: intl.formatMessage({ id: "users", defaultMessage: "users" }),
        component: Users,
        help: {
          heading: intl.formatMessage({ id: "users", defaultMessage: "users" }),
          points: [
            intl.formatMessage({
              id: "setUsersToHandleAndMaintainYourApp",
              defaultMessage: "setUsersToHandleAndMaintainYourApp",
            }),
            intl.formatMessage({
              id: "superAdminIsAddedByDefault",
              defaultMessage: "superAdminIsAddedByDefault",
            }),
            intl.formatMessage({
              id: "superAdminHasAccessToControl",
              defaultMessage: "superAdminHasAccessToControl",
            }),
            intl.formatMessage({
              id: "crudOperationsAreAvailable",
              defaultMessage: "crudOperationsAreAvailable",
            }),
            intl.formatMessage({
              id: "editUserRequiresNewPassword",
              defaultMessage: "editUserRequiresNewPassword",
            }),
            intl.formatMessage({
              id: "onceUsersCreated",
              defaultMessage: "onceUsersCreated",
            }),
          ],
        },
      }),
    },
    {
      ...(userContext.userConfig.isOwner === "1" && {
        id: "internationalization",
        label: intl.formatMessage({
          id: "internationalization",
          defaultMessage: "internationalization",
        }),
        component: Intl18,
        help: {
          heading: intl.formatMessage({
            id: "internationalization",
            defaultMessage: "internationalization",
          }),
          points: [
            intl.formatMessage({
              id: "indentOfIntlForm",
              defaultMessage: "indentOfIntlForm",
            }),
            intl.formatMessage({
              id: "pleaseDonotEditIntlKey",
              defaultMessage: "pleaseDonotEditIntlKey",
            }),
            intl.formatMessage({
              id: "updateTheValuesCorrespondingYourLocales",
              defaultMessage: "updateTheValuesCorrespondingYourLocales",
            }),
            intl.formatMessage({
              id: "submitTheFormToSaveChanges",
              defaultMessage: "submitTheFormToSaveChanges",
            }),
          ],
        },
      }),
    },
  ];

  function CustomToggle({ children, eventKey, eventLabel }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      setCollapse(eventLabel),
    );

    return (
      <button
        type='button'
        className={`col-11 text-start btn ${
          userContext.userData.theme === "dark" ? "btn-dark" : "btn-white"
        }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <section className={`m-2`}>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-light lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-cog fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='settings' defaultMessage='settings' />
            </div>
          </div>
        </div>
      </div>
      <div className='px-1'>
        <div className=''>
          {/* defaultActiveKey={'fileStorage'} */}
          <Accordion bsPrefix='util' defaultActiveKey={""} className=''>
            {compList
              .filter(f => f.id)
              .map((t, i) => (
                <Card
                  key={t.id}
                  className={`my-2 ${
                    userContext.userData.theme === "dark"
                      ? "bg-dark text-white"
                      : "bg-white text-dark"
                  }`}
                >
                  <Card.Header className='row m-0'>
                    <CustomToggle eventLabel={t.label} eventKey={t.id}>
                      {t.label}
                    </CustomToggle>
                    <OffCanvas
                      className={`text-center ${
                        userContext.userData.theme === "dark"
                          ? "bg-dark text-white-50"
                          : "bg-white text-black"
                      }`}
                      btnValue="<i class='fa fa-question-circle' />"
                      btnClassName={`col-1 btn btn-sm ${
                        userContext.userData.theme === "dark"
                          ? "text-white"
                          : "text-dark"
                      }`}
                      placement='end'
                      key={t.id}
                      label={t.help.heading}
                    >
                      {t.help.points.length > 0 && (
                        <ul className={`list-group list-group-flush`}>
                          {t.help.points.map((point, j) => (
                            <li
                              key={j}
                              className={`list-group-item border-bottom-0 ${
                                userContext.userData.theme === "dark"
                                  ? "bg-dark text-white-50"
                                  : "bg-white text-black"
                              }`}
                              dangerouslySetInnerHTML={{ __html: point }}
                            ></li>
                          ))}
                        </ul>
                      )}
                    </OffCanvas>
                  </Card.Header>
                  <Accordion.Collapse eventKey={t.id}>
                    <Card.Body className='p-2'>
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

export default Settings;
