import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../layoutDesign';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function PropsList() {
  const layoutContext = useContext(LayoutContext);
  const [list, setList] = useState([]);

  let r = {};
  const findAndGetComponentProps = (key, node) => {
    if (node.key === key) {
      r = node.props;
    }
    node.children.forEach(ch => {
      findAndGetComponentProps(key, ch);
    });
    return r;
  };

  useEffect(() => {
    if (layoutContext.state.pageDetails && layoutContext.state.selectedNodeId) {
      const details = layoutContext.state.pageDetails.pageObject;
      const nodeId = layoutContext.state.selectedNodeId;
      const selectedProps = findAndGetComponentProps(nodeId, { ...details });
      // eslint-disable-next-line no-unused-vars
      let { style, ...restProps } = selectedProps;
      restProps = Object.entries(restProps);
      setList(restProps);
    } else {
      setList([]);
    }
  }, [layoutContext.state.pageDetails, layoutContext.state.selectedNodeId]);

  useEffect(() => {
    console.log('bbb', list);
  }, [list]);

  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <div>
          <InputGroup size="sm">
            <FormControl placeholder="Add props key" />
            <FormControl placeholder="Add props value" />
            {/* todo: validation - existing prop cant be added*/}
            <Button variant="primary">
              <i className="fa fa-plus" />
            </Button>
          </InputGroup>
          {list.length > 0 && (
            <div className="py-1">
              <small>Modify Props</small>
            </div>
          )}
          {list.length > 0 &&
            list.map((l, i) => (
              <InputGroup key={i} size="sm" className="mb-1">
                <InputGroup.Text>{'{'}</InputGroup.Text>
                <FormControl placeholder="Add props key" value={l[0]} />
                <InputGroup.Text>{':'}</InputGroup.Text>
                <FormControl placeholder="Add props key" value={l[1]} />
                <InputGroup.Text>{'}'}</InputGroup.Text>
              </InputGroup>
            ))}
        </div>
      )}
    </LayoutContext.Consumer>
  );
}

export default PropsList;
