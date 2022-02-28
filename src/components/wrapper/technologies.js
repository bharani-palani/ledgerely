import React, { useEffect, useState, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";
import SignedUrl from "../configuration/Gallery/SignedUrl";

function Technologies() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Technologies`;
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
    <section className="" style={{ minHeight: window.screen.height }}>
      {techHeading && techs && ideTechs && osTechs ? (
        <>
          <div className="text-center">
            <div className="process-box ">
              <div className="process-front text-center">
                <h2 className="">Technologies</h2>
                <hr className="hr" />
                <i className="fa fa-code"></i>
                <p className="container-fluid">
                  {techHeading ? techHeading.tech_value : null}
                </p>
              </div>
            </div>
          </div>
          {techs
            ? helpers.chunkArray(techs, 3).map((tech, j) => (
                <div key={`chunk-${j}`} className="row form-group">
                  {tech.map((t, i) => (
                    <div key={i} className={`col-md-4 text-center`}>
                      <div className="">
                        <div className="post-media">
                          <SignedUrl optionalAttr={{width:"100%", height:200}} type="image" appData={appData} unsignedUrl={t.tech_image_url} />
                        </div>
                        <div className="blog-desc">
                          <h4>{t.tech_label}</h4>
                          <p>{t.tech_value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            : null}
          <div className="process-box mb-50">
            <div className="process-front text-center">
              <h2 className="">IDE</h2>
              <i className="fa fa-keyboard-o"></i>
            </div>
          </div>

          <div className="row">
            {ideTechs.map((ide, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="process-box">
                  <div className="process-front text-center">
                    <SignedUrl optionalAttr={{width:"100%", height:150}} type="image" appData={appData} unsignedUrl={ide.ide_image_url} />
                    <h3>{ide.ide_label}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{ backgroundColor: "transparent" }}
            className="process-box mb-50"
          >
            <div className="process-front text-center">
              <h2 className="">OS</h2>
              <i className="fa fa-terminal"></i>
            </div>
          </div>

          <div className="row">
            {osTechs.map((os, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="process-box">
                  <div className="process-front text-center">
                    <SignedUrl optionalAttr={{width:"100%", height:150}} type="image" appData={appData} unsignedUrl={os.os_image_url} />
                    <h3>{os.os_label}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
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
