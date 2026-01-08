import React, { useState, useContext, useEffect } from "react";
import {
  // SignedUrl,
  getServiceProvider,
} from "../configuration/Gallery/SignedUrl";
import { Dropdown, Form, InputGroup, Row, Col } from "react-bootstrap";
import Switch from "react-switch";
import LoginUser from "./loginUser";
import { UserContext } from "../../contexts/UserContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { FormattedMessage, useIntl } from "react-intl";
import ReactPlayer from "react-player";
import { FactoryMap } from "../configuration/Gallery/FactoryMap";
import { GlobalContext } from "../../contexts/GlobalContext";
import moment from "moment";
import "moment-timezone";
import GlobalSearch from "./GlobalSearch";
import packageJson from "../../../package.json";
import { useLocation } from "react-router-dom";
import SvgText from "../../images/charts/svgComponents/SvgText";

const socialMedias = [
  { name: "Facebook", icon: "fa fa-facebook", id: "facebookUrl" },
  { name: "LinkedIn", icon: "fa fa-linkedin", id: "linkedInUrl" },
  { name: "Twitter", icon: "fa fa-twitter", id: "twitterUrl" },
  { name: "Instagram", icon: "fa fa-instagram", id: "instagramUrl" },
];

function GlobalHeader(props) {
  const location = useLocation();
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const [audioShown, setAudioShown] = useState(false);
  const [videoShown, setVideoShown] = useState(false);
  const [social, setSocial] = useState([]);
  const [theme, setTheme] = useState(userContext.userData.theme);
  const [audioUrl, setAudioUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [dropDownShown, setdropDown] = useState(false);

  const onToggleHandler = (isOpen, e) => {
    if (e.source !== "select") {
      setdropDown(isOpen);
    }
  };

  useEffect(() => {
    const audioSp = getServiceProvider(globalContext?.bgSong);
    const a =
      FactoryMap(audioSp, globalContext)?.library?.getSignedUrl(globalContext?.bgSong) ||
      Promise.resolve({ url: globalContext?.bgSong, path: "", extension: "" });

    const videoSp = getServiceProvider(globalContext?.bgVideo);
    const b =
      FactoryMap(videoSp, globalContext)?.library?.getSignedUrl(globalContext?.bgVideo) ||
      Promise.resolve({ url: globalContext?.bgVideo, path: "", extension: "" });

    Promise.all([a, b]).then(r => {
      setAudioUrl(r[0].url);
      setVideoUrl(r[1].url);
    });
  }, [userContext.userConfig]);

  useEffect(() => {
    userContext.updateUserData("theme", theme);
  }, [theme]);

  useEffect(() => {
    userContext.updateUserData("videoShown", videoShown);
  }, [videoShown]);

  useEffect(() => {
    userContext.updateUserData("audioShown", audioShown);
  }, [audioShown]);

  useEffect(() => {
    if (userContext.userConfig && Object.keys(userContext.userConfig).length > 0) {
      setAudioShown(userContext.userConfig.bgSongDefaultPlay === "1");
      setVideoShown(userContext.userConfig.bgVideoDefaultPlay === "1");
    }
  }, [userContext.userConfig]);

  useEffect(() => {
    if (globalContext && Object.keys(globalContext).length > 0) {
      const appKeys = Object.keys(globalContext);
      const soc = [...socialMedias].map(s => {
        if (appKeys.includes(s.id)) {
          s.href = globalContext[s.id];
        }
        return s;
      });

      setSocial(soc);
    }
  }, [globalContext]);

  const isExpired = () => moment().isAfter(moment(userContext?.userConfig?.expiryDateTime, "YYYY-MM-DD"));

  return (
    <div>
      <ReactPlayer controls={false} loop={true} playing={audioShown} width='0px' height='0px' url={audioUrl} config={{ forceAudio: true }} />

      <ReactPlayer
        className='videoTag d-print-none'
        playsinline={true}
        style={{ display: videoShown ? "block" : "none" }}
        playing={videoShown}
        loop={true}
        muted={true}
        controls={false}
        width='100%'
        height='100vh'
        url={videoUrl}
      />
      {userContext?.userData?.userId && (
        <div
          className={`globalHeader globalHeader-${userContext.userData.theme} d-print-none fixed-top ${
            userContext.userData.videoShown ? "opac" : ""
          }`}
        >
          <Row className='justify-content-between align-items-center' style={{ height: "45px" }}>
            <Col xl={4} lg={4} md={5} xs={10} className='ps-3'>
              <a href={`/${process.env.REACT_APP_SUBFOLDER}${location.pathname}`} className='pe-2 d-flex align-items-center'>
                <SvgText text='Ledgerely' width={175} height={40} fontSize={35} />
                {process.env.REACT_APP_ENV !== "production" && (
                  <span className={`bni-bg text-dark ms-2 text-uppercase badge bg-${userContext.userData.theme} rounded-pill py-2`}>
                    <small>{process.env.REACT_APP_ENV}</small>
                  </span>
                )}
              </a>
            </Col>
            <Col xl={4} lg={6} md={5} className='d-none d-sm-block'>
              <GlobalSearch />
            </Col>
            <Col xl={4} lg={2} md={2} xs={2} className='text-end p-0'>
              <Dropdown show={dropDownShown} onToggle={onToggleHandler}>
                <Dropdown.Toggle as='i'>
                  <i className={`fa fa-user gIcon icon-bni pe-2`} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align='start'
                  className={`mt-2 ${userContext.userData.theme === "dark" ? "bg-dark text-white-50" : "bg-white text-black"}`}
                >
                  {userContext?.userConfig?.planName && userContext?.userConfig?.planCode && (
                    <Dropdown.Item as='div' className='p-0'>
                      <div
                        // style={{ fontSize: "0.75rem" }}
                        className='d-flex align-items-center justify-content-between small rounded-top p-1'
                      >
                        <div>
                          <i className='fa fa-diamond pe-2' />
                          <span>
                            <FormattedMessage id='plan' defaultMessage='plan' />
                          </span>
                        </div>
                        <div className='text-truncate'>{userContext?.userConfig?.planCode}</div>
                        <div className='text-truncate'>
                          <span className='small py-1 px-2 rounded'>v{packageJson.version}</span>
                        </div>
                      </div>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item as='div'>
                    <LoginUser
                      onLogAction={() => {
                        setdropDown(true);
                      }}
                    />
                  </Dropdown.Item>
                  {Boolean(Number(userContext?.userConfig?.switchSongFeatureRequired)) && (
                    <Dropdown.Item
                      as='div'
                      onClick={() => {
                        setAudioShown(!audioShown);
                      }}
                    >
                      <div className='options'>
                        <div className='labelText'>
                          <FormattedMessage id='music' defaultMessage='music' />
                        </div>
                        <Switch
                          onColor={"#aaa"}
                          offColor={"#aaa"}
                          offHandleColor={userContext.userData.theme === "dark" ? "#ffffff" : "#000000"}
                          onHandleColor={userContext.userData.theme === "dark" ? "#ffffff" : "#000000"}
                          handleDiameter={15}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          height={10}
                          width={40}
                          onChange={() => {
                            setAudioShown(!audioShown);
                          }}
                          checked={audioShown === true}
                        />
                      </div>
                    </Dropdown.Item>
                  )}
                  {Boolean(Number(userContext?.userConfig?.switchVideoFeatureRequired)) && (
                    <Dropdown.Item as='div' onClick={() => setVideoShown(!videoShown)}>
                      <div className='options'>
                        <div className='labelText'>
                          <FormattedMessage id='video' defaultMessage='video' />
                        </div>
                        <Switch
                          onColor={"#aaa"}
                          offColor={"#aaa"}
                          offHandleColor={userContext.userData.theme === "dark" ? "#ffffff" : "#000000"}
                          onHandleColor={userContext.userData.theme === "dark" ? "#ffffff" : "#000000"}
                          handleDiameter={15}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          height={10}
                          width={40}
                          onChange={() => setVideoShown(!videoShown)}
                          checked={videoShown === true}
                        />
                      </div>
                    </Dropdown.Item>
                  )}
                  {Boolean(Number(userContext?.userConfig?.switchThemeFeatureRequired)) && (
                    <Dropdown.Item as='div'>
                      <div className='options'>
                        <button
                          className={`btn btn-sm rounded-circle ${
                            userContext.userData.theme === "dark" ? "btn-dark btn-outline-secondary" : "btn-light btn-outline-dark"
                          } ${userContext.userData.theme === "dark" ? "active" : ""}`}
                          onClick={() => {
                            setTheme("dark");
                          }}
                          title={intl.formatMessage({
                            id: "dark",
                            defaultMessage: "dark",
                          })}
                        >
                          <i className='fa fa-moon-o' />
                        </button>
                        <button
                          className={`btn btn-sm rounded-circle ${
                            userContext.userData.theme === "dark" ? "btn-dark btn-outline-secondary" : "btn-light btn-outline-secondary"
                          } ${userContext.userData.theme === "light" ? "active" : ""}`}
                          onClick={() => setTheme("light")}
                          title={intl.formatMessage({
                            id: "light",
                            defaultMessage: "light",
                          })}
                        >
                          <i className='fa fa-sun-o' />
                        </button>
                      </div>
                    </Dropdown.Item>
                  )}
                  {localeContext.localeList.length > 0 && (
                    <Dropdown.Item as='div'>
                      <InputGroup style={{ width: "90%", margin: "0 auto" }}>
                        <InputGroup.Text
                          className={`${userContext.userData.theme === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark"}`}
                        >
                          <i className='fa fa-globe' />
                        </InputGroup.Text>
                        <Form.Select
                          className={`${userContext.userData.theme === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark"}`}
                          value={localeContext.localeId}
                          size='sm'
                          onChange={e => localeContext.setLocaleId(e.target.value)}
                        >
                          {localeContext.localeList.map((l, i) => (
                            <option key={i} value={l.string}>
                              {l.label}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Dropdown.Item>
                  )}
                  {Boolean(Number(globalContext?.switchSocialMediaFeatureRequired)) && social.length > 0 && (
                    <Dropdown.Item as='div'>
                      <div className='options text-center'>
                        {social.map((media, i) => (
                          <a
                            className={userContext.userData.theme === "dark" ? "text-white-50" : "text-black-50"}
                            key={i}
                            href={media.href}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <i className={`${media.icon} social-icons`} />
                          </a>
                        ))}
                      </div>
                    </Dropdown.Item>
                  )}
                  {userContext?.userConfig?.expiryDateTime && (
                    <Dropdown.Item as='div' className='p-0'>
                      <div
                        style={{ fontSize: "0.75rem" }}
                        className='small rounded-bottom text-dark p-1'
                        title={moment(userContext?.userConfig?.expiryDateTime).format("MMM Do YYYY, h:mm:ss a").toString()}
                      >
                        <div className='text-center text-wrap'>
                          <i className={`fa fa-hourglass-${isExpired() ? "o" : "half"} pe-1`} />
                          <span className='ps-2 pe-1'>
                            <FormattedMessage id={isExpired() ? "expired" : "expiring"} defaultMessage={isExpired() ? "expired" : "expiring"} />
                          </span>
                          <span className=''>
                            {moment(userContext?.userConfig?.expiryDateTime, "YYYYMMDD")
                              .locale(localeContext.localeLanguage)
                              .tz(moment.tz.guess())
                              .fromNow()}
                          </span>
                        </div>
                      </div>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </div>
      )}
      {props.children}
    </div>
  );
}

export default GlobalHeader;
