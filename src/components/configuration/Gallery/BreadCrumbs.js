import React from 'react';

function BreadCrumbs(props) {
	const { breadCrumbs, onBreadClick } = props;

	return breadCrumbs && breadCrumbs.length > 0 ? (
		<div className="header rounded mb-2">
			<div className="breadCrumb">
				{breadCrumbs.map((bread, i) => (
					<React.Fragment key={i}>
						<i className="fa fa-angle-double-right breadIcon" />
						<button onClick={() => onBreadClick(bread)} className="breadButton">
							{bread.title}
						</button>
					</React.Fragment>
				))}
			</div>
		</div>
	) : null;
}

export default BreadCrumbs;
