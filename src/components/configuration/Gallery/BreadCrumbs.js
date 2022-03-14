import React, { useState, useEffect } from 'react'

function BreadCrumbs(props) {

    const {breadCrumbs, onBreadClick} = props;
    return (
        <div className='header'>
            <div className='breadCrumb border-bottom'>
                {breadCrumbs.length > 0 ? breadCrumbs.map((bread,i) => (
                    <React.Fragment key={i}>
                        <i className='fa fa-angle-right breadIcon' />
                        <button onClick={() => onBreadClick(bread)} className='breadButton'>{bread.title}</button>
                    </React.Fragment>
                    )
                ) : (
                    <i className='fa fa-angle-left breadIcon' />
                )}
            </div>
        </div> 
    )
}

export default BreadCrumbs;