import React, { useState, useEffect, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";

function Projects() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Projects`;
  const [projects, setProjects] = useState([]);
  const [projectsHeading, setProjectsHeading] = useState("");

  useEffect(() => {
    apiInstance
      .get("/projects")
      .then((response) => {
        const [projectsHeading, projectsList] = helpers.sageHeaderAndList(
          response.data.response,
          "project_sort"
        );
        setProjects(projectsList);
        setProjectsHeading(projectsHeading);
      })
      .catch((error) => console.log(error))
      .finally(() => 1);
  }, []);

  return (
    <section className="section lb" style={{ minHeight: window.screen.height }}>
      {projects.length < 1 ? (
        <div className="spinner">
          <Loader
            type={helpers.LoadRandomSpinnerIcon()}
            color={helpers.fluorescentColor}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          <div className="section-title">
            <div className="process-box">
              <div className="process-front text-center">
                <h2 className="grey-color">Projects</h2>
                <hr className="hr" />
                <i className="fa fa-code-fork"></i>
                <p className="pl-10 pr-10">
                  {projectsHeading ? projectsHeading.project_value : null}
                </p>
              </div>
            </div>
            {helpers.chunkArray(projects, 3).map((project, i) => (
              <div key={i} className={`row form-group`}>
                {project.map((p, i) => (
                  <div className="col-md-4">
                    <div className="blog-box">
                      <div className="post-media">
                        <div className="title text-center">
                          <h4>{p.project_label}</h4>
                        </div>
                      </div>
                      <div className="blog-desc">
                        <p>{p.project_value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
export default Projects;
