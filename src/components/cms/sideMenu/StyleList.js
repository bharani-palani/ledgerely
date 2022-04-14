import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../layoutDesign';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function StyleList() {
  const layoutContext = useContext(LayoutContext);
  const [list, setList] = useState([]);
  const [formList, setFormList] = useState([]);
  const [saveState, setSaveState] = useState(true);
  const [newStyle, setNewStyle] = useState({
    key: '',
    value: '',
  });

  let r = {};
  const findAndGetComponentStyle = (key, node) => {
    if (node.key === key) {
      r = node.props.style ? node.props.style : {};
    }
    node.children.forEach(ch => {
      findAndGetComponentStyle(key, ch);
    });
    return r;
  };

  useEffect(() => {
    if (layoutContext.state.pageDetails && layoutContext.state.selectedNodeId) {
      const details = layoutContext.state.pageDetails.pageObject;
      const nodeId = layoutContext.state.selectedNodeId;
      const selectedStyle = findAndGetComponentStyle(nodeId, { ...details });
      const restStyle = Object.entries(selectedStyle);
      setList([]);
      setTimeout(() => {
        setList(restStyle);
        const form = restStyle.map(f => ({
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

  const onChangeStyle = (oldValue, newValue, point) => {
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

  const onUpdateStyleAction = () => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const nodeId = layoutContext.state.selectedNodeId;
    const newObject = findAndUpdateStyle(details, nodeId, formList)[0];

    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
    setSaveState(true);
  };

  const findAndUpdateStyle = (arr, selectedKey, updatedFormList) => {
    return arr.map(item => {
      if (item.key === selectedKey) {
        const keyValues = updatedFormList.map(u => [u.newKey, u.value]);
        item.props.style = Object.fromEntries(keyValues);
      }
      item.children = findAndUpdateStyle(
        item.children,
        selectedKey,
        updatedFormList
      );
      return item;
    });
  };

  const deleteStyle = key => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const nodeId = layoutContext.state.selectedNodeId;
    const newObject = findAndDeleteStyle(details, nodeId, key)[0];

    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
  };

  const findAndDeleteStyle = (arr, selectedKey, key) => {
    return arr.map(item => {
      if (item.key === selectedKey) {
        const keyValues = Object.entries(item.props.style).filter(
          f => f[0] !== key
        );
        item.props.style = Object.fromEntries(keyValues);
      }
      if (item.children) {
        item.children = findAndDeleteStyle(item.children, selectedKey, key);
      }
      return item;
    });
  };

  const saveStyle = nodeId => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const newObject = findAndAddStyle(details, nodeId, newStyle)[0];

    layoutContext.setState(prevState => ({
      ...prevState,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
    setNewStyle({
      key: '',
      value: '',
    });
  };

  const findAndAddStyle = (arr, selectedKey, formData) => {
    return arr.map(item => {
      if (item.key === selectedKey) {
        const keyValues = [
          ...Object.entries(item.props.style || {}),
          [formData.key, formData.value],
        ];
        item.props.style = Object.fromEntries(keyValues);
      }
      if (item.children) {
        item.children = findAndAddStyle(item.children, selectedKey, formData);
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
                placeholder="Add props key"
                value={newStyle.key}
                onChange={e =>
                  setNewStyle(prevState => ({
                    ...prevState,
                    key: e.target.value,
                  }))
                }
              />
              <FormControl
                placeholder="Add props value"
                value={newStyle.value}
                onChange={e =>
                  setNewStyle(prevState => ({
                    ...prevState,
                    value: e.target.value,
                  }))
                }
              />
              <Button
                variant="primary"
                disabled={!(newStyle.key && newStyle.value)}
                onClick={() => saveStyle(layoutDetails.state.selectedNodeId)}
              >
                <i className="fa fa-plus" />
              </Button>
            </InputGroup>
            {list.length > 0 && (
              <div className="py-1">
                <small>Modify style</small>
              </div>
            )}
            {list.length > 0 &&
              list.map((l, i) => (
                <InputGroup key={i} size="sm" className="mb-1">
                  <InputGroup.Text>{'{'}</InputGroup.Text>
                  <FormControl
                    placeholder="Add props key"
                    defaultValue={l[0]}
                    onChange={e => onChangeStyle(l[0], e.target.value, 'key')}
                  />
                  <InputGroup.Text>{':'}</InputGroup.Text>
                  <FormControl
                    placeholder="Add props value"
                    defaultValue={l[1]}
                    onChange={e => onChangeStyle(l[0], e.target.value, 'value')}
                  />
                  <InputGroup.Text>{'}'}</InputGroup.Text>
                  <Button variant="danger" onClick={() => deleteStyle(l[0])}>
                    <i className="fa fa-times" />
                  </Button>
                </InputGroup>
              ))}
            {list.length > 0 && (
              <div className="text-end my-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onUpdateStyleAction}
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

export default StyleList;
