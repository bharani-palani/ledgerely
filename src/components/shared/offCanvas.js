import React, { useState, useContext } from 'react'
import { UserContext } from "../../contexts/UserContext";

function OffCanvas(props) {
    const [value, setValue] = useState([])
	const userContext = useContext(UserContext);

    return (
        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
                Help
            </button>
            <div className={`offcanvas offcanvas-end ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-black'}`} style={{top: "100px"}} id="offcanvasExample">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Offcanvas</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    <div>Content</div>
                </div>
            </div>
        </div>
    )
}

export default OffCanvas;