/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from 'react-bootstrap';
import { LayoutContext } from '../layoutDesign';
import * as BuiltIn from '../BuiltInComponents';

function BuiltInList(props) {
  const builtInList = Object.keys(BuiltIn);

  const addElementToNode = node => {
    console.log('bbb', node);
    // const nodeType = typeof node.children
  };

  const find = (node, key) => {
    if (node.key === key) {
      return [];
    }
    if (Array.isArray(node.children)) {
      for (const treeNode of node.children) {
        const childResult = find(treeNode, key);
        if (Array.isArray(childResult)) {
          return [treeNode].concat(childResult);
        }
      }
    }
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails =>
        builtInList.map((list, i) => (
          <Button
            key={i}
            disabled={!layoutDetails.state.selectedNode}
            size="sm"
            className="badge bg-secondary border-0 me-1"
            onClick={() => addElementToNode(layoutDetails.state.selectedNode)}
          >
            {list}
          </Button>
        ))
      }
    </LayoutContext.Consumer>
  );
}

export default BuiltInList;
