import React, { useState, useEffect, useContext } from "react";
import Loader from "react-loader-spinner";
import apiInstance from "../../services/apiServices";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";
import SignedUrl from "../configuration/Gallery/SignedUrl";

function Skills() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Skills`;
  const [skills, setSkills] = useState([]);
  const [skillsHeading, setSkillsHeading] = useState("");

  useEffect(() => {
    apiInstance
      .get("/skills")
      .then(response => {
        const [skillsHeading, skillsList] = helpers.sageHeaderAndList(
          response.data.response,
          "skill_sort"
        );
        setSkills(skillsList);
        setSkillsHeading(skillsHeading);
      })
      .catch(error => console.log(error))
      .finally(() => 1);
  }, []);

  return (
    <section className="" style={{ minHeight: window.screen.height }}>
      {skills.length < 1 ? (
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
          <div className="">
            <div
              className="process-box"
            >
              <div className="process-front text-center">
                <h2 className="">Skills</h2>
                <hr className="hr" />
                <i className="fa fa-graduation-cap"></i>
                <p className="container-fluid">
                  {skillsHeading ? skillsHeading.skill_value : null}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="row black-three-color">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="col-lg-12 col-md-12 form-group"
                >
                  <div className="post-media col-lg-3 col-md-6">
                    <SignedUrl optionalAttr={{width:"100%"}} type="image" appData={appData} unsignedUrl={skill.skill_image_url} />
                  </div>
                  <div className="blog-desc col-lg-9 col-md-6">
                    <h4 className="text-center">{skill.skill_label}</h4>
                    <p>{skill.skill_value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Skills;
