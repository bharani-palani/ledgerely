import React, { useState, useEffect, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";

function Awards() {
  const [awards, setAwards] = useState([]);
  const [awardsHeading, setAwardsHeading] = useState("");
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Awards`;

  useEffect(() => {
    apiInstance
      .get("/awards")
      .then(response => {
        const [awardsHeading, awardsList] = helpers.sageHeaderAndList(
          response.data.response,
          "award_sort"
        );
        setAwards(awardsList);
        setAwardsHeading(awardsHeading);
      })
      .catch(error => console.log(error))
      .finally(() => 1);
  },[]);

  return (
    <section className="" style={{ minHeight: window.screen.height }}>
      {awards.length < 1 ? (
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
              <div className="process-front text-center grey-color">
                <h2 className="">Awards</h2>
                <hr className="hr" />
                <i className="fa fa-trophy"></i>
                <p className="container-fluid">
                  {awardsHeading ? awardsHeading.award_value : null}
                </p>
              </div>
            </div>
            {awards.map((award, i) => (
              <div
                key={i}
                className={`grey-color ${(i + 1) % 3 === 0 ? "row form-group" : null}`}
              >
                <div className="col-md-4">
                  <div className="">
                    <div className="post-media">
                      <div className="title text-center">
                        <h4>{award.award_label}</h4>
                      </div>
                    </div>
                    <div className="blog-desc">
                      <p>{award.award_value}</p>
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

export default Awards;
