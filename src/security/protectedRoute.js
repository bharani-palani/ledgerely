import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import AppContext from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <AppContext.Consumer>
      {appData => {
        return (
          <UserContext.Consumer>
            {(userData) => {
              return (
                <Route {...rest} render={props => {
                    if (auth.isAuthenticated(appData, JSON.parse(localStorage.getItem("googleData")))) {
                      return <Component {...props} />;
                    } else {
                      return (
                        <Redirect
                          to={{
                            pathname: "unAuth",
                            state: { from: props.location }
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
      }}
    </AppContext.Consumer>
  );
};
