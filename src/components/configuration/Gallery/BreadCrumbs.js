import React, { useState, useEffect } from 'react'

function BreadCrumbs(props) {

    const {breadCrumbs} = props;
    return (
        <div className='row header'>
            <div className='breadCrumb'>
                {breadCrumbs.length > 0 ? breadCrumbs.map((b,i) => (
                    <React.Fragment key={i}>
                        <i className='fa fa-angle-double-right breadIcon' />
                        <button  title={b} className='breadButton'>{b}</button>
                    </React.Fragment>
                    )
                ) : (
                    <i className='fa fa-angle-double-right breadIcon' />
                )}
            </div>
        </div> 
    )
}

export default BreadCrumbs;