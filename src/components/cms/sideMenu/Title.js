import React, { useState, useContext, useEffect } from 'react';
import { LayoutContext } from '../layoutDesign';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function Title(props) {
  const layoutContext = useContext(LayoutContext);
  const [newTitle, setNewTitle] = useState('');

  let r = '';
  const findAndGetComponentTitle = (key, node) => {
    if (node.key === key) {
      r = node.title;
    }
    node.children.forEach(ch => {
      findAndGetComponentTitle(key, ch);
    });
    return r;
  };

  useEffect(() => {
    if (layoutContext.state.pageDetails && layoutContext.state.selectedNodeId) {
      const details = layoutContext.state.pageDetails.pageObject;
      const nodeId = layoutContext.state.selectedNodeId;
      const selectedTitle = findAndGetComponentTitle(nodeId, { ...details });
      setNewTitle(selectedTitle);
    } else {
      setNewTitle('');
    }
  }, [layoutContext.state.pageDetails, layoutContext.state.selectedNodeId]);

  const saveTitle = nodeId => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const newObject = findAndAddUpdateTitle(details, nodeId, newTitle)[0];
    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
    setNewTitle('');
  };

  const findAndAddUpdateTitle = (arr, selectedKey, title) => {
    return arr.map(item => {
      if (item.key === selectedKey) {
        item.title = title;
      }
      if (item.children) {
        item.children = findAndAddUpdateTitle(
          item.children,
          selectedKey,
          title
        );
      }
      return item;
    });
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails =>
        layoutDetails.state.selectedNodeId ? (
          <div>
            <InputGroup size="sm">
              <FormControl
                as="textarea"
                rows={1}
                placeholder="Add a title for your component"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <Button
                variant="primary"
                disabled={!newTitle}
                onClick={() => saveTitle(layoutDetails.state.selectedNodeId)}
              >
                <i className="fa fa-plus" />
              </Button>
            </InputGroup>
          </div>
        ) : (
          <div className="text-muted small px-1">Please select a component</div>
        )
      }
    </LayoutContext.Consumer>
  );
}

export default Title;
