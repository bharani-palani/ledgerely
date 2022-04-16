import React, { useContext } from 'react';
import Tree from 'rc-tree';
import { LayoutContext } from './layoutDesign';

function PageTree(props) {
  const layoutContext = useContext(LayoutContext);

  const onSelect = (selectedKeys, e) => {
    layoutContext.setState(prevState => ({
      ...prevState,
      selectedNodeId: e.node.key,
      selectedComponent: e.node.component,
    }));
  };

  const onDrop = info => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };

    const data = [{ ...layoutContext.state.pageDetails.pageObject }];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (dropPosition === 0) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    layoutContext.setState(prevState => ({
      ...prevState,
      selectedNodeId: '',
      selectedComponent: '',
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: data[0],
      },
    }));
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <div>
          {layoutDetails.state.pageDetails &&
            Object.keys(layoutDetails.state.pageDetails).length > 0 && (
              <Tree
                treeData={[{ ...layoutDetails.state.pageDetails.pageObject }]}
                showLine={true}
                checkable={false}
                selectable={true}
                onSelect={onSelect}
                selectedKeys={[layoutDetails.state.selectedNodeId]}
                defaultExpandAll={true}
                key={layoutDetails.state.selectedNodeId}
                style={{
                  width: '300px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                showIcon={false}
                draggable={true}
                onDrop={onDrop}
              />
            )}
        </div>
      )}
    </LayoutContext.Consumer>
  );
}

export default PageTree;
