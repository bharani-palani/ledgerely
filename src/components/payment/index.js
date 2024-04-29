import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { FormattedMessage } from "react-intl";
import { Row, Col, Card, ListGroup } from "react-bootstrap";

const Payment = props => {
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const planTable = [
    {
      heading: "Plan",
      details: [
        { title: "Name", label: userContext.userConfig.planName },
        { title: "Code", label: userContext.userConfig.planCode },
      ],
      footer: "",
    },
    {
      heading: "Contact",
      details: [
        { title: "name", label: userContext.userConfig.name },
        { title: "email", label: userContext.userConfig.email },
        { title: "mobile", label: userContext.userConfig.mobile },
        { title: "address1", label: userContext.userConfig.address1 },
        { title: "address2", label: userContext.userConfig.address2 },
        { title: "city", label: userContext.userConfig.city },
        { title: "state", label: userContext.userConfig.state },
        { title: "postalCode", label: userContext.userConfig.postalCode },
      ],
      footer: "",
    },
  ];

  useEffect(() => {
    myAlertContext.setConfig({
      show: false,
    });
  }, []);

  return (
    <div className='m-2'>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-4`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-credit-card-alt fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='payments' defaultMessage='payments' />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Row>
          {planTable.map((c, i) => (
            <Col xl={3} key={i}>
              <Card
                className={`fs-6 ${
                  userContext.userData.theme === "dark"
                    ? "bg-dark text-white"
                    : "bg-white text-dark"
                } text-center`}
              >
                <Card.Header>{c.heading}</Card.Header>
                <Card.Body className='p-0'>
                  <Card.Text>
                    <ListGroup className={`list-group-flush`}>
                      {c.details.map((d, j) => (
                        <ListGroup.Item
                          key={j}
                          className={`d-flex align-items-center justify-content-between border-0 border-secondary ${
                            userContext.userData.theme === "dark"
                              ? "bg-dark text-white"
                              : "bg-white text-dark"
                          }`}
                        >
                          <div>{d.title}</div>
                          <div>{d.label}</div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
                {c.footer && <Card.Footer className=''>{c.footer}</Card.Footer>}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

Payment.propTypes = {
  property: PropTypes.value,
};
Payment.defaultProps = {};

export default Payment;
