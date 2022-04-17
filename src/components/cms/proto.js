import React, { useContext, useState } from 'react';
import { LayoutContext } from './layoutDesign';
import Cms from './cms';
import Design from './design';
import Tree from './PageTree';
import { Modal } from 'react-bootstrap';

function Proto(props) {
  const layoutContext = useContext(LayoutContext);
  const [fullScreen, setFullScreen] = useState(false);

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
                {layoutDetails.state.viewMode === 'tree' && <Tree />}
                {layoutDetails.state.viewMode === 'design' && <Design />}
                {layoutDetails.state.viewMode === 'preview' && (
                  <div className="my-2 position-relative">
                    <i
                      onClick={() => setFullScreen(true)}
                      className="fa fa-arrows-alt position-absolute top-0 end-0 p-1 cursor-pointer"
                    />
                    <Modal
                      show={fullScreen}
                      fullscreen={true}
                      onHide={() => setFullScreen(false)}
                    >
                      <Modal.Body className="position-relative">
                        <i
                          onClick={() => setFullScreen(false)}
                          className="fa fa-times-circle position-fixed top-0 end-0 cursor-pointer m-2 fs-2"
                        />
                        <Cms
                          structure={layoutDetails.state.pageDetails.pageObject}
                        />
                      </Modal.Body>
                    </Modal>
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
