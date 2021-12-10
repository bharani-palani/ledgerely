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
      .then(response => {
        const [projectsHeading, projectsList] = helpers.sageHeaderAndList(
          response.data.response,
          "project_sort"
        );
        setProjects(projectsList);
        setProjectsHeading(projectsHeading);
      })
      .catch(error => console.log(error))
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
            <div
              className="process-box pb-30"
            >
              <div className="process-front text-center">
                <h2 className="grey-color">Projects</h2>
                <hr />
                <i className="fa fa-film"></i>
                <p className="pl-10 pr-10">
                  {projectsHeading ? projectsHeading.project_value : null}
                </p>
              </div>
            </div>
            {projects.map((project, i) => (
              <div
                key={i}
                className={`grey-color ${(i + 1) % 2 === 0 ? "row form-group" : null}`}
              >
                <div className="col-md-6">
                  <div className="blog-box">
                    <div className="post-media">
                      <div className="title text-center">
                        <h4>{project.project_label}</h4>
                      </div>
                    </div>
                    <div className="blog-desc">
                      <p>{project.project_value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
export default Projects;
