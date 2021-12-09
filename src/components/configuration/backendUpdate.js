import React, { useState, useContext } from "react";
import { Modal, Accordion, Card, Button } from "react-bootstrap";
import LoginForm from "./loginForm";
import BackendCore from "./backend/BackendCore";
import ViewMessages from "./viewMessages";
import ResumeBackend from "./resumeBackend";
import { configArray } from "./backendTableConfig";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";

function BackendUpdate(props) {
  const [auth, setAuth] = useState(false); // change this to false
  const [collapse, setCollapse] = useState("");
  const [cObj, setCobj] = useState({ viewMode: "Configure" }); // remove this {viewMode: "Messages"} obj
  const [showForgot, setShowForgot] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [dbData, setDbData] = useState([]);
  const userContext = useContext(UserContext);

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    return apiInstance.post("/getBackend", formdata);
  };

  const onToggle = async t => {
    setDbData([]);
    const data = await getBackendAjax(t.Table, t.TableRows)
      .then(r => {
        setDbData(r.data.response);
        setCollapse(t.label);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
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

  return (
    <Modal {...props} className="backendUpdate" size={auth ? "xl" : "sm"}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="pull-left">
            {showForgot ? (
              <i
                onClick={() => setShowForgot(false)}
                className="fa fa-chevron-circle-left"
              />
            ) : (
              ""
            )}
          </span>
          <span className="pull-left pl-5">{cObj.viewMode}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!auth && (
          <LoginForm
            ddForgot={b => setShowForgot(b)}
            dForgot={showForgot}
            showForgot={bool => setShowForgot(bool)}
            validate={(bool, lastLogin, cObj) => {
              setAuth(bool);
              setLastLogin(lastLogin);
              setCobj(cObj);
            }}
          />
        )}
        {auth && cObj.viewMode === "Configure" && (
          <Accordion bsPrefix="util" defaultActiveKey="0">
            {configArray
              .sort((a, b) => a.label > b.label)
              .map((t, i) => (
                <Card key={t.id}>
                  <Card.Header>
                    <Accordion.Toggle
                      onClick={() => onToggle(t)}
                      as={Button}
                      variant="link"
                      eventKey={t.id}
                    >
                      {t.label}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={t.id}>
                    <Card.Body>
                      {t.label === collapse && dbData.length > 0 ? (
                        <div className="">
                          <BackendCore
                            key={i}
                            dbData={dbData}
                            postApiUrl="/postBackend"
                            onPostApi={response => onPostApi(response)}
                            Table={t.Table}
                            TableRows={t.TableRows}
                            TableAliasRows={t.TableAliasRows}
                            rowElements={t.rowElements}
                            onReFetchData={() => onToggle(t)}
                            />
                        </div>
                      ) : (
                        loaderComp()
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
        )}
        {auth && cObj.viewMode === "Messages" && <ViewMessages />}
        {auth && cObj.viewMode === "Resume" && (
          <ResumeBackend lastLogin={lastLogin} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default BackendUpdate;
