import React, { useState, useEffect } from 'react'
import moment from "moment";

function GridData(props) {
    const {data} = props;
    const [view, setView] = useState("table");

    const bytesToMb = (bytes) => (bytes / (1024 * 1024)).toFixed(2)
    return (
        <div className='tableGrid'>
            <div className='text-right headerGrid'>
                <i className='fa fa-list viewButtons' onClick={() => setView("list")} />
                <i className='fa fa-table viewButtons' onClick={() => setView("table")} />
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
                            <div className={`p-5 ${view === "table" ? "text-center" : ""}`}>File name</div>
                            {view === "table" && <div>
                                <img src={d.url} alt="1" className='img-responsive' />
                            </div>}
                            {view === "table" ? (<div className='equal-grid-2 p-5'>
                                <div className="text-center">
                                    {`${bytesToMb(d.size)} MB`}
                                </div>
                                <div className="text-center">
                                    {moment(d.lastModified).format("MMM Do YYYY, h:mm:ss a")}
                                </div>
                            </div>) : (
                                <>
                                    <div className="p-5">
                                        {`${bytesToMb(d.size)} MB`}
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