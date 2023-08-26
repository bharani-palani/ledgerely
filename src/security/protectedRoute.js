import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <UserContext.Consumer>
      {userInfo => {
        return (
          <Route
            {...rest}
            render={props => {
              if (rest.accessGiven.includes(userInfo.userData.type)) {
                return <Component {...props} />;
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: "error",
                      state: { from: props.location },
                    }}
                  />
                );
              }
            }}
          />
        );
      }}
    </UserContext.Consumer>
  );
};
