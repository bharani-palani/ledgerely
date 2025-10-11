import React, { lazy, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { useIntl, FormattedMessage } from "react-intl";

const VerticalPanes = lazy(() =>
  import("../workbook/VerticalPane").then(module => ({
    default: module["VerticalPanes"],
  })),
);

const Pane = lazy(() =>
  import("../workbook/VerticalPane").then(module => ({
    default: module["Pane"],
  })),
);

const LedgerelyAi = () => {
  const userContext = useContext(UserContext);
  const intl = useIntl();

  return (
    <div className={`workbook container-fluid small`}>
      <VerticalPanes
        theme={userContext.userData.theme}
        className={`${userContext?.userConfig?.webMenuType}`}
      >
        <Pane className='overflow-y-auto col-lg-3 p-1'>
          <div className='bni-bg text-center text-black p-2'>
            <FormattedMessage id='history' defaultMessage='history' />
          </div>
        </Pane>
        <Pane className={`col-lg-6 d-flex flex-column justify-content-end p-1`}>
          <div class='input-group'>
            <input
              type='text'
              class='form-control rounded-pill rounded-end-0 small'
              placeholder={intl.formatMessage({
                id: "relevantSearch",
                defaultMessage: "relevantSearch",
              })}
              aria-label='Recipient’s username with two button addons'
            />
            <button
              class={`rounded-pill rounded-start-0 btn btn-bni px-3`}
              type='button'
            >
              <i className='fa fa-microphone' />
            </button>
          </div>
        </Pane>
        <Pane className='overflow-y-auto col-lg-3 p-1'>
          <div className='bni-bg text-center text-black p-2'>
            <FormattedMessage id='action' defaultMessage='action' />
          </div>
        </Pane>
      </VerticalPanes>
    </div>
  );
};

export default LedgerelyAi;
