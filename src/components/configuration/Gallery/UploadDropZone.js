import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import _ from 'lodash';

function UploadDropZone(props) {
    const {isDirectory, handleupload, progress} = props;
    const [progFiles, setProgFiles] = useState([]);

    const onDrop = (acceptedFiles, rejectedFiles, event) => {
        if(acceptedFiles.length > 0){
            handleupload(acceptedFiles);
        }
    }
    
    const makePercent = (p) => {
        const perc = Math.ceil(p.loaded / p.total * 100);
        return perc;
    }

    useEffect(() => {
        if(Object.keys(progress).length > 0){
            let bprogFiles = [...progFiles];
            bprogFiles.push(progress);
            let files = bprogFiles.reverse().filter((v,i,a)=>a.findIndex(t=>(t.Key===v.Key))===i && v.total !== v.loaded);
            files =  _.sortBy(files, o => o.Key);
            setProgFiles(files);
        }
    },[progress])

    // useEffect(() => {
    //     if(progFiles.length > 0){
    //         setProgFiles(progFiles.reverse().filter((v,i,a)=>a.findIndex(t=>(t.Key===v.Key))===i));
    //     }
    // },[progFiles]);

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
                        <div {...getRootProps()} className={`${classes} title`}>
                            <input {...getInputProps()} />
                            {placeholder}
                        </div>
                        {progFiles.length > 0 && <div className='progressWrapper'>
                            {progFiles.map(prog => 
                            <div>
                                <div className='text-center title gridLabels form-group'>
                                    <div className='text-left pl-5'>{prog.Key.split("/").slice(-1)}</div>
                                    <div className='text-right pr-5'>{makePercent(prog)}%</div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar" style={{width: `${makePercent(prog)}%`}}>
                                        &nbsp;
                                    </div>
                                </div>
                            </div>)}
                        </div>}
                    </>
                    );
                }}
            </Dropzone>
        </div>
    )
}

export default UploadDropZone;