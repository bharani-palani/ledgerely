import React, {useContext} from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ProtectedRoute } from "../../security/protectedRoute";
import ErrorPage from "./errorpage";
import { UserContext } from "../../contexts/UserContext";
import Cms from "../cms/cms";

const Wrapper = (props) => {
  const {menu} = props;
  const userContext = useContext(UserContext);
    return (
      <Switch>
        {menu.length > 0 && menu.map((menu, i) => {
          return menu.hasAccessTo.includes(userContext.userData.type) && (
            <ProtectedRoute
              accessGiven={menu.hasAccessTo}
              key={i}
              exact
              path={menu.href}
              component={Cms}
            />
          );
        })}
        <Route path="*" component={ErrorPage} />
      </Switch>
    );
  }

export default withRouter(Wrapper);
