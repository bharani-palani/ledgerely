import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactiveForm from './ReactiveForm';

function Wizard(props) {
	const { data, formData, massagePayload, onReactiveFormSubmit, onChange } = props;
	const [ id, setId ] = useState(data[0].id);
	const [ form, setForm ] = useState(formData);
	const renderTooltip = (label) => (
		<Tooltip id="wizard-tooltip" className="in show" {...props}>
			{label}
		</Tooltip>
	);

	useEffect(
		() => {
			setForm([]);
            setTimeout(() => {
                setForm(formData);
            }, 1);
		},
		[ formData ]
	);

	useEffect(
		() => {
			onChange(id);
		},
		[ id ]
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
			<div class="wizard">
				<div class="wizard-inner">
					<div class="connecting-line" />
					<ul class="nav nav-tabs" role="tablist">
						{data.map((d, i) => (
							<li
								style={{ width: `${100 / data.length}%` }}
								class={d.id === id ? 'active' : ''}
								onClick={() => setId(d.id)}
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
					<div className="row tab-btn-content">
						<div className="col-xs-6">
							<button disabled={id === 0} onClick={() => onPrev()} className="btn btn-bni pull-left">
								Prev
							</button>
						</div>
						<div className="col-xs-6">
							<button
								disabled={id === data.length - 1}
								onClick={() => onNext()}
								className="btn btn-bni pull-right"
							>
								Next
							</button>
						</div>
					</div>
					{form.length > 0 && <ReactiveForm
						parentClassName="reactive-form"
						className="col-md-4 col-sm-6"
						structure={form}
						onChange={(index, value) => massagePayload(index, value)}
						onSubmit={() => onReactiveFormSubmit()}
						showSubmit={id === data.length - 1}
					/>}
					<div class="clearfix" />
				</div>
			</div>
		</section>
	);
}

export default Wizard;
