import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';

function UploadDropZone(props) {
    const [file, setFile] = useState([])

    const onDrop = (acceptedFiles, rejectedFiles, event) => {
        const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        setFile(fileList)
      }
      

    return (
        <div className='dropZone text-center'>
            <Dropzone 
                accept="image/*,application/pdf,video/*" 
                maxSize={5 * 1024 * 1024 * 1024} // 5gb
                onDrop={onDrop}
                // onDragEnter={onDragEnter}
                >
                {({getRootProps, getInputProps, isDragAccept, isDragReject }) => {
                    let classes = 'dropZoneWrapper'
                    let placeholder = <p>Drag files here</p>;
                    if (isDragAccept) {
                        classes = `${classes} border-success`;
                        placeholder = <p className="upload-success">Drop & drop files now</p>;
                    } 
                    if (isDragReject) {
                        classes = `${classes} border-danger`;
                        placeholder = <p className="upload-error">File type not allowed</p>
                    }
                    return (
                    <>
                        <div {...getRootProps()} className={`${classes} title`}>
                            <input {...getInputProps()} />
                            {placeholder}
                        </div>
                        {file.length > 0 && <div className='progressWrapper'>
                            <div className='container-fluid'>
                                <div className='text-center title gridLabels form-group'>
                                    <div className='text-left'>{file[0].path}</div>
                                    <div className='text-right'>40%</div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar" style={{width: "40%"}}>
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </>
                    );
                }}
            </Dropzone>
        </div>
    )
}

export default UploadDropZone;