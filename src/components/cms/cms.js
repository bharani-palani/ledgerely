// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Settings from '../wrapper/settings';
import AccountPlanner from '../accountPlanner/AccountPlanner';
import LayoutDesign from './layoutDesign';
import * as ReactBootstrap from 'react-bootstrap';
import * as BuiltInComponents from './BuiltInComponents';
export const CmsContext = React.createContext();

function Cms(props) {
  const { structure } = props;
  const componentMap = {
    'app-settings': Settings,
    'app-moneyPlanner': AccountPlanner,
    'app-layoutDesign': LayoutDesign,
    'app-bootstrap': ReactBootstrap,
    div: BuiltInComponents.Div,
  };

  const getCompopnent = string => {
    const pieces = string.split('-');
    if (pieces.length > 2) {
      return componentMap[`${pieces[0]}-${pieces[1]}`][pieces[2]];
      // for bootstrap. Ex: app-bootstrap-Alert renders ReactBootstrap.Alert
    } else {
      return componentMap[string];
      // for builtin. Ex: div renders BuiltInComponents.Div
    }
  };

  const recursiveComponent = str => {
    const element = getCompopnent(str.component);
    if (typeof element !== 'undefined') {
      return React.createElement(
        element,
        str.props && Object.keys(str.props).length > 0 ? str.props : {},
        str.children &&
          (typeof str.children === 'string'
            ? str.children
            : str.children.map((c, i) => (
                <React.Fragment key={i}>{recursiveComponent(c)}</React.Fragment>
              )))
      );
    }
  };

  return (
    <CmsContext.Provider>{recursiveComponent(structure)}</CmsContext.Provider>
  );
}

export default withRouter(Cms);
