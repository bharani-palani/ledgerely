import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../security/protectedRoute";
import ErrorPage from "./errorpage";
import { UserContext } from "../../contexts/UserContext";

const Wrapper = props => {
  const userContext = useContext(UserContext);
  const menu = userContext.userData.menu;

  return (
    <>
      <Switch>
        {menu.length > 0 &&
          menu.map((menu, i) => {
            return (
              <ProtectedRoute
                key={i}
                accessGiven={menu.hasAccessTo}
                exact
                path={menu.href}
                component={menu.component}
              />
            );
          })}
        <Route path='*' component={ErrorPage} />
      </Switch>
    </>
  );
};

export default withRouter(Wrapper);
