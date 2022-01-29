import React, { useState, useContext } from 'react'
import moment from "moment";
import Thumbnail from "./Thumbnail";
import { UserContext } from "../../../contexts/UserContext";

function GridData(props) {
    const {data, directory, selectedId, onCreateFolder, isDirectory } = props;
    const [view, setView] = useState("table");
    const [newFolder, setNewFolder] = useState("");
    const [createFolder, setCreateFolder] = useState(false);
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
            userContext.renderToast({ message: `Copied to clipboard` })
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const handleCreateFolder = () => {
        if(newFolder) {
            onCreateFolder(selectedId, newFolder);
            setCreateFolder(false)
            setNewFolder("")
        } else {
            userContext.renderToast({
                type: "error",
                icon: "fa fa-times-circle",
                message: "Folder name can`t be empty!"
            });
        }
    }

    return (
        <div className='tableGrid'>
            <div className='headerGrid'>
                {!createFolder ? (
                    <div><i className='fa fa-folder-open' /> {directory}</div>
                ) : (
                <div className="input-group input-group-sm">
                    <span className="input-group-addon"><i className='fa fa-folder-open' /> {directory}</span>
                    <input type="text" placeholder='Folder name' onChange={e => setNewFolder(e.target.value)} className="form-control" />
                    <span className="input-group-btn">
                        <button className="btn btn-bni" onClick={() => handleCreateFolder()} type="button"><i className='fa fa-plus' /></button>
                    </span>
                </div>)}
                <div>
                    <div className='text-right'>
                        {isDirectory && <i className={`fa fa-${createFolder ? "undo" : "plus"} viewButtons`} onClick={() => setCreateFolder(!createFolder)} />}
                        <i className='fa fa-list viewButtons' onClick={() => setView("list")} />
                        <i className='fa fa-table viewButtons' onClick={() => setView("table")} />
                    </div>
                </div>
            </div>
            <div className="gridWrapper">
                <div className={`responsive-gallery-grid ${view}-grid`}>
                    {view === "list" && 
                        <div className={`child ${view}-child`}>
                            <div className='title p-5'>File</div>
                            <div className='title p-5'>Size</div>
                            <div className='title p-5'>Last modified</div>
                        </div>
                    }
                    {data.map(d => (
                        <>
                            {d.size > 0 && <div className={`child ${view}-child`}>
                                <div className={`${view === "table" ? "text-center" : ""}`}>
                                    <div className='copyable'>
                                        <i onClick={() => handleCopyClick(d.label)} className='fa fa-copy copy' />
                                        <span className='ellipsis'>{d.label}</span>
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
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GridData;