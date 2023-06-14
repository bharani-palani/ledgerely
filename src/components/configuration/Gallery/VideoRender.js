import React, {useContext, useState} from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Modal } from 'react-bootstrap';

const VideoRender = props => {
    const { videoRoot, style, className, optionalAttr, view, fileName } = props;
    const userContext = useContext(UserContext);
    const [openVideoModal, setOpenVideoModal] = useState(false);

    const InlineVideo = () => (
      <video style={style} className={className} {...optionalAttr}>
        <source src={videoRoot} type="video/mp4" />
        <source src={videoRoot} type={`video/mov`}></source>
        <source src={videoRoot} type={`video/webm`}></source>
      </video>
    );

    const ThumbnailVideo = () => (
        <i 
            onClick={() => setOpenVideoModal(true)}
            className={`fa fa-play videoIcon ${userContext.userData.theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-dark'}`} 
        />
    );

    const VideoModal = (props) => (
        <Modal {...props} style={{ zIndex: 9999 }}>
            <Modal.Header closeButton>
                <Modal.Title>{fileName.split("/").pop()}</Modal.Title>
            </Modal.Header>
            <Modal.Body closeButton className={`rounded-bottom p-0 ${userContext.userData.theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
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
                backdrop="static"
            />}
            {view && view === "thumbnail" ? <ThumbnailVideo /> : <InlineVideo />}
        </>
    );
};
  

export default VideoRender;