import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Accordion, Card, Button } from "react-bootstrap";
import BackendCore from "../../components/configuration/backend/BackendCore";
import { crudFormArray } from "../configuration/backendTableConfig";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";
import AppContext from "../../contexts/AppContext";

const CreateModule = () => {
  const [collapse, setCollapse] = useState("");
  const [dbData, setDbData] = useState([]);
  const userContext = useContext(UserContext);
  const [appData] = useContext(AppContext);

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const getDropDownAjax = url => {
    return apiInstance
      .get(url)
      .then(r => ({
        fetch: {
          dropDownList: [...r.data.response]
        }
      }))
      .catch(error => {
        console.log(error);
      });
  };

  const onToggle = async t => {
    setDbData([]);
    const a = getBackendAjax(t.Table, t.TableRows);
    const b =
      t.id === 25
        ? getDropDownAjax("/account_planner/vendor_list")
        : Promise.resolve({ fetch: [{ id: null, value: "Select" }] });
    Promise.all([a, b]).then(async r => {
      setDbData(r[0].data.response);
      setCollapse(t.label);
      if (t.id === 25) {
        crudFormArray[3].rowElements[2] = r[1];
      }
    });
  };

  const loaderComp = () => {
    return (
      <div className="relativeSpinner">
        <Loader
          type={helpers.LoadRandomSpinnerIcon()}
          color={helpers.fluorescentColor}
          height={100}
          width={100}
        />
      </div>
    );
  };
  const onPostApi = response => {
    const { status, data } = response;
    if (status) {
      response && data && data.response
        ? userContext.renderToast({ message: "Transaction saved successfully" })
        : userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: "Oops.. No form change found"
          });
    } else {
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: "Unable to reach server. Please try again later"
      });
    }
  };
  let crudFormMassageArray = crudFormArray.map(crud => {
      const obj = {
          footer: {
            total: {
              locale: appData.locale,
              currency: appData.currency,
              maxDecimal: Number(appData.maximumFractionDigits)
            }
          }
      }
      crud.config = obj;
      return crud;
  });

  return (
    <div className="settings">
      <Accordion bsPrefix="util" defaultActiveKey={1} className=''>
        {crudFormMassageArray
          .sort((a, b) => a.id - b.id)
          .map((t, i) => (
            <Card key={t.id} className={`my-2 ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
              <Card.Header>
                <Accordion.Toggle
                  onClick={() => onToggle(t)}
                  as={Button}
                  variant="link"
                  eventKey={t.id}
                  className={`text-decoration-none ${userContext.userData.theme === 'dark' ? 'text-light' : 'text-dark'}`}
                >
                  {t.label}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={t.id}>
                <Card.Body>
                  {t.label === collapse && dbData.length > 0 ? (
                    <div className="pt-10">
                      {dbData.length > 0 ? (
                        <BackendCore
                          key={i}
                          config={t.config}
                          Table={t.Table}
                          TableRows={t.TableRows}
                          TableAliasRows={t.TableAliasRows}
                          showTotal={t.showTotal}
                          rowElements={t.rowElements}
                          dbData={dbData}
                          postApiUrl="/account_planner/postAccountPlanner"
                          onPostApi={response => onPostApi(response)}
                          onReFetchData={() => onToggle(t)}
                          cellWidth="12rem"
                        />
                      ) : (
                        loaderComp()
                      )}
                    </div>
                  ) : (
                    loaderComp()
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </div>
  );
};

CreateModule.propTypes = {
  property: PropTypes.string
};
CreateModule.defaultProps = {
  property: "String name"
};

export default CreateModule;
