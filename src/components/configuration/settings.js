import React, { useContext, useState } from "react";
import Config from "./config";
import Users from "./users";
import ChangePassword from "../GlobalHeader/changePassword";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import OffCanvas from "../shared/OffCanvas";
import { FormattedMessage, useIntl } from "react-intl";

const Settings = () => {
  const userContext = useContext(UserContext);
  const [collapse, setCollapse] = useState("");
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "settings",
    defaultMessage: "settings",
  })}`;

  const compList = [
    {
      id: "configuration",
      label: intl.formatMessage({
        id: "configuration",
        defaultMessage: "configuration",
      }),
      component: Config,
      accessTo: ["superAdmin"],
      help: {
        heading: intl.formatMessage({
          id: "configuration",
          defaultMessage: "configuration",
        }),
        points: [
          intl.formatMessage({
            id: "configWebDefaults",
            defaultMessage: "configWebDefaults",
          }),
          intl.formatMessage({
            id: "configSocialMedia",
            defaultMessage: "configSocialMedia",
          }),
        ],
      },
    },
    {
      id: "changePassword",
      label: intl.formatMessage({
        id: "changePassword",
        defaultMessage: "changePassword",
      }),
      component: ChangePassword,
      accessTo: ["superAdmin", "admin"],
      help: {
        heading: intl.formatMessage({
          id: "changePassword",
          defaultMessage: "changePassword",
        }),
        points: [
          intl.formatMessage({
            id: "changePasswordHelp",
            defaultMessage: "changePasswordHelp",
          }),
        ],
      },
    },
    {
      ...(Number(userContext.userConfig.planUsersLimit) > 1 && {
        id: "users",
        label: intl.formatMessage({ id: "users", defaultMessage: "users" }),
        component: Users,
        accessTo: ["superAdmin"],
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
              id: "onceUsersCreated",
              defaultMessage: "onceUsersCreated",
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
    <section className={`container-fluid`}>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-4`}
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
              .filter(f => f?.accessTo?.includes(userContext.userData.type))
              .map(t => (
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
