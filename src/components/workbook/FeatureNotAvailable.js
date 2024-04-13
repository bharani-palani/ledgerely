import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import WorkbookContext from "./WorkbookContext";
import { FormattedMessage } from "react-intl";

const FeatureNotAvailable = props => {
  const workbookContext = useContext(WorkbookContext);
  const { theme } = workbookContext;
  return (
    <div className='container-fluid d-block d-sm-none mt-3'>
      <Card
        className={`border ${
          theme === "dark"
            ? "bg-dark text-white border-secondary"
            : "bg-white text-dark"
        }`}
      >
        <Card.Header className='d-flex border-bottom justify-content-center'>
          <i className='fa fa-2x fa-ban text-danger pe-2' />
          <h2>STOP</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h4 className='text-danger text-center'>
              <FormattedMessage
                id='featureNotAvailable'
                defaultMessage='featureNotAvailable'
              />
            </h4>
          </Card.Title>
          <p>
            <FormattedMessage
              id='notAvailableForSmallDevice'
              defaultMessage='notAvailableForSmallDevice'
            />
          </p>
          <p>
            <FormattedMessage
              id='tryLandscapeDevice'
              defaultMessage='tryLandscapeDevice'
            />
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeatureNotAvailable;
