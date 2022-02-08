import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';

function UploadDropZone(props) {
    const {isDirectory, handleupload, progress} = props;
    const [progFiles, setProgFiles] = useState([])

    const onDrop = (acceptedFiles, rejectedFiles, event) => {
        if(acceptedFiles.length > 0){
            handleupload(acceptedFiles);
        }
    }
    
    const makePercent = () => {
        const perc = Math.ceil(progress.loaded / progress.total * 100);
        return perc;
    }

    useEffect(() => {
        let bprogFiles = [...progFiles];
        bprogFiles.push({[progress.Key]: progress});
        setProgFiles(bprogFiles);
    },[progress])

    useEffect(() => {
        console.table('bbb', progFiles)


    },[progFiles]);

    return (
        <div className='dropZone text-center'>
            <Dropzone 
                accept="image/*,application/*,video/*"
                maxSize={5 * 1024 * 1024 * 1024} // 5gb
                onDrop={onDrop}
                disabled={!isDirectory}
                // onDragEnter={onDragEnter}
                >
                {({getRootProps, getInputProps, isDragAccept, isDragReject }) => {
                    let classes = 'dropZoneWrapper'
                    let placeholder = <div>Drag files here</div>;
                    if (isDragAccept) {
                        classes = `${classes} border-success`;
                        placeholder = <div className="upload-success">Drop & drop files now</div>;
                    } 
                    if (isDragReject) {
                        classes = `${classes} border-danger`;
                        placeholder = <div className="upload-error">File type not allowed</div>
                    }
                    if (!isDirectory) {
                        classes = `${classes} disabled`;
                        placeholder = <div className="upload-disabled"><i className='fa fa-ban' /></div>
                    }
                    return (
                    <>
                        {Object.keys(progress).length < 1 ? 
                        <div {...getRootProps()} className={`${classes} title`}>
                            <input {...getInputProps()} />
                            {placeholder}
                        </div> : 
                        <div className='progressWrapper'>
                            <div>
                                <div className='text-center title gridLabels form-group'>
                                    <div className='text-left pl-5'>{progress.Key && progress.Key.split("/").slice(-1)}</div>
                                    <div className='text-right pr-5'>{makePercent()}%</div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar" style={{width: `${makePercent()}%`}}>
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </>
                    );
                }}
            </Dropzone>
        </div>
    )
}

export default UploadDropZone;