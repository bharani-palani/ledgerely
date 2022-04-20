import React, { useContext } from 'react';
import { LayoutContext } from './layoutDesign';
import { UserContext } from '../../contexts/UserContext';

function Design(props) {
  const layoutContext = useContext(LayoutContext);
  const userContext = useContext(UserContext);

  const getHighlightClass = () => {
    return userContext.userData.theme === 'light'
      ? 'bg-dark text-light'
      : 'bg-light text-dark';
  };

  const recursiveComponent = str => {
    return React.createElement(
      'div',
      {
        className: `border rounded p-2 my-1 ${
          layoutContext.state.selectedNodeId === str.key
            ? `${getHighlightClass()}`
            : ''
        } ${userContext.userData.theme === 'light' ? '' : 'border-secondary'}`,
        style: {},
        onClick: e => {
          e.stopPropagation();
          layoutContext.setState(prevState => ({
            ...prevState,
            selectedNodeId: str.key,
            selectedComponent: str.component,
          }));
        },
      },
      str.children.length > 0 ? (
        str.children.map((c, i) => (
          <React.Fragment key={c.key}>{recursiveComponent(c)}</React.Fragment>
        ))
      ) : (
        <div>
          <h6>{str.title}</h6>
          <div className="mb-1">
            <small className="badge bg-success">{str.component}</small>
          </div>
          {Object.keys(str.props).length > 0 &&
            layoutContext.state.selectedNodeId === str.key && (
              <div className="">
                <small className="badge bg-danger">
                  {JSON.stringify(str.props)}
                </small>
              </div>
            )}
        </div>
      )
    );
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <div className="mt-2 mb-5">
          {recursiveComponent(layoutDetails.state.pageDetails.pageObject)}
        </div>
      )}
    </LayoutContext.Consumer>
  );
}

export default Design;
