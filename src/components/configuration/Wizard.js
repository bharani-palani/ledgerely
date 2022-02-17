import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactiveForm from './ReactiveForm';

function Wizard(props) {
	const { data, onMassagePayload, onReactiveFormSubmit } = props;
	const [ id, setId ] = useState(0);
	const [ formData, setFormData ] = useState([]);
	const menu = [
		{
			id: 0,
			label: 'Account',
			icon: 'fa fa-user',
			filterArray: [ 'user_name', 'display_name', 'profile_name', 'user_mobile', 'user_mail', 'user_web' ]
		},
		{
			id: 1,
			label: 'Google & Geo',
			icon: 'fa fa-google',
			filterArray: [ 'latitude', 'longitude', 'google_map_api_key', 'google_login_auth_token', 'google_id' ]
		},
		{
			id: 2,
			label: 'Address',
			icon: 'fa fa-map-marker',
			filterArray: [ 'address1', 'address2', 'city', 'state', 'country', 'postcode', 'locale' ]
		},
		{
			id: 3,
			label: 'Money & Locale',
			icon: 'fa fa-inr',
			filterArray: [ 'maximumFractionDigits', 'currency', 'upiKey' ]
		},
		{
			id: 4,
			label: 'Web Defaults',
			icon: 'fa fa-globe',
			filterArray: [
				'bgSong',
				'bgSongDefaultPlay',
				'bgVideo',
				'bgVideoDefaultPlay',
				'BannerImg',
				'logoImg',
				'favIconImg'
			]
		},
		{
			id: 5,
			label: 'AWS',
			icon: 'fa fa-amazon',
			filterArray: [ 'aws_s3_access_key_id', 'aws_s3_secret_access_key', 'aws_s3_bucket', 'aws_s3_region' ]
		}
	];

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
			f.className = f.className.replaceAll('hide', '');
			if (!idArray.includes(f.id)) {
				f.className = `${f.className} hide`;
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
			<div class="wizard">
				<div class="wizard-inner">
					<div class="connecting-line" />
					<ul class="nav nav-tabs" role="tablist">
						{menu.map((d) => (
							<li
								style={{ width: `${100 / menu.length}%` }}
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
								<i className='fa fa-angle-double-left' />
							</button>
						</div>
						<div className="col-xs-6">
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
					<div class="clearfix" />
				</div>
			</div>
		</section>
	);
}

export default Wizard;
