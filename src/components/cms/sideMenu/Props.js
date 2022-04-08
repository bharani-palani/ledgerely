import React from 'react';
import { LayoutContext } from '../layoutDesign';

function Props(props) {
  return (
    <LayoutContext.Consumer>
      {layoutDetails => <div>Props Comp</div>}
    </LayoutContext.Consumer>
  );
}

export default Props;
