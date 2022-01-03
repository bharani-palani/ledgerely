import React, { useState, useEffect } from 'react';

function GlobalHeader(props) {
	const [ value, setValue ] = useState([]);
	return (
		<div>
			<div className="globalHeader hidden-print">
				<div>
					<span className="brand">bharani.tech</span>
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
