import React, { useState, useContext } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { resumeArray } from "./backendTableConfig";
import BackendCore from "./backend/BackendCore";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";

function ResumeBackend(props) {
  const [collapse, setCollapse] = useState("");
  const [dbData, setDbData] = useState([]);
  const userContext = useContext(UserContext);

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    return apiInstance.post("getBackend", formdata);
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

  const onToggle = async (t, i) => {
    setDbData([]);
    const a = getBackendAjax(t.Table, t.TableRows);
    const b =
      i === 6
        ? getDropDownAjax("/resume/getProjectList")
        : Promise.resolve({ fetch: [{ id: null, value: "Select" }] });
    const c =
      i === 5
        ? getDropDownAjax("/resume/getCompanyList")
        : Promise.resolve({ fetch: [{ id: null, value: "Select" }] });
    Promise.all([a, b, c]).then(async r => {
      setDbData(r[0].data.response);
      setCollapse(t.label);
      if (i === 6) {
        resumeArray[6].rowElements[2] = r[1];
      }
      if (i === 5) {
        resumeArray[5].rowElements[4] = r[2];
      }
    });
  };

  const loaderComp = () => {
    return (
      <div className="relativeSpinner">
        <Loader
          type={helpers.LoadRandomSpinnerIcon()}
          color={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
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
    <Accordion bsPrefix="util">
      {resumeArray.map((t, i) => {
        return (
          <Card key={t.id}>
            <Card.Header>
              <Accordion.Toggle
                onClick={() => onToggle(t, i)}
                as={Button}
                variant="link"
                eventKey={t.id}
                style={{boxShadow: "none"}}
              >
                {t.label}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={t.id}>
              <Card.Body>
                {t.label === collapse && dbData.length > 0 ? (
                  <div className="">
                    <BackendCore
                      Table={t.Table}
                      TableRows={t.TableRows}
                      TableAliasRows={t.TableAliasRows}
                      rowElements={t.rowElements}
                      dbData={dbData}
                      postApiUrl="/postBackend"
                      onPostApi={response => onPostApi(response)}
                      onReFetchData={() => onToggle(t, i)}
                      {...(t.cellWidth && {cellWidth: t.cellWidth})}
                    />
                  </div>
                ) : (
                  loaderComp()
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
    </Accordion>
  );
}

export default ResumeBackend;
