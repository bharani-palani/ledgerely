import React, { useState} from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const VideoRender = (props) => {
    const { url, style, className, optionalAttr, view, type, ...rest } = props;
    const [openVideoModal, setOpenVideoModal] = useState(false);

    const InlineVideo = () => (
      <ReactPlayer 
        style={style} 
        className={className} 
        {...optionalAttr}
        url={url} 
        width={optionalAttr?.width || 'auto'}
        height={optionalAttr?.height || 'auto'}
        {...rest}
        />
    );

    const ThumbnailVideo = () => (
        <span onClick={() => setOpenVideoModal(true)}>
            <i className={`fa fa-${type === "audio" ? "volume-up" : "play"} mediaIcon bg-secondary text-light`}  />
        </span>
    );

    const VideoModal = (props) => (
        <Modal {...props} style={{ zIndex: 9999 }}>
            <Modal.Body className={`p-0`}>
                <InlineVideo />
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            {openVideoModal && <VideoModal
                className="accountPlanner"
                show={openVideoModal}
                onHide={() => setOpenVideoModal(false)}
                centered
                size="lg"
            />}
            {view && view === "thumbnail" ? <ThumbnailVideo /> : <InlineVideo />}
        </>
    );
};
  

export default VideoRender;