import React, { useState, useEffect, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";
import { UserContext } from "../../contexts/UserContext";

function Projects() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.web} | Projects`;
	const userContext = useContext(UserContext);
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
    <section className="">
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
                <i className="fa fa-code-fork fa-5x py-3"></i>
                <p className="container-fluid">
                  {projectsHeading ? projectsHeading.project_value : null}
                </p>
              </div>
            </div>
            <div className="container-fluid">
              {helpers.chunkArray(projects, 3).map((project, i) => (
                <div key={i} className={`row`}>
                  {project.map((p, i) => (
                    <div className="col-md-4">
                      <div className="py-2">
                      <div className={`card border border-1 ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-black'}`}>
                        <div className="card-body">
                          <h6 className="card-title">{p.project_label}</h6>
                          <div className="card-text">
                            {p.project_value}
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
export default Projects;
