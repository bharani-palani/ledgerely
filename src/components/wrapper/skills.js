import React, { useState, useEffect, useContext } from "react";
import Loader from "react-loader-spinner";
import apiInstance from "../../services/apiServices";
import helpers from "../../helpers";
import { aws } from "../../environment";
import AppContext from "../../contexts/AppContext";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
    <section className="section lb" style={{ minHeight: window.screen.height }}>
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
          <div className="section-title">
            <div
              className="process-box pb-30"
            >
              <div className="process-front text-center">
                <h2 className="grey-color">Skills</h2>
                <hr />
                <i className="fa fa-graduation-cap"></i>
                <p className="container-fluid">
                  {skillsHeading ? skillsHeading.skill_value : null}
                </p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row black-three-color">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="blog-box col-lg-12 col-md-12 form-group"
                >
                  <div className="post-media col-lg-3 col-md-6">
                    <LazyLoadImage
                      width={"100%"}
                      height={200}
                      placeholderSrc={require("../../images/imgPlaceholder.jpeg")}
                      src={`${aws.baseUrl}/skills/${
                        skill.skill_image_url
                      }`}
                      alt={`skill-${skill.skill_id}`}
                      // className="img-responsive lefty"
                      key={skill.skill_id}
                    />
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
