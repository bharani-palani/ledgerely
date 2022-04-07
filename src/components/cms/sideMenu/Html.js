import React from 'react';
import { Button } from 'react-bootstrap';
import { LayoutContext } from './layoutDesign';

function Html(props) {
  //   const layoutContext = useContext(LayoutContext);
  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <Button variant={layoutDetails.state.sideMenuButtonType}>Div</Button>
      )}
    </LayoutContext.Consumer>
  );
}

export default Html;
