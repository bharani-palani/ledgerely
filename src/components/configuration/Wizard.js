import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactiveForm from './ReactiveForm';

function Wizard(props) {
	const { data, menu, onMassagePayload, onReactiveFormSubmit } = props;
	const [ id, setId ] = useState(0);
	const [ formData, setFormData ] = useState([]);


	useEffect(() => {
		toggleData(menu[0].filterArray);
	}, []);

	useEffect(
		() => {
			toggleData(menu[id].filterArray);
		},
		[ id ]
	);

	const toggleData = (idArray) => {
		let newFormData = [ ...data ];
		newFormData = newFormData.map((f) => {
			f.className = f.className.replaceAll(' d-none', '');
			if (!idArray.includes(f.id)) {
				f.className = `${f.className} d-none`;
			}
			return f;
		});
		setFormData(newFormData);
	};
	const renderTooltip = (label) => (
		<Tooltip id="wizard-tooltip" className="in show" {...props}>
			{label}
		</Tooltip>
	);

	const onNext = () => {
		let newId = id + 1;
		setId(newId);
	};

	const onPrev = () => {
		let newId = id - 1;
		setId(newId);
	};

	return (
		<section>
			<div className="wizard">
				<div className="wizard-inner">
					<div className="connecting-line" />
					<ul className="nav nav-tabs" role="tablist">
						{menu.map((d,i) => (
							<li
								key={i}
								style={{ width: `${100 / menu.length}%` }}
								className={d.id === id ? 'active' : ''}
								onClick={() => setId(d.id)}
							>
								<OverlayTrigger placement="top" overlay={renderTooltip(d.label)} triggerType="hover">
									<a href>
										<span className="round-tab">
											<i className={d.icon} />
										</span>
									</a>
								</OverlayTrigger>
							</li>
						))}
					</ul>
				</div>
				<div className="tab-content">
					<div className="row tab-btn-content">
						<div className="col-6">
							<button disabled={id === 0} onClick={() => onPrev()} className="btn btn-bni pull-left">
								<i className='fa fa-angle-double-left' />
							</button>
						</div>
						<div className="col-6">
							<button
								disabled={id === menu.length - 1}
								onClick={() => onNext()}
								className="btn btn-bni pull-right"
							>
								<i className='fa fa-angle-double-right' />
							</button>
						</div>
					</div>
					{formData.length > 0 && (
						<ReactiveForm
							parentClassName="reactive-form"
							structure={formData}
							onChange={(index, value) => onMassagePayload(index, value)}
							onSubmit={() => onReactiveFormSubmit()}
							showSubmit={id === menu.length - 1}
						/>
					)}
					<div className="clearfix" />
				</div>
			</div>
		</section>
	);
}

export default Wizard;
