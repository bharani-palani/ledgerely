import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../security/protectedRoute";
import { menus } from "../../mockData/menuData";
import About from "./about";
import ErrorPage from "./errorpage";
import UnAuthPage from "./UnAuthPage";

class Wrapper extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={About} />
        {menus.map((menu, i) => {
          return !menu.showOnlyIfSuperUser ? (
            <Route key={i} exact path={menu.href} component={menu.component} />
          ) : (
            <ProtectedRoute
              key={i}
              exact
              path={menu.href}
              component={menu.component}
            />
          );
        })}
        <Route exact path="/unAuth" component={UnAuthPage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    );
  }
}

export default withRouter(Wrapper);
