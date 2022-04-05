import React from 'react';
import { LayoutContext } from './layoutDesign';

function Proto(props) {
	return (
		<LayoutContext.Consumer>
			{(layoutDetails) => (
				<div>
					<div className="">
						<div className="btn-group">
							<button
								className={`btn ${layoutDetails.viewMode === 'design'
									? 'btn-primary active'
									: 'btn-outline-primary'}`}
								onClick={() => layoutDetails.onSetViewMode('design')}
							>
								Design
							</button>
							<button
								className={`btn ${layoutDetails.viewMode === 'preview'
									? 'btn-primary active'
									: 'btn-outline-primary'}`}
								onClick={() => layoutDetails.onSetViewMode('preview')}
							>
								Preview
							</button>
						</div>
					</div>
					<span>{layoutDetails.viewMode}</span>
				</div>
			)}
		</LayoutContext.Consumer>
	);
}

export default Proto;
