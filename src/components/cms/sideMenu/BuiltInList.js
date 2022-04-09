/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { LayoutContext } from '../layoutDesign';
import * as BuiltInComponents from '../BuiltInComponents';
import { v4 as uuidv4 } from 'uuid';

function BuiltInList(props) {
  const layoutContext = useContext(LayoutContext);
  const builtInList = Object.keys(BuiltInComponents);

  const addElementToNode = (key, details, element) => {
    const sample = {
      key: uuidv4(),
      props: {},
      children: [],
      component: element,
      title: `Hello ${element}`,
    };

    const newObject = findAndAddComponent(key, { ...details }, sample);
    layoutContext.setState(prevState => ({
      ...prevState,
      selectedNodeId: sample.key,
      selectedComponent: sample.component,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
  };

  const findAndAddComponent = (key, node, insertObj) => {
    if (node.key === key) {
      node.children.push(insertObj);
    }
    node.children.forEach(ch => {
      findAndAddComponent(key, ch, insertObj);
    });
    return node;
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails =>
        builtInList.map((list, i) => (
          <Button
            key={i}
            disabled={!layoutDetails.state.selectedNodeId}
            size="sm"
            className="badge bg-secondary border-0 me-1"
            onClick={() =>
              addElementToNode(
                layoutDetails.state.selectedNodeId,
                layoutDetails.state.pageDetails.pageObject,
                list
              )
            }
          >
            {list}
          </Button>
        ))
      }
    </LayoutContext.Consumer>
  );
}

export default BuiltInList;
