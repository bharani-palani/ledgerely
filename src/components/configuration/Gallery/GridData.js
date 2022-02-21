import React, { useState, useContext, useEffect } from 'react'
import moment from "moment";
import Thumbnail from "./Thumbnail";
import { UserContext } from "../../../contexts/UserContext";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function GridData(props) {
    const {data, directory, selectedId, onCreateFolder, onDeleteFolder, onRename, isDirectory, ...rest } = props;
    const [view, setView] = useState("table");
    const [newFileFolder, setNewFileFolder] = useState("");
    const [createFolder, setCreateFolder] = useState(false);
    const [rename, setRename] = useState(false);
    const [renameObj, setRenameObj] = useState({});
    const userContext = useContext(UserContext);

    const getFileSize = (bytes, decimals=2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;        
    }

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }

    const handleCopyClick = (copyText) => {
        copyTextToClipboard(copyText)
          .then(() => {
            userContext.renderToast({ message: `${copyText} copied to clipboard..` })
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const handleCreateFolder = () => {
        if(newFileFolder) {
            onCreateFolder(selectedId, newFileFolder);
            setCreateFolder(false)
            setNewFileFolder("")
        } else {
            userContext.renderToast({
                type: "error",
                icon: "fa fa-times-circle",
                message: "Folder name can`t be empty!"
            });
        }
    }

    const handleRename = () => {
        const first = renameObj.path ? `${renameObj.path}/` : "";
        if(newFileFolder) {
            const obj = {
                oldKey: `${first}${renameObj.value}`,
                newKey: `${first}${newFileFolder}`
            }
            onRename(obj, selectedId, isDirectory);
        } else {
            userContext.renderToast({
                type: "error",
                icon: "fa fa-times-circle",
                message: "field can`t be empty!"
            });
        }

    }

    const reset = () => {
        setCreateFolder(false);
        setRename(false)
    }

    useEffect(() => {
        reset();
        let bDirec = directory;
        bDirec = bDirec.split("/");
        const path = bDirec.filter((_,i) => i < (isDirectory ? bDirec.length - 2 : bDirec.length - 1)).join("/");
        const value = isDirectory ?  bDirec[bDirec.length - 2] : bDirec[bDirec.length - 1];
        setRenameObj({
            path: path,
            value: value
        });
    },[directory, isDirectory])

    const toggleCreateRename = () => {
        return createFolder ? directory : renameObj.path
    }

    const renderCloneTooltip = (props, content) => (
        <Tooltip id="button-tooltip-1" className="in show" {...rest}>
          {content}
        </Tooltip>
      );
    
    return (
        <div className='tableGrid'>
            <div className='headerGrid'>
                {(!createFolder && !rename) && (
                    <div className='dirLabel'>
                        {directory && <><i className='fa fa-folder-open pr-5' /><span>{directory}</span></>}
                    </div>
                )}
                {(createFolder || rename) && <div className="input-group input-group-sm">
                    <OverlayTrigger
                        placement="top"
                        overlay={renderCloneTooltip(props, toggleCreateRename())}
                        triggerType="hover"
                    >
                        <span className="input-group-addon">
                            <i className='fa fa-folder-open pr-5' /> {toggleCreateRename()}
                        </span>
                    </OverlayTrigger>

                    <input 
                        type="text" autoFocus 
                        onFocus={e => setNewFileFolder(e.target.value)}
                        placeholder={createFolder ? "New folder" : "Rename file or folder"} 
                        defaultValue={rename ?  renameObj.value : ""}
                        onChange={e => setNewFileFolder(e.target.value)} className="form-control" 
                    />
                    <span className="input-group-btn">
                        {createFolder && 
                            <>
                                <button className="btn btn-bni" onClick={() => handleCreateFolder()} type="button"><i className='fa fa-upload' /></button>
                                <button className="btn btn-bni" onClick={() => reset()} type="button"><i className="fa fa-undo" /></button>
                            </>
                        }
                        {rename &&
                            <>
                                <button className="btn btn-bni" onClick={() => handleRename()} type="button"><i className='fa fa-font' /></button>
                                <button className="btn btn-bni" onClick={() => reset()} type="button"><i className="fa fa-undo" /></button>
                            </>
                        }
                    </span>
                </div>}
                <div>
                    <div className='text-right'>
                        {isDirectory && !createFolder && <i className={`fa fa-plus viewButtons`} onClick={() => {setRename(false); setCreateFolder(true)}} />}
                        {data.length > 0 && !rename && <i className="fa fa-font viewButtons" onClick={() => {setCreateFolder(false) ;setRename(true)}} />}
                        {data.length > 0 && <i className="fa fa-trash viewButtons" onClick={() => onDeleteFolder(selectedId)} />}
                        <i className='fa fa-list viewButtons' onClick={() => setView("list")} />
                        <i className='fa fa-table viewButtons' onClick={() => setView("table")} />
                    </div>
                </div>
            </div>
            <div className="gridWrapper">
                <div className={`responsive-gallery-grid ${view}-grid`}>
                    {view === "list" && data.length > 0 &&
                        <div className={`child ${view}-child`}>
                            <div className='title p-5'>File</div>
                            <div className='title p-5'>Size</div>
                            <div className='title p-5'>Last modified</div>
                        </div>
                    }
                    {data.length > 0 && data.map((d,i) => (
                        <React.Fragment key={i}>
                            {d.size > 0 && <div className={`child ${view}-child`}>
                                <div className={`${view === "table" ? "text-center" : ""}`}>
                                    <div className='copyable'>
                                        <i onClick={() => handleCopyClick(d.label)} title={`Copy ${d.label} to clipboard`} className='fa fa-copy copy' />
                                        <span className={`ellipsis ${view === "table" ? "text-center" : ""}`}>{d.label.split("/").slice(-1)}</span>
                                    </div>
                                </div>
                                {view === "table" &&
                                    <Thumbnail object={d} />
                                }
                                {view === "table" ? (<div className='copyable info'>
                                    <div className="text-center">
                                        {`${getFileSize(d.size)}`}
                                    </div>
                                    <div className="text-center">
                                        {moment(d.lastModified).format("MMM Do YYYY, h:mm:ss a")}
                                    </div>
                                </div>) : (
                                    <>
                                        <div className="p-5">
                                            {`${getFileSize(d.size)}`}
                                        </div>
                                        <div className="p-5">
                                            {moment(d.lastModified).format("MMM Do YYYY, h:mm:ss a")}
                                        </div>                                
                                    </>
                                )}
                            </div>}
                        </React.Fragment>
                    ))}
                </div>
                {directory === "" && <div className="jumbotron">
                    <i className="fa fa-file fa-3x" />
                    <h5>Select a file or folder to view them..</h5>
                </div>
}
            </div>
        </div>
    )
}

export default GridData;