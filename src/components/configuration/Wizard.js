import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function Wizard(props) {
	const { data } = props;
	const [ active, setActive ] = useState('');

	const renderTooltip = (label) => (
		<Tooltip id="wizard-tooltip" className="in show" {...props}>
			{label}
		</Tooltip>
	);

	return (
		<section>
			<div class="wizard">
				<div class="wizard-inner">
					<div class="connecting-line" />
					<ul class="nav nav-tabs" role="tablist">
						{data.map((d) => (
							<li
								style={{ width: `${100 / data.length}%` }}
								class={d.id === active ? 'active' : ''}
								onClick={() => setActive(d.id)}
							>
								<OverlayTrigger placement="top" overlay={renderTooltip(d.label)} triggerType="hover">
									<a href>
										<span class="round-tab">
											<i class={d.icon} />
										</span>
									</a>
								</OverlayTrigger>
							</li>
						))}
					</ul>
				</div>
				<div class="tab-content">
					Clicked content
					<div class="clearfix" />
				</div>
			</div>
		</section>
	);
}

export default Wizard;
