import React, { useContext } from "react";
import Switch from "react-switch";
import { Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { BillingContext, CurrencyPrice } from "./Billing";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useIntl } from "react-intl";

const Summary = props => {
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const billingContext = useContext(BillingContext);
  const { summary, setSummary, cycleList, table, selectedPlan } =
    billingContext;
  const cycleRef = {
    month: {
      prop: "planPriceMonthly",
      suffix: `  / ${intl.formatMessage({
        id: "month",
        defaultMessage: "month",
      })}`,
    },
    year: {
      prop: "planPriceYearly",
      suffix: ` / ${intl.formatMessage({
        id: "year",
        defaultMessage: "year",
      })}`,
    },
  };
  const externalLinks = [
    {
      id: 0,
      href: globalContext.cancellationRefundPolicyLink,
      label: "Canellation and refund policy",
    },
    {
      id: 1,
      href: globalContext.termsOfServiceLink,
      label: "Terms of service",
    },
    { id: 2, href: globalContext.privacyPolicyLink, label: "Privacy policy" },
  ];

  return (
    <div className='my-3'>
      <div className='fs-3'>Summary</div>
      <Row className='m-1'>
        <Col
          md={6}
          style={{ height: "15rem" }}
          className='p-2 rounded borderDotted position-relative'
        >
          {summary.invoice.map((sum, i) => (
            <Col
              xs={12}
              key={sum.id}
              className='d-flex justify-content-between align-items-center py-1'
            >
              <div>{sum.label}</div>
              <div>{sum.value}</div>
            </Col>
          ))}
          <Col
            xs={12}
            style={{
              borderTop: "dotted 3px #aeaeae",
              position: "absolute",
              width: "98%",
              bottom: 0,
            }}
            className='d-flex justify-content-between align-items-center py-1'
          >
            <div>Total</div>
            <div>{summary.invoice.reduce((a, b) => a + b.value, 0)}</div>
          </Col>
        </Col>
        <Col md={6} className='pt-2'>
          <div className='d-flex justify-content-between align-items-center py-1'>
            <div>Payment cycle</div>
            <div>
              <Form.Select
                value={summary.cycle}
                size='sm'
                onChange={e => {
                  const price = table.filter(
                    f => f.planCode === selectedPlan,
                  )[0][cycleRef[e.target.value].prop];
                  setSummary(prev => ({
                    ...prev,
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
          <div className='d-flex justify-content-between align-items-center py-2'>
            <div>I agree to the terms and conditions</div>
            <div>
              <Switch
                className={`${
                  selectedPlan
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
                  setSummary(prev => ({ ...prev, acceptTerms: e }));
                }}
                checked={summary.acceptTerms}
              />
            </div>
          </div>
          <div>
            <Button
              disabled={
                !(
                  summary.acceptTerms &&
                  summary.invoice.reduce((a, b) => a + b.value, 0) > 0
                )
              }
              className='btn btn-bni w-100 border-0 d-flex justify-content-between align-items-center'
            >
              <span className='fs-5'>
                <i className='fa fa-credit-card-alt pe-2' />
                Subscribe Now
              </span>
              <div>
                <CurrencyPrice
                  amount={summary.invoice.reduce((a, b) => a + b.value, 0)}
                  suffix={cycleRef[summary.cycle].suffix}
                />
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
