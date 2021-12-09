import React, { useState, useEffect } from "react";
import apiInstance from "../../services/apiServices";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { toast } from "react-toastify";
import AppContext from "../../contexts/AppContext";

function ViewMessages(props) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const formdata = new FormData();
    formdata.append("TableRows", [
      "comment_id",
      "comment_name",
      "comment_mobile",
      "comment_description",
      "comment_email",
      "comment_ip",
      "comment_time",
      "latitude",
      "longitude"
    ]);
    formdata.append("Table", "public_comments");

    apiInstance
      .post("/getBackend", formdata)
      .then(response => {
        setComments(response.data.response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const initMap = () => {
    return false;
  };

  const commentHtml = c => {
    return (
      <div>
        <div>
          <i className="fi-interface-user" />
          &nbsp;<small>{c.comment_name}</small>
        </div>
        <div>
          <i className="fa fa-comment-o" />
          &nbsp;<small>{c.comment_description}</small>
        </div>
        <div>
          <i className="fa fa-phone" />
          &nbsp;
          <small>
            <a href={`tel:${c.comment_mobile}`}>{c.comment_mobile}</a>
          </small>
        </div>
        <div>
          <i className="fa fa-envelope" />
          &nbsp;
          <small>
            <a href={`mailto:${c.comment_email}`}>{c.comment_email}</a>
          </small>
        </div>
        <div>
          <i className="fa fa-clock-o" />
          &nbsp;<small>{c.comment_time}</small>
        </div>
        <div>
          <i className="fa fa-microchip" />
          &nbsp;<small>{c.comment_ip}</small>
          <i className="fa fa-trash trash" onClick={() => deleteComment(c)} />
        </div>
      </div>
    );
  };

  const deleteComment = c => {
    let newComments = comments.filter(co => co.comment_id !== c.comment_id);
    setComments(newComments);
  };
  const onMarkerClick = c => {
    toast.error(commentHtml(c));
  };
  const MapWithAMarker = withScriptjs(
    withGoogleMap(props => {
      const {userData} = props;
      return <GoogleMap defaultZoom={12} defaultCenter={{ lat: Number(userData.latitude), lng: Number(userData.longitude) }}>
        {comments.map((comment, i) => {
          const index = i + 1;
          return (
            <Marker
              label={index.toString()}
              key={i}
              position={{
                lat: Number(comment.latitude),
                lng: Number(comment.longitude)
              }}
              onClick={() => onMarkerClick(comment)}
            ></Marker>
          );
        })}
      </GoogleMap>
    })
  );

  return (
    <AppContext.Consumer>
      {appcontext => {
        const [userData] = appcontext;
        return <>
          {comments.length > 0 && userData && userData.google_map_api_key && (
            <MapWithAMarker
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${userData.google_map_api_key}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div style={{ height: `${window.innerHeight - 75}px` }} />
              }
              mapElement={<div style={{ height: `100%` }} />}
              onMarkerClick={() => initMap()}
              userData={userData}
            />
          )}
        </>
      }}
    </AppContext.Consumer>
  );
}

export default ViewMessages;
