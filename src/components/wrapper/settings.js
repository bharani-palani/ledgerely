import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";
import ResumeBackend from "../configuration/resumeBackend";
import ViewMessages from "../configuration/viewMessages";
import Config from "../configuration/config";
import Gallery from "../configuration/Gallery";
import { configArray } from "../configuration/backendTableConfig";
import { Accordion, Card, Button } from "react-bootstrap";
import BackendCore from "../configuration/backend/BackendCore";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";
import "./settings.scss";

const Settings = props => {
  const [collapse, setCollapse] = useState("");
  const [key, setKey] = useState("gallery"); // change to web
  const [dbData, setDbData] = useState([]);
  const userContext = useContext(UserContext);

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    return apiInstance.post("getBackend", formdata);
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
    <section
      className="section lb"
      style={{
        minHeight: window.screen.height
      }}
    >
      <div className="section-title">
        <div className="process-box">
          <div className="process-front text-center">
            <h2 className="grey-color">Settings</h2>
            <hr />
            <i className="fa fa-gears"></i>
            <p className="container-fluid">
              Configure your web content, read / delete messages & update your
              resume
            </p>
          </div>
        </div>
      </div>
      <div className="settings">
        <div className="">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            transition={false}
            onSelect={k => setKey(k)}
            defaultActiveKey="config"
            className="row mb-20"
          >
            <Tab eventKey="web" title="Web" tabClassName="col-md-2">
              {key === "web" && (
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
                              <BackendCore
                                Table={t.Table}
                                TableRows={t.TableRows}
                                TableAliasRows={t.TableAliasRows}
                                rowElements={t.rowElements}
                                dbData={dbData}
                                postApiUrl="/postBackend"
                                onPostApi={response => onPostApi(response)}
                                onReFetchData={() => onToggle(t)}
                                cellWidth="25rem"
                              />
                            ) : (
                              loaderComp()
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                </Accordion>
              )}
            </Tab>
            <Tab eventKey="messages" title="Messages" tabClassName="col-md-2">
              {key === "messages" && <ViewMessages />}
            </Tab>
            <Tab eventKey="resume" title="Resume" tabClassName="col-md-2">
              {key === "resume" && <ResumeBackend />}
            </Tab>
            <Tab eventKey="config" title="Config" tabClassName="col-md-3">
              {key === "config" && <Config />}
            </Tab>
            <Tab eventKey="gallery" title="Gallery" tabClassName="col-md-3">
              {key === "gallery" && <Gallery />}
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

Settings.propTypes = {
  property: PropTypes.string
};
Settings.defaultProps = {
  property: "String name"
};

export default Settings;
