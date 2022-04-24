// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Settings from '../configuration/settings';
import AccountPlanner from '../accountPlanner/AccountPlanner';
import LayoutDesign from './layoutDesign';
export const CmsContext = React.createContext();

function Cms(props) {
  const { structure } = props;
  const [state, setState] = useState({});

  const componentMap = {
    'app-settings': Settings,
    'app-moneyPlanner': AccountPlanner,
    'app-layoutDesign': LayoutDesign,
  };

  const recursiveComponent = str => {
    const element = componentMap[str.component];
    if (typeof element !== 'undefined') {
      return (
        <React.Fragment key={str.key}>
          {React.createElement(
            element,
            str.props && Object.keys(str.props).length > 0 ? str.props : {},
            str.children.length > 0
              ? str.children.map((c, i) => (
                  <React.Fragment key={c.key}>
                    {recursiveComponent(c)}
                  </React.Fragment>
                ))
              : str.title
          )}
        </React.Fragment>
      );
    }
  };

  return (
    <CmsContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {recursiveComponent(structure)}
    </CmsContext.Provider>
  );
}

export default withRouter(Cms);
