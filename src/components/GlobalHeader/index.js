import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';

function GlobalHeader(props) {
	const [ appData ] = useContext(AppContext);
	const [ value, setValue ] = useState([]);
	return (
		<div>
			<div className="globalHeader hidden-print">
				<div>
					<a href="/">
						<img
							className="brand"
							src={appData.logoImg || require('../../images/spinner-1.svg')}
							alt="Logo-img"
						/>
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
