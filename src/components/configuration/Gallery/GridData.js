import React, { useState, useContext } from 'react'
import moment from "moment";
import Thumbnail from "./Thumbnail";
import { UserContext } from "../../../contexts/UserContext";

function GridData(props) {
    const {data, directory} = props;
    const [view, setView] = useState("table");
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

    return (
        <div className='tableGrid'>
            <div className='headerGrid'>
                <div><i className='fa fa-folder-open' /> {directory}</div>
                <div>
                    <i className='fa fa-list viewButtons' onClick={() => setView("list")} />
                    <i className='fa fa-table viewButtons' onClick={() => setView("table")} />
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
                        <div className={`child ${view}-child`}>
                            <div className={`${view === "table" ? "text-center" : ""}`}>
                                <div className='copyable'>
                                    <i onClick={() => handleCopyClick(d.label)} className='fa fa-copy copy' />
                                    <span className='ellipsis'>{d.label}</span>
                                </div>
                            </div>
                            {view === "table" && 
                                <Thumbnail object={d} />
                            }
                            {view === "table" ? (<div className='copyable'>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GridData;