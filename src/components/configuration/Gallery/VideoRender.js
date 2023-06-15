import React, {useContext, useState} from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const VideoRender = props => {
    const { url, style, className, optionalAttr, view, type } = props;
    const userContext = useContext(UserContext);
    const [openVideoModal, setOpenVideoModal] = useState(false);

    const InlineVideo = () => (
      <ReactPlayer 
        style={style} 
        className={className} 
        {...optionalAttr}
        url={url} 
        width={optionalAttr?.width || 'auto'}
        height={optionalAttr?.height || 'auto'}
        />
    );

    const ThumbnailVideo = () => (
        <span onClick={() => setOpenVideoModal(true)}>
            <i className={`fa fa-${type === "audio" ? "volume-up" : "play"} videoIcon ${userContext.userData.theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'}`}  />
        </span>
    );

    const VideoModal = (props) => (
        <Modal {...props} style={{ zIndex: 9999 }}>
            {/* <Modal.Header closeButton={true}>
                <Modal.Title>{fileName.split("/").pop()}</Modal.Title>
            </Modal.Header> */}
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