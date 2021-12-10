import React, { useEffect, useState, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";

function Resume() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Resume`;
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
      className={resume.header[0].config_arrow_font}
    />
  );

  const renderDom = () => {
    const careerObjStr = String(
      resume.careerObjective[0].career_description
    ).replace("{n}", resume.careerExpYears);
    return (
      <div className="resumeContainer">
        <div className="printerIcon hidden-print">
          <span onClick={() => window.print()}>
            <i className="fa fa-print" />
          </span>
        </div>
        {resume.header &&
          resume.header[0]["header_name"] &&
          resume.header[0]["header_email"] &&
          resume.header[0]["header_mobile"] &&
          resume.header[0]["header_address"] && (
            <div className="mb-30">
              <div className="equal-grid-2">
                <div className="text-left pb-5">
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
                <div className="text-right m-text-left t-text-left">
                  {String(resume.header[0]["header_address"])
                    .split(",")
                    .map((add, i) => (
                      <div key={i}>
                        {i === 0 && <i className="fa fa-home" />} {add}
                      </div>
                    ))}
                </div>
              </div>
              <div className="borderedDiv thick wallToWall mb-20 mt-10" />
            </div>
          )}
        {careerObjStr && (
          <div className="mb-30">
            <h4 className="topicHeading">Career Objective</h4>
            <div className="wrap">{careerObjStr}</div>
          </div>
        )}
        {resume.workSummary && resume.workSummary.length > 0 && (
          <div className="mb-30">
            <h4 className="topicHeading">Work summary</h4>
            <div className="grid-4">
              {resume.workSummary.map((w, i) => (
                <React.Fragment key={i}>
                  <div>
                    <div className="hidden-xs hidden-sm print-visible text-center">
                      {arrow()}
                    </div>
                  </div>
                  <div>
                    <div>{w.work_company}</div>
                    <small>{w.work_country}</small>
                  </div>
                  <div>
                    {w.work_start_date}{" "}
                    <i className="fa fa-calendar pl-10 pr-10" />
                    {i !== 0 ? <span>{w.work_end_date}</span> : "Till now"}
                  </div>
                  <div>
                    <div className="hidden-lg hidden-md hidden-print borderedDiv" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.professionalHighlights &&
          resume.professionalHighlights.length > 0 && (
            <div className="mb-30">
              <h4 className="topicHeading">Profesional Highlights</h4>
              <div className="grid-3 mb-30">
                {resume.professionalHighlights.map((p, i) => (
                  <React.Fragment key={i}>
                    <div>
                      <div className="hidden-xs hidden-sm print-visible text-center">
                        {arrow()}
                      </div>
                    </div>
                    <div className="wrap">{p.pro_text}</div>
                    <div>
                      <div className="hidden-lg hidden-md hidden-print borderedDiv" />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        {resume.techSkills && resume.techSkills.length > 0 && (
          <div className="mb-30">
            <h4 className="topicHeading">Technical Skills</h4>
            <div className="grid-3">
              {resume.techSkills.map((t, i) => (
                <React.Fragment key={i}>
                  <div>
                    <div className="hidden-xs hidden-sm print-visible text-center">
                      {arrow()}
                    </div>
                  </div>
                  <div className="wrap">{t.tech_skill_label}</div>
                  <div>
                    <div className="hidden-lg hidden-md hidden-print borderedDiv" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.projectExperience && resume.projectExperience.length > 0 && (
          <div className="mb-30">
            <h4 className="topicHeading">Project Experience</h4>
            {resume.projectExperience.map((p, i) => (
              <React.Fragment key={i}>
                <div className="equal-grid-3 borderedDiv pt-10 pb-10 mb-20">
                  <div>
                    <i className="fa fa-university" /> {p.work_company}
                  </div>
                  <div className="text-center t-text-left m-text-left">
                    <i className="fa fa-briefcase" />
                    &nbsp;{p.project_name}
                  </div>
                  <div className="text-right t-text-left m-text-left">
                    <i className="fa fa-clock-o" />
                    &nbsp;{p.working_duration}
                  </div>
                </div>
                <div>
                  <b>{p.project_role}</b>
                </div>
                <p>{p.project_introduction}</p>
                {p.role_label && p.role_label.length > 0 && (
                  <div className="mb-20">
                    <div>
                      <b>Roles & Responsibilities</b>
                    </div>
                    <div className="grid-3">
                      {p.role_label.map((r, i) => (
                        <React.Fragment key={i}>
                          <div>
                            <div className="hidden-xs hidden-sm print-visible text-center">
                              {arrow()}
                            </div>
                          </div>
                          <div className="wrap">{r}</div>
                          <div>
                            <div className="hidden-lg hidden-md hidden-print borderedDiv" />
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
          <div className="mb-30">
            <h4 className="topicHeading">Education</h4>
            <div className="grid-6">
              {resume.education.map((e, i) => (
                <React.Fragment key={i}>
                  <div>
                    <div className="hidden-xs hidden-sm print-visible text-center">
                      {arrow()}
                    </div>
                  </div>
                  <div className="wrap pr-5">
                    {e.edu_graduation_acronym} - {e.edu_graduation_abbreviation}{" "}
                  </div>
                  <div className="wrap pr-10">
                    {e.edu_graduation_institution}
                  </div>
                  <div className="wrap pr-10">{e.edu_graduation_year}</div>
                  <div className="wrap pr-10">{e.edu_graduation_percent}%</div>
                  <div>
                    <div className="hidden-lg hidden-md hidden-print borderedDiv" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.extraAct && resume.extraAct.length > 0 && (
          <div className="mb-30">
            <h4 className="topicHeading">Extracurricular activities</h4>
            <div className="grid-3">
              {resume.extraAct.map((e, i) => (
                <React.Fragment key={i}>
                  <div>
                    <div className="hidden-xs hidden-sm print-visible text-center">
                      {arrow()}
                    </div>
                  </div>
                  <div className="wrap">{e.activity_name}</div>
                  <div>
                    <div className="hidden-lg hidden-md hidden-print borderedDiv" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.personalInfo && resume.personalInfo.length > 0 && (
          <div className="mb-30">
            <h4 className="topicHeading">Personal information:</h4>
            <div className="equal-grid-3">
              {resume.personalInfo.map((p, i) => (
                <React.Fragment key={i}>
                  <div>{p.info_key}</div>
                  <div className="wrap">{p.info_value}</div>
                  <div>
                    <div className="hidden-lg hidden-md hidden-print mt-5 mb-5 borderedDiv" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {resume.footer && (
          <div className="mb-30">
            <div className="mb-30">{resume.footer[0]["footer_text"]}</div>
            <div className="equal-grid-2 footer-grid">
              <div>
                <b>Place:</b>&nbsp;{resume.footer[0]["footer_place"]}
              </div>
              <div className="text-right pr-5">
                <b>SIGNATURE</b>
              </div>
              <div>
                <b className="pr-7">Date:</b>
                <span>{now}</span>
              </div>
              <div className="text-right">
                {resume.footer[0]["footer_signature_name"]}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="section lb" style={{ minHeight: window.screen.height }}>
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
          <div className="section-title">
            <div className="process-box hidden-print pb-30">
              <div className="process-front text-center">
                <h2 className="grey-color">Resume</h2>
                <hr />
                <i className="fa fa-file-text"></i>
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
