import React, { useEffect, useState, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";
import SignedUrl from "../configuration/Gallery/SignedUrl";

function Technologies() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.web} | Technologies`;
  const [techHeading, setTechHeading] = useState("");
  const [techs, setTechs] = useState("");
  const [ideTechs, setIdeTechs] = useState("");
  const [osTechs, setOsTechs] = useState("");

  useEffect(() => {
    const one = getTechnologies();
    const two = getIdes();
    const three = getOss();

    Promise.all([one, two, three]).then((r) => {
      const [techHeading, techs] = r[0];
      const ideTechs = r[1];
      const osTechs = r[2];
      setTechHeading(techHeading);
      setTechs(techs);
      setIdeTechs(ideTechs);
      setOsTechs(osTechs);
    });
  }, []);

  const getTechnologies = async () => {
    const tech = apiInstance
      .get("/technologies")
      .then((response) =>
        helpers.sageHeaderAndList(response.data.response, "tech_sort")
      );
    const json = await tech.then((r) => r);
    return json;
  };
  const getIdes = async () => {
    const ide = apiInstance
      .get("/ides")
      .then((response) => response.data.response);
    const json = await ide.then((r) => r);
    return json;
  };
  const getOss = async () => {
    const os = apiInstance
      .get("operating-system")
      .then((response) => response.data.response);
    const json = await os.then((r) => r);
    return json;
  };
  return (
    <section className="pt-5 bg-dark text-light" style={{ minHeight: window.screen.height }}>
      {techHeading && techs && ideTechs && osTechs ? (
       <div className="">
          <div className="pt-4">
            <div className="text-center">
                <h3 className="">Technologies</h3>
                <hr className="hr" />
                <i className="fa fa-code fa-5x py-3"></i>
                <p className="container-fluid">
                  {techHeading ? techHeading.tech_value : null}
                </p>
            </div>
          </div>
          {techs
            ? helpers.chunkArray(techs, 3).map((tech, j) => (
                <div key={`chunk-${j}`} className="row">
                  {tech.map((t, i) => (
                    <div key={i} className={`col-md-4 py-2 text-center`}>
                      <div className="">
                        <div className="">
                          <SignedUrl optionalAttr={{width:"100%", height:250}} type="image" appData={appData} unsignedUrl={t.tech_image_url} />
                        </div>
                        <div className="text-center bg-light bg-gradient text-dark p-4">
                          <h4>{t.tech_label}</h4>
                          <p>{t.tech_value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            : null}
          <div className="">
            <div className="text-center">
              <h2 className="">IDE</h2>
              <i className="fa fa-keyboard-o fa-5x py-3"></i>
            </div>
          </div>

          <div className="row">
            {ideTechs.map((ide, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="">
                  <div className="text-center">
                    <SignedUrl optionalAttr={{width:200, height:200}} type="image" className="img-fluid" appData={appData} unsignedUrl={ide.ide_image_url} />
                    <h6 className="py-2">{ide.ide_label}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{ backgroundColor: "transparent" }}
            className=""
          >
            <div className="text-center">
              <h2 className="">OS</h2>
              <i className="fa fa-terminal fa-5x py-3"></i>
            </div>
          </div>

          <div className="row">
            {osTechs.map((os, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="">
                  <div className="text-center">
                    <SignedUrl optionalAttr={{width:200, height:200}} type="image" className="img-fluid" appData={appData} unsignedUrl={os.os_image_url} />
                    <h6 className="py-2">{os.os_label}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="spinner">
          <Loader
            type={helpers.LoadRandomSpinnerIcon()}
            color={helpers.fluorescentColor}
            height={100}
            width={100}
          />
        </div>
      )}
    </section>
  );
}

export default Technologies;
