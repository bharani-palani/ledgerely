import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';

function UploadDropZone(props) {
    const {isDirectory, handleupload} = props;
    const [file, setFile] = useState([])

    const onDrop = (acceptedFiles, rejectedFiles, event) => {
        // const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        if(acceptedFiles.length > 0){
            setFile(acceptedFiles);
            handleupload(acceptedFiles);
        }
      }
      

    return (
        <div className='dropZone text-center'>
            <Dropzone 
                accept="image/*,application/*,video/*"
                maxSize={5 * 1024 * 1024 * 1024} // 5gb
                onDrop={onDrop}
                disabled={!isDirectory}
                // onDragEnter={onDragEnter}
                >
                {({getRootProps, getInputProps, isDragAccept, isDragReject, ...rest }) => {
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
                        <div {...getRootProps()} className={`${classes} title`}>
                            <input {...getInputProps()} />
                            {placeholder}
                        </div>
                        {file.length > 0 && <div className='progressWrapper'>
                            <div className='pl-5 pr-5'>
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