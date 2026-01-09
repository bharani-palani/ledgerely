import React, { useContext } from "react";
import { NoContent, DraggerText } from "./index";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "react-bootstrap";
import TotalHoldings from "./TotalHoldings";
import SingleBank from "./SingleBank";
import CreditCardOutstanding from "./CreditCardOutstanding";
import { UserContext } from "../../../contexts/UserContext";
import MultipleBankHoldings from "./MultipleBankHoldings";
import Carousel from "react-bootstrap/Carousel";
import helpers from "../../../helpers";
import Switch from "react-switch";

export const getTotal = (array, key) =>
  array.length > 0
    ? array.reduce((a, b) => {
        return Number(a) + Number(b[key]) || 0;
      }, 0)
    : 0;

const BankHoldings = ({ bankList, totalHoldings, ccOutstandingList }) => {
  const userContext = useContext(UserContext);
  const [visible, setVisible] = React.useState(false);

  return (
    <Row>
      <Col md={6} className='position-relative'>
        <div className='position-absolute' style={{ zIndex: 1, top: 15, left: 30 }}>
          <Switch
            onColor={"#6c757d"}
            offColor={"#6c757d"}
            uncheckedHandleIcon={<i className='fa fa-eye text-light' style={{ marginLeft: 30 }} />}
            checkedHandleIcon={<i className='fa fa-eye-slash text-light' style={{ marginLeft: -20 }} />}
            handleDiameter={25}
            height={25}
            checkedIcon={false}
            uncheckedIcon={false}
            width={55}
            onChange={() => setVisible(!visible)}
            checked={visible === true}
          />
        </div>
        <Carousel
          slide={true}
          indicators={false}
          controls={true}
          interval={null}
          touch={true}
          prevIcon={
            <button className={`btn btn-sm rounded-circle btn-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}>
              <i className='fa fa-chevron-left' />
            </button>
          }
          nextIcon={
            <button className={`btn btn-sm rounded-circle btn-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}>
              <i className='fa fa-chevron-right' />
            </button>
          }
        >
          {bankList.length > 0 ? (
            bankList
              .map((_, index) => {
                if (index % 2 === 0) {
                  return bankList.slice(index, index + 2);
                }
              })
              .filter(Boolean)
              .map((bank, i) => (
                <Carousel.Item key={i}>
                  <div className='container d-flex gap-2'>
                    <SingleBank
                      key={`i-${0}`}
                      bank={bank[0]}
                      visible={visible}
                      theme={userContext.userData.theme}
                      color={helpers.bootstrapColorVariables[0]}
                    />
                    {bank[1] && (
                      <SingleBank
                        key={`i-${1}`}
                        bank={bank[1]}
                        visible={visible}
                        theme={userContext.userData.theme}
                        color={helpers.bootstrapColorVariables[0]}
                      />
                    )}
                  </div>
                </Carousel.Item>
              ))
          ) : (
            <NoContent theme={userContext.userData.theme} />
          )}
        </Carousel>
      </Col>
      <Col md={3}>
        {totalHoldings.length > 0 ? (
          <div>
            {totalHoldings.length > 1 ? (
              <div className='y-scroll max-h-12 pe-2 py-1'>
                {totalHoldings.map((hold, i) => (
                  <MultipleBankHoldings
                    key={i}
                    hold={hold}
                    visible={visible}
                    theme={userContext.userData.theme}
                    color={helpers.bootstrapColorVariables[7]}
                  />
                ))}
              </div>
            ) : (
              <TotalHoldings
                totalHoldings={totalHoldings}
                visible={visible}
                theme={userContext.userData.theme}
                color={helpers.bootstrapColorVariables[7]}
              />
            )}
          </div>
        ) : (
          <NoContent theme={userContext.userData.theme} />
        )}
      </Col>
      <Col md={3}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage id='creditCardPayable' defaultMessage='creditCardPayable' />
          </DraggerText>
        </div>
        {ccOutstandingList.length > 0 ? (
          <div className='y-scroll max-h-12 px-2 py-1'>
            {ccOutstandingList.map((ccOut, i) => (
              <CreditCardOutstanding
                key={i}
                ccOut={ccOut}
                visible={visible}
                theme={userContext.userData.theme}
                color={helpers.bootstrapColorVariables[4]}
              />
            ))}
          </div>
        ) : (
          <NoContent theme={userContext.userData.theme} />
        )}
      </Col>
    </Row>
  );
};

export default BankHoldings;
