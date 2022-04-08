import React, { useContext } from 'react';
import { LayoutContext } from './layoutDesign';

function Design(props) {
  const layoutContext = useContext(LayoutContext);
  const recursiveComponent = str => {
    return React.createElement(
      'div',
      {
        className: `border border-secondary rounded p-3 my-1 ${
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
            selectedNode: str,
          }));
        },
      },
      str.children &&
        (typeof str.children === 'string'
          ? str.component
          : str.children.map((c, i) => (
              <React.Fragment key={i}>
                {recursiveComponent(c)}
                <i className="fa fa-plus-circle cursor-pointer me-1 text-success" />
                <i className="fa fa-minus-circle cursor-pointer text-danger" />
              </React.Fragment>
            )))
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
