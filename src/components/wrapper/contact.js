import React, { useState, useEffect, useContext } from "react";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import AppContext from "../../contexts/AppContext";

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{
        lat: Number(props.userData.latitude),
        lng: Number(props.userData.longitude)
      }}
    >
      <Marker
        onClick={props.onMarkerClick}
        position={{
          lat: Number(props.userData.latitude),
          lng: Number(props.userData.longitude)
        }}
      />
    </GoogleMap>
  ))
);

function Contact() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.web} | Contact`;
  const [contacts, setContacts] = useState([]);
  const [contactHeading, setContactHeading] = useState([]);

  useEffect(() => {
    apiInstance
      .get("/contacts")
      .then(response => {
        const [contactHeading, contactList] = helpers.sageHeaderAndList(
          response.data.response,
          "contact_sort"
        );
        setContacts(contactList);
        setContactHeading(contactHeading);
      })
      .catch(error => console.log(error))
      .finally(() => 1);
  }, []);

  const initMap = userData => {
    const { address1, address2, city, state, country, postcode } = userData;
    const str = `${address1} ${address2} ${city} ${state} ${country} ${postcode}`;
    let directionsUrl = "";
    switch (true) {
      case /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase()):
        directionsUrl = `maps:?saddr=Current Location&daddr=${str}`;
        break;
      case /windows phone 7/i.test(navigator.userAgent.toLowerCase()):
        directionsUrl = `maps:${str}`;
        break;
      case /windows phone 8/i.test(navigator.userAgent.toLowerCase()):
        directionsUrl = `bingmaps:?where=${str}`;
        break;
      case /android/i.test(navigator.userAgent.toLowerCase()):
        directionsUrl = `geo:${str}`;
        break;
      case /blackberry/i.test(navigator.userAgent.toLowerCase()):
        directionsUrl = `javascript:blackberry.launch.newMap({'address':{${str}}})`;
        break;
      default:
        directionsUrl = `https://maps.google.com?q=${Number(
          userData.latitude
        )},${Number(userData.longitude)}`;
    }
    window.open(directionsUrl);
  };
  return (
    <AppContext.Consumer>
      {appcontext => {
        const [userData] = appcontext;
        return (
          <section
            className=""
          >
            {contacts.length < 1 ? (
              <div className="spinner">
                <Loader
                  type={helpers.LoadRandomSpinnerIcon()}
                  color={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              <>
                <div className="pt-5">
                  <div className="pt-4">
                    <div className="text-center">
                      <h4 className="">Contact</h4>
                      <hr className="hr" />
                      <i className="fa fa-id-card-o fa-5x py-3"></i>
                      <p className="container-fluid">
                        {contactHeading ? contactHeading.contact_value : null}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      {contacts.length > 0
                        ? contacts.map((c, i) => (
                            <div key={i} className="row">
                              <div className="col-6 col-sm-3 text-break">
                                {c.contact_label}
                              </div>
                              <div className="col-6 col-sm-9 text-break">
                                <em>
                                  {c.contact_href ? (
                                    <a
                                      href={c.contact_href}
                                    >
                                      {c.contact_value}
                                    </a>
                                  ) : (
                                    c.contact_value
                                  )}
                                </em>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <hr className="hr mb-3" />
                  <h4>
                    Map
                  </h4>
                    <div>
                      <small>
                        Click <i className="fa fa-map-marker" /> icon to reach in maps..
                      </small>
                      <div className="pt-4">
                        {userData && userData.google_map_api_key && (
                          <MapWithAMarker
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${userData.google_map_api_key}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            onMarkerClick={() => initMap(userData)}
                            userData={userData}
                          />
                        )}
                      </div>
                  </div>
                </div>
              </>
            )}
          </section>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Contact;
