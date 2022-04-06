import React from 'react';
import { LayoutContext } from './layoutDesign';

function Design(props) {
  //   const layoutContext = useContext(LayoutContext);
  const recursiveComponent = str => {
    return React.createElement(
      'div',
      {
        className: 'border border-primary rounded p-3 my-1',
        style: { position: 'relative' },
      },
      str.children &&
        (typeof str.children === 'string'
          ? str.component
          : str.children.map((c, i) => (
              <React.Fragment key={i}>
                {recursiveComponent(c)}
                <i className="fa fa-plus-circle cursor-pointer" />
              </React.Fragment>
            )))
    );
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <div className="" style={{ position: 'relative' }}>
          {recursiveComponent(layoutDetails.state.pageDetails.pageObject)}
          <i className="fa fa-plus-circle cursor-pointer" />
        </div>
      )}
    </LayoutContext.Consumer>
  );
}

export default Design;
