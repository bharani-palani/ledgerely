import React, { useContext } from 'react';
import { LayoutContext } from './layoutDesign';
import Cms from './cms';
import Design from './design';

function Proto(props) {
  const layoutContext = useContext(LayoutContext);
  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <div className="">
          {layoutDetails.state.pageDetails &&
            Object.keys(layoutDetails.state.pageDetails).length > 0 && (
              <div>
                <div className="btn-group btn-group-sm py-4">
                  <button
                    className={`btn ${
                      layoutDetails.state.viewMode === 'design'
                        ? 'btn-primary active'
                        : 'btn-outline-primary'
                    }`}
                    onClick={() =>
                      layoutContext.setState(prevState => ({
                        ...prevState,
                        viewMode: 'design',
                      }))
                    }
                  >
                    Design
                  </button>
                  <button
                    className={`btn ${
                      layoutDetails.state.viewMode === 'preview'
                        ? 'btn-primary active'
                        : 'btn-outline-primary'
                    }`}
                    onClick={() =>
                      layoutContext.setState(prevState => ({
                        ...prevState,
                        viewMode: 'preview',
                      }))
                    }
                  >
                    Preview
                  </button>
                </div>
                {layoutDetails.state.viewMode === 'design' && (
                  <div>
                    <Design />
                  </div>
                )}
                {layoutDetails.state.viewMode === 'preview' && (
                  <div className="py-2">
                    {layoutDetails.state.pageDetails &&
                      layoutDetails.state.pageDetails.pageObject && (
                        <Cms
                          structure={layoutDetails.state.pageDetails.pageObject}
                        />
                      )}
                  </div>
                )}
              </div>
            )}
        </div>
      )}
    </LayoutContext.Consumer>
  );
}

export default Proto;
