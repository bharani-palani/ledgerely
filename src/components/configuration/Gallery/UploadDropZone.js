import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';

function UploadDropZone(props) {
    const [file, setFile] = useState([])

    const onDrop = (acceptedFiles, rejectedFiles, event) => {
        console.log('bbb', event.dataTransfer.files)
        setFile(event.dataTransfer.files)
      }
      

    return (
        <Dropzone 
            accept="image/*,application/pdf,video/*" 
            maxSize={5000000}
            onDrop={onDrop}
            // onDragEnter={onDragEnter}
            >
            {({getRootProps, getInputProps, isDragAccept, isDragReject }) => {
                let classes = 'dropZoneWrapper'
                let placeholder = <p>Drag files here</p>;
                if (isDragAccept) {
                    classes = `${classes} border-success`;
                    placeholder = <p className="upload-success">Drop files now</p>;
                } 
                if (isDragReject) {
                    classes = `${classes} border-danger`;
                    placeholder = <p className="upload-error">Some files are not allowed</p>
                }
                return (
                <>
                    <div {...getRootProps()} className={`${classes} title`}>
                        <input {...getInputProps()} />
                        {placeholder}
                    </div>

                    <div className='text-center title'>
                        {file.length > 0 && <div>{file[0].path}</div>}
                        <div>40%</div>
                    </div>
                    <div className='container-fluid'>
                        <div className="progress">
                            <div className="progress-bar" style={{width: "40%"}}>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </>
                );
            }}
        </Dropzone>
    )
}

export default UploadDropZone;