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
  document.title = `${appData.display_name} | Contact`;
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
            className="section lb"
            style={{ minHeight: window.screen.height }}
          >
            {contacts.length < 1 ? (
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
                  <div className="process-box">
                    <div className="process-front text-center">
                      <h2 className="grey-color">Contact</h2>
                      <hr />
                      <i className="fa fa-id-card-o"></i>
                      <p className="container-fluid">
                        {contactHeading ? contactHeading.contact_value : null}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <h4 className="contactLabel">
                    Ping me <i className="fa fa-phone" />
                  </h4>
                  <div className="row">
                    <div className="col-lg-12">
                      {contacts.length > 0
                        ? contacts.map((c, i) => (
                            <div key={i}>
                              <div className="col-lg-3 col-md-6 pl-0">
                                {c.contact_label}
                              </div>
                              <div className="col-lg-9 col-md-6 pl-0">
                                <em>
                                  {c.contact_href ? (
                                    <a
                                      className="normalLink"
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
                  <h4 className="contactLabel">
                    Reach me <i className="fa fa-car" />
                  </h4>
                  <div className="row">
                    <div className="col-lg-12">
                      <div>
                        <small>
                          <i className="fa fa-map-marker" /> Click marker to
                          open in Goolgle Maps
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-12">
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
