import React, { useState, useEffect } from 'react'
import moment from "moment";

function GridData(props) {
    const {data} = props;
    const [value, setValue] = useState([]);

    const bytesToMb = (bytes) => (bytes / (1024 * 1024)).toFixed(2)
    return (
        <div className='row'>
            {data.map(d => (
                <div className='col-lg-4 col-md-6 p-0 text-center'>
                    <img src={d.url} alt="1" className='img-responsive form-group' />
                    <div className='title'>{d.label}</div>
                    <div className='equal-grid-2 pl-5 pr-5'>
                        <div className='title text-center'>
                            <small><em>{`${bytesToMb(d.size)} MB`}</em></small>
                        </div>
                        <div className='title text-center'>
                            <small><em>{moment(d.lastModified).format("MMM Do YYYY, h:mm:ss a")}</em></small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GridData;