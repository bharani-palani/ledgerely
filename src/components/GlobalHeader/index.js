import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../contexts/AppContext';
import SignedUrl from "../configuration/Gallery/SignedUrl";

function GlobalHeader(props) {
	const [ appData ] = useContext(AppContext);

	return (
		<div>
			<div className="globalHeader hidden-print">
				<div>
					<a href="/">
						<SignedUrl type="image" appData={appData} unsignedUrl={appData.logoImg} className="brand" />
					</a>
				</div>
				<div className="text-right">
					<i className="fa fa-globe gIcon" />
				</div>
			</div>
			{props.children}
		</div>
	);
}

export default GlobalHeader;
