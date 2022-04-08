import React from 'react';
import { Button } from 'react-bootstrap';
import { LayoutContext } from '../layoutDesign';
import * as ReactBootstrap from 'react-bootstrap';

function BootstrapList(props) {
  const bootstrapList = Object.keys(ReactBootstrap);

  const addElementToNode = tagName => {
    alert(tagName);
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails =>
        bootstrapList.map((list, i) => (
          <Button
            key={i}
            disabled={!layoutDetails.state.selectedNode}
            size="sm"
            className="badge bg-secondary border-0 me-1"
            onClick={() => addElementToNode(list)}
          >
            {list}
          </Button>
        ))
      }
    </LayoutContext.Consumer>
  );
}

export default BootstrapList;
