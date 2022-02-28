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
    <section className="" style={{ minHeight: window.screen.height }}>
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
          <div className="pt-5">
            <div className="pt-4">
              <div className="text-center">
                <h3 className="">Projects</h3>
                <hr className="hr" />
                <i className="fa fa-code-fork fs-1 py-3"></i>
                <p className="container-fluid">
                  {projectsHeading ? projectsHeading.project_value : null}
                </p>
              </div>
            </div>
            {helpers.chunkArray(projects, 3).map((project, i) => (
              <div key={i} className={`row`}>
                {project.map((p, i) => (
                  <div className="col-md-4">
                    <div className="py-2">
                      <div className="post-media">
                        <div className="title text-center">
                          <h6>{p.project_label}</h6>
                        </div>
                      </div>
                      <div className="text-center">
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
