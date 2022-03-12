import React, { useEffect, useState, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";

function Resume() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.web} | Resume`;
  const [resume, setResume] = useState([]);

  const [allLoaded, setAllLoaded] = useState(false);
  let now = new Date();
  const [YYYY, MMM, DD] = [
    now.getFullYear(),
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1,
    now.getDate() + 1 < 10 ? `0${now.getDate()}` : now.getDate(),
  ];

  now = `${YYYY}-${MMM}-${DD}`;

  useEffect(() => {
    Promise.all([getResume()]).then((a) => {
      setAllLoaded(true);
    });
  }, []);

  const getResume = async () => {
    return await apiInstance
      .get("/resume/getResume")
      .then((response) => {
        setResume(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const arrow = () => (
    <i
      style={{ fontSize: "1rem" }}
      className="fa fa-long-arrow-right"
    />
  );

  const renderDom = () => {
    const careerObjStr = String(
      resume.careerObjective[0].career_description
    ).replace("{n}", resume.careerExpYears);

    return (
      <div className="bg-light text-dark p-3">
        <div className="d-print-none text-end">
          <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
            <i className="fa fa-print" /> Print | Download <i className="fa fa-download" />
          </button>
        </div>
        {resume.header &&
          resume.header[0]["header_name"] &&
          resume.header[0]["header_email"] &&
          resume.header[0]["header_mobile"] &&
          resume.header[0]["header_address"] && (
            <div className="my-3">
              <div className="row">
                <div className="col-md-6">
                  <h3 className="name m-0">
                    <b>{resume.header[0]["header_name"]}</b>
                  </h3>
                  <div>
                    <i className="fa fa-envelope" />
                    &nbsp;{resume.header[0]["header_email"]}
                  </div>
                  <div>
                    <i className="fa fa-phone" />
                    &nbsp;{resume.header[0]["header_mobile"]}
                  </div>
                  <div>
                    <i className="fa fa-globe" />
                    &nbsp;
                    {resume.header[0]["header_web"]}
                  </div>
                </div>
                <div className="text-end col-md-6">
                  {String(resume.header[0]["header_address"])
                    .split(",")
                    .map((add, i) => (
                      <div key={i}>
                        {i === 0 && <i className="fa fa-home" />} {add}
                      </div>
                    ))}
                </div>
              </div>
              <div class="border border-dark border-top my-3"></div>
            </div>
          )}
        {careerObjStr && (
          <div className="my-3">
            <h4 className="py-2">Career Objective</h4>
            <div className="wrap">{careerObjStr}</div>
          </div>
        )}
        {resume.workSummary && resume.workSummary.length > 0 && (
          <div className="my-3">
            <h4 className="py-2">Work summary</h4>
            <div className="row">
              {resume.workSummary.map((w, i) => (
                <React.Fragment key={i}>
                  <div className="col-md-1 text-center d-none d-sm-block col-1 d-print-block">
                      {arrow()}
                  </div>
                  <div className="col-md-4">
                    <div>{w.work_company}</div>
                    <small>{w.work_country}</small>
                  </div>
                  <div className="col-md-7">
                    {w.work_start_date}{" "}
                    <i className="fa fa-calendar px-2" />
                    {i !== 0 ? <span>{w.work_end_date}</span> : "Till now"}
                  </div>
                  <div className="col-md-12 d-block d-sm-none d-print-none">
                    <div class="border-secondary border-top my-3" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.professionalHighlights &&
          resume.professionalHighlights.length > 0 && (
            <div className="my-3">
              <h4 className="py-2">Profesional Highlights</h4>
              <div className="row my-3">
                {resume.professionalHighlights.map((p, i) => (
                  <React.Fragment key={i}>
                    <div className="col-md-1 text-center d-none d-sm-block col-1 d-print-block">
                        {arrow()}
                    </div>
                    <div className="col-md-11">{p.pro_text}</div>
                    <div className="col-md-12 d-block d-sm-none d-print-none">
                      <div class="border-secondary border-top my-3" />  
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        {resume.techSkills && resume.techSkills.length > 0 && (
          <div className="my-3">
            <h4 className="py-2">Technical Skills</h4>
            <div className="row">
              {resume.techSkills.map((t, i) => (
                <React.Fragment key={i}>
                  <div className="col-md-1 text-center d-none d-sm-block col-1 d-print-block">
                      {arrow()}
                  </div>
                  <div className="col-md-11">{t.tech_skill_label}</div>
                  <div className="col-md-12 d-block d-sm-none d-print-none">
                    <div class="border-secondary border-top my-3" />  
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.projectExperience && resume.projectExperience.length > 0 && (
          <div className="my-3">
            <h4 className="py-2">Project Experience</h4>
            {resume.projectExperience.map((p, i) => (
              <React.Fragment key={i}>
                <div className="row pt-2">
                  <div className="col-md-4 text-center text-truncate">
                    <i className="fa fa-university" /> {p.work_company}
                  </div>
                  <div className="col-md-4 text-center text-truncate">
                    <i className="fa fa-briefcase" />
                    &nbsp;{p.project_name}
                  </div>
                  <div className="col-md-4 text-center text-truncate">
                    <i className="fa fa-clock-o" />
                    &nbsp;{p.working_duration}
                  </div>
                </div>
                <div class="border border-dark border-top my-3" />
                <div className="py-2">
                  <b>{p.project_role}</b>
                </div>
                <p>{p.project_introduction}</p>
                {p.role_label && p.role_label.length > 0 && (
                  <div>
                    <div className="py-2">
                      <b>Roles & Responsibilities</b>
                    </div>
                    <div className="row">
                      {p.role_label.map((r, i) => (
                        <React.Fragment key={i}>
                          <div className="col-md-1 text-center d-none d-sm-block col-1 d-print-block">
                              {arrow()}
                          </div>
                          <div className="col-md-11">{r}</div>
                          <div className="col-md-12 d-block d-sm-none d-print-none">
                            <div class="border-secondary border-top my-3" />  
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        {resume.education && resume.education.length > 0 && (
          <div className="my-3">
            <h4 className="py-2">Education</h4>
            <div className="row">
              {resume.education.map((e, i) => (
                <React.Fragment key={i}>  
                  <div className="col-md-1 text-center d-none d-sm-block col-1 d-print-block">
                      {arrow()}
                  </div>
                  <div className="col-md-2">
                    {e.edu_graduation_acronym} - {e.edu_graduation_abbreviation}{" "}
                  </div>
                  <div className="col-md-5">
                    {e.edu_graduation_institution}
                  </div>
                  <div className="col-md-2">{e.edu_graduation_year}</div>
                  <div className="col-md-2">{e.edu_graduation_percent}%</div>
                  <div className="col-md-12 d-block d-sm-none d-print-none">
                    <div class="border-secondary border-top my-3" />  
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.extraAct && resume.extraAct.length > 0 && (
          <div className="my-3">
            <h4 className="py-2">Extracurricular activities</h4>
            <div className="row">
              {resume.extraAct.map((e, i) => (
                <React.Fragment key={i}>
                  <div className="col-md-1 text-center d-none d-sm-block col-1 d-print-block">
                      {arrow()}
                  </div>
                  <div className="col-md-11">{e.activity_name}</div>
                  <div className="col-md-12 d-block d-sm-none d-print-none">
                    <div class="border-secondary border-top my-3" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.personalInfo && resume.personalInfo.length > 0 && (
          <div className="my-3">
            <h4 className="py-2">Personal information:</h4>
            <div className="row">
              {resume.personalInfo.map((p, i) => (
                <React.Fragment key={i}>
                  <div className="col-md-3">{p.info_key}</div>
                  <div className="col-md-9">{p.info_value}</div>
                  <div className="col-md-12 d-block d-sm-none d-print-none">
                    <div class="border-secondary border-top my-3" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.footer && (
          <div className="my-3">
            <div className="my-5">{resume.footer[0]["footer_text"]}</div>
            <div className="row">
              <div className="col-6">
                <b className="pe-2">Place:</b>{resume.footer[0]["footer_place"]}
              </div>
              <div className="text-end pr-5 col-6">
                <b>SIGNATURE</b>
              </div>
              <div className="col-6">
                <b className="pe-2">Date:</b>
                <span>{now}</span>
              </div>
              <div className="col-6 text-end">
                {resume.footer[0]["footer_signature_name"]}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-dark text-white" style={{ minHeight: window.screen.height }}>
      {!allLoaded ? (
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
          <div className="pt-5 d-print-none">
            <div className="pt-4">
              <div className="text-center">
                <h4 className="">Resume</h4>
                <hr className="hr" />
                <i className="fa fa-file-text fa-5x py-3"></i>
                <p>My skills, experience, projects and more</p>
              </div>
            </div>
          </div>
          {renderDom()}
        </>
      )}
    </section>
  );
}

export default Resume;
