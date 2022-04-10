import React, { useContext } from 'react';
import { LayoutContext } from './layoutDesign';

function Design(props) {
  const layoutContext = useContext(LayoutContext);

  const deleteComponent = id => {
    const details = [{ ...layoutContext.state.pageDetails.pageObject }];
    const newObject = findAndDeleteComponent(details, id)[0];

    layoutContext.setState(prevState => ({
      ...prevState,
      selectedNodeId: '',
      selectedComponent: '',
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
  };

  const findAndDeleteComponent = (arr, selectedKey) => {
    return arr
      .filter(item => item.key !== selectedKey)
      .map(item => {
        item = Object.assign({}, item);
        if (item.children) {
          item.children = findAndDeleteComponent(item.children, selectedKey);
        }
        return item;
      });
  };

  const recursiveComponent = str => {
    return React.createElement(
      'div',
      {
        className: `border border-secondary rounded p-2 my-1 ${
          layoutContext.state.selectedNodeId === str.key
            ? 'bg-secondary bg-gradient'
            : ''
        }`,
        style: { position: 'relative' },
        onClick: e => {
          e.stopPropagation();
          layoutContext.setState(prevState => ({
            ...prevState,
            selectedNodeId: str.key,
            selectedComponent: str.component,
          }));
        },
      },
      str.children.length > 0
        ? str.children.map((c, i) => (
            <React.Fragment key={i}>
              {recursiveComponent(c)}
              <i
                onClick={e => {
                  e.stopPropagation();
                  deleteComponent(c.key);
                }}
                className="fa fa-minus-circle cursor-pointer text-danger"
              />
            </React.Fragment>
          ))
        : str.title
    );
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <div className="" style={{ position: 'relative' }}>
          {recursiveComponent(layoutDetails.state.pageDetails.pageObject)}
        </div>
      )}
    </LayoutContext.Consumer>
  );
}

export default Design;
