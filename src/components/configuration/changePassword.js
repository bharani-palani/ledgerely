import React, { useState, useEffect } from "react";

function ChangePassword(props) {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  useEffect(() => {
    props.onCredentialUpdate({ currentPass, newPass, repeatPass, viewMode: "Configure"});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPass, newPass, repeatPass]);

  const [CP, setCP] = useState(false);
  const [NP, setNP] = useState(false);
  const [RP, setRP] = useState(false);
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="form-group">
          <div className="passwordArea">
            <input
              onChange={e => {setCurrentPass(e.target.value); setCP(true)}}
              type="password"
              className="form-control"
              placeholder="Current Password"
              onBlur={(e) => setCP(true)}
            />
            {
              CP && (
                <i className={`fa fa-${currentPass.length > 0 ? "check good" : "times bad"}`}/>
              )
            }
          </div>
        </div>
        <div className="form-group">
          <div className="passwordArea">
            <input
              onChange={e => {setNewPass(e.target.value);setNP(true)}}
              type="password"
              className="form-control"
              placeholder="New Password"
              onBlur={(e) => setNP(true)}
            />
            {
              NP && (
                <i className={`fa fa-${newPass.length > 0 ? "check good" : "times bad"}`} />
              )
            }
          </div>
        </div>
        <div className="form-group">
          <div className="passwordArea">
            <input
              onChange={e => {setRepeatPass(e.target.value);setRP(true)}}
              type="password"
              className="form-control"
              placeholder="Repeat Password"
              onBlur={(e) => setRP(true)}
            />
            {
              RP && (
                <i className={`fa fa-${(repeatPass.length > 0 && repeatPass === newPass) ? "check good" : "times bad"}`} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
