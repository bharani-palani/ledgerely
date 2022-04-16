import React, { useContext } from 'react';
import { LayoutContext } from './layoutDesign';
import Cms from './cms';
import Design from './design';
import Tree from './PageTree';

function Proto(props) {
  const layoutContext = useContext(LayoutContext);
  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <div className="">
          {layoutDetails.state.pageDetails &&
            Object.keys(layoutDetails.state.pageDetails).length > 0 && (
              <div className="d-grid">
                <div className="btn-group btn-group-sm" style={{ zIndex: 0 }}>
                  <button
                    className={`btn btn-primary ${
                      layoutDetails.state.viewMode === 'tree' ? 'active' : ''
                    }`}
                    onClick={() =>
                      layoutContext.setState(prevState => ({
                        ...prevState,
                        viewMode: 'tree',
                      }))
                    }
                  >
                    Tree
                  </button>
                  <button
                    className={`btn btn-primary ${
                      layoutDetails.state.viewMode === 'design' ? 'active' : ''
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
                    className={`btn btn-primary ${
                      layoutDetails.state.viewMode === 'preview' ? 'active' : ''
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
                {layoutDetails.state.viewMode === 'tree' && (
                  <div>
                    <Tree />
                  </div>
                )}
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
