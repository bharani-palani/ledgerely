import React, { useContext, useState } from "react";
import Switch from "react-switch";
import { Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { BillingContext, CurrencyPrice } from "./Billing";
import { GlobalContext } from "../../contexts/GlobalContext";
import CheckoutForm from "./CheckoutForm";
import { useIntl, FormattedMessage } from "react-intl";

const Summary = props => {
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const billingContext = useContext(BillingContext);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const {
    summary,
    setSummary,
    cycleList,
    table,
    selectedPlan,
    cycleRef,
    total,
    billingLoader,
    setShowCheckout,
  } = billingContext;
  const externalLinks = [
    {
      id: 0,
      href: globalContext.cancellationRefundPolicyLink,
      label: intl.formatMessage({
        id: "cancellationPolicy",
        defaultMessage: "cancellationPolicy",
      }),
    },
    {
      id: 1,
      href: globalContext.termsOfServiceLink,
      label: intl.formatMessage({
        id: "termsOfService",
        defaultMessage: "termsOfService",
      }),
    },
    {
      id: 2,
      href: globalContext.privacyPolicyLink,
      label: intl.formatMessage({
        id: "privacyPolicy",
        defaultMessage: "privacyPolicy",
      }),
    },
  ];

  return (
    <div className='my-3'>
      <CheckoutForm />
      <div className='fs-3'>
        <FormattedMessage id='summary' defaultMessage='summary' />
      </div>
      <Row className='m-1'>
        <Col
          md={6}
          className='receipt'
          style={{
            "--theme-color":
              userContext.userData.theme === "dark" ? "#555" : "#eee",
          }}
        >
          <div
            style={{
              background:
                userContext.userData.theme === "dark" ? "#555" : "#eee",
              color: userContext.userData.theme === "dark" ? "#fff" : "#000",
              height: "15rem",
            }}
            className='position-relative px-2'
          >
            {summary.invoice.map((sum, i) => (
              <Col
                xs={12}
                key={sum.id}
                className='d-flex justify-content-between align-items-center py-1'
              >
                <div>
                  <span>
                    <FormattedMessage id={sum.id} defaultMessage={sum.id} />
                  </span>
                  <span className='ps-2'>
                    {sum.title ? `(${sum.title})` : ""}
                  </span>
                </div>
                <div>
                  {billingLoader ? (
                    <i className='fa fa-circle-o-notch fa-spin'></i>
                  ) : (
                    sum.value
                  )}
                </div>
              </Col>
            ))}
            <Col
              xs={12}
              style={{
                borderTop: "dotted 5px #aeaeae",
                position: "absolute",
                width: "98%",
                bottom: 0,
              }}
              className='d-flex justify-content-between align-items-center py-2'
            >
              <div>
                <FormattedMessage id='total' defaultMessage='total' />
              </div>
              <div>{total.toFixed(2)}</div>
            </Col>
          </div>
        </Col>
        <Col md={6} className='pt-2'>
          <div className='d-flex justify-content-between align-items-center py-1'>
            <div>
              <FormattedMessage
                id='paymentCycle'
                defaultMessage='paymentCycle'
              />
            </div>
            <div>
              <Form.Select
                value={summary.cycle}
                disabled={!selectedPlan.planCode}
                size='sm'
                onChange={e => {
                  const price = table.filter(
                    f => f.planCode === selectedPlan.planCode,
                  )[0][cycleRef[e.target.value].prop];
                  const stripePriceId = table.filter(
                    f => f.planCode === selectedPlan.planCode,
                  )[0][cycleRef[e.target.value].stripeProp];

                  setSummary(prev => ({
                    ...prev,
                    stripePriceId,
                    cycle: e.target.value,
                    invoice: prev.invoice.map(o =>
                      o.id === "price" ? Object.assign(o, { value: price }) : o,
                    ),
                  }));
                }}
              >
                {cycleList.map((l, i) => (
                  <option key={i} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          {externalLinks.map(link => (
            <div key={link.id} className='py-1'>
              <a
                target='_blank'
                rel='noreferrer'
                className='link-primary'
                href={link.href}
              >
                {link.label}
              </a>
            </div>
          ))}
          <div className='d-flex justify-content-between align-items-center py-1'>
            <div>
              <FormattedMessage id='iAgreeTerms' defaultMessage='iAgreeTerms' />
            </div>
            <div>
              <Switch
                className={`${
                  selectedPlan.planCode
                    ? "animate__animated animate__headShake infiniteAnimation"
                    : ""
                }`}
                onColor={document.documentElement.style.getPropertyValue(
                  "--app-theme-bg-color",
                )}
                offColor={document.documentElement.style.getPropertyValue(
                  "--app-theme-color",
                )}
                offHandleColor={
                  userContext.userData.theme === "dark" ? "#555" : "#ddd"
                }
                onHandleColor={
                  userContext.userData.theme === "dark" ? "#555" : "#ddd"
                }
                handleDiameter={15}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={30}
                onChange={e => {
                  setAcceptTerms(e);
                }}
                checked={acceptTerms}
              />
            </div>
          </div>
          <div className='pt-2'>
            <Button
              disabled={!(acceptTerms && total > 0 && !billingLoader)}
              className='btn btn-bni w-100 border-0 d-flex justify-content-between align-items-center'
              onClick={() => setShowCheckout(true)}
            >
              <span className='fs-5'>
                <i className='fa fa-credit-card-alt pe-2' />
                <FormattedMessage
                  id='subscribeNow'
                  defaultMessage='subscribeNow'
                />
              </span>
              <div>
                {!billingLoader ? (
                  <CurrencyPrice
                    amount={total}
                    suffix={cycleRef[summary.cycle].suffix}
                    symbol={selectedPlan.planPriceCurrencySymbol}
                  />
                ) : (
                  <i className='fa p-1 fa-2x fa-circle-o-notch fa-spin'></i>
                )}
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
