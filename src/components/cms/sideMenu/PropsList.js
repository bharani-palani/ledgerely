import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../layoutDesign';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function PropsList() {
  const layoutContext = useContext(LayoutContext);
  const [list, setList] = useState([]);
  const [formList, setFormList] = useState([]);
  const [saveState, setSaveState] = useState(true);
  const [newProps, setNewProps] = useState({
    key: '',
    value: '',
  });

  let r = {};
  const findAndGetComponentProps = (key, node) => {
    if (node.key === key) {
      r = node.props;
    }
    Array.isArray(node.children) &&
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
      // Note: we are removing style from props and focus on other prop objects
      let restProps = (({ style, ...rest }) => (style, rest))(selectedProps);
      restProps = Object.entries(restProps);
      setList([]);
      setTimeout(() => {
        setList(restProps);
        const form = restProps.map(f => ({
          key: f[0],
          newKey: f[0],
          value: f[1],
        }));
        setFormList(form);
      }, 10);
    } else {
      setList([]);
      setFormList([]);
    }
  }, [layoutContext.state.pageDetails, layoutContext.state.selectedNodeId]);

  const onChangeProps = (oldValue, newValue, point) => {
    let bFormList = [...formList];
    bFormList = bFormList.map(b => {
      if (point === 'key' && b.key === oldValue) {
        b.newKey = newValue;
      }
      if (point === 'value' && b.key === oldValue) {
        b.value = newValue;
      }
      return b;
    });
    setSaveState(false);
    setFormList(bFormList);
  };

  const onUpdatePropAction = () => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const nodeId = layoutContext.state.selectedNodeId;
    const newObject = findAndUpdateProps(details, nodeId, formList)[0];

    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
    setSaveState(true);
  };

  const findAndUpdateProps = (arr, selectedKey, updatedFormList) => {
    return arr.map(item => {
      if (item.key === selectedKey) {
        const { style } = item.props;
        const keyValues = updatedFormList.map(u => [u.newKey, u.value]);
        item.props = {
          ...Object.fromEntries(keyValues),
          ...(style && { style }),
        };
      }
      item.children = findAndUpdateProps(
        item.children,
        selectedKey,
        updatedFormList
      );
      return item;
    });
  };

  const deleteProp = key => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const nodeId = layoutContext.state.selectedNodeId;
    const newObject = findAndDeleteProp(details, nodeId, key)[0];

    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
  };

  const findAndDeleteProp = (arr, selectedKey, key) => {
    return arr.map(item => {
      if (item.key === selectedKey) {
        const keyValues = Object.entries(item.props).filter(f => f[0] !== key);
        item.props = Object.fromEntries(keyValues);
      }
      if (item.children) {
        item.children = findAndDeleteProp(item.children, selectedKey, key);
      }
      return item;
    });
  };

  const saveProps = nodeId => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const newObject = findAndAddProp(details, nodeId, newProps)[0];

    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
    setNewProps({
      key: '',
      value: '',
    });
  };

  const findAndAddProp = (arr, selectedKey, formData) => {
    return arr.map(item => {
      if (item.key === selectedKey) {
        const keyValues = [
          ...Object.entries(item.props),
          [formData.key, formData.value],
        ];
        item.props = Object.fromEntries(keyValues);
      }
      if (item.children) {
        item.children = findAndAddProp(item.children, selectedKey, formData);
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
                placeholder="Key"
                value={newProps.key}
                onChange={e =>
                  setNewProps(prevState => ({
                    ...prevState,
                    key: e.target.value,
                  }))
                }
              />
              <FormControl
                placeholder="Value"
                value={newProps.value}
                onChange={e =>
                  setNewProps(prevState => ({
                    ...prevState,
                    value: e.target.value,
                  }))
                }
              />
              <Button
                variant="primary"
                disabled={!(newProps.key && newProps.value)}
                onClick={() => saveProps(layoutDetails.state.selectedNodeId)}
              >
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
                  <FormControl
                    placeholder="Add props key"
                    defaultValue={l[0]}
                    onChange={e => onChangeProps(l[0], e.target.value, 'key')}
                  />
                  <InputGroup.Text>{':'}</InputGroup.Text>
                  <FormControl
                    placeholder="Add props value"
                    defaultValue={l[1]}
                    onChange={e => onChangeProps(l[0], e.target.value, 'value')}
                  />
                  <InputGroup.Text>{'}'}</InputGroup.Text>
                  <Button variant="danger" onClick={() => deleteProp(l[0])}>
                    <i className="fa fa-times" />
                  </Button>
                </InputGroup>
              ))}
            {list.length > 0 && (
              <div className="text-end my-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onUpdatePropAction}
                  disabled={saveState}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted small px-1">Please select a component</div>
        )
      }
    </LayoutContext.Consumer>
  );
}

export default PropsList;
