import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, ButtonGroup, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { LayoutContext } from './layoutDesign';
import { UserContext } from '../../contexts/UserContext';
import AddPage from './AddPage';
import moment from 'moment';
import ReactiveForm from '../configuration/ReactiveForm';

function ButtonMenu(props) {
	const userContext = useContext(UserContext);
	const layoutContext = useContext(LayoutContext);
	const [ showAddPage, setShowAddPage ] = useState(false); // set to false
	const sortList = [ 'saved', 'published', 'inactive', 'deleted' ];
	const [ formStructure, setFormStructure ] = useState([
		{
			id: 'page_access_levels',
			index: 'page_access_levels',
			label: 'Page Access To',
			elementType: 'checkBox',
			value: [],
			isInline: true,
			placeHolder: '',
			className: '',
			list: [],
			options: {
				required: true,
				validation: /([^\s])/,
				errorMsg: 'At least 1 access level is required'
			}
		}
	]);
	const statusInfo = {
		saved: { icon: 'fa fa-save', rowClass: 'btn-primary' },
		published: { icon: 'fa fa-cloud-upload', rowClass: 'btn-success' },
		inactive: { icon: 'fa fa-lock', rowClass: 'btn-warning' },
		deleted: { icon: 'fa fa-trash', rowClass: 'btn-danger' }
	};

	useEffect(() => {
		getPages();
		const a = apiInstance.get('/getPageStatuses');
		const b = apiInstance.get('/getAccessLevels');

		Promise.all([ a, b ])
			.then((res) => {
				layoutContext.onfetchStatusList(res[0].data.response);
				layoutContext.onFetchAccessLevels(res[1].data.response);
			})
			.catch(() => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Unable to fetch pages. Please try again later'
				});
			});
	}, []);

	useEffect(() => {
		if(Object.keys(layoutContext.accessLevels).length, Object.keys(layoutContext.pageDetails).length) {
			const getSuperAdminId = layoutContext.accessLevels.filter((f) => f.accessValue === 'superAdmin')[0]
			.accessId;
			let addAccessToForm = [ ...formStructure ];
			addAccessToForm = addAccessToForm.map((form) => {
				if (form.id === 'page_access_levels') {
					const selecteds = layoutContext.pageDetails.hasAccessTo.split(",");
					form.value = selecteds;
					const accessList = layoutContext.accessLevels.map((access) => ({
						id: access.accessId,
						value: access.accessId,
						label: access.accessLabel,
						checked: selecteds.includes(String(access.accessId)) ? true : false,
						disabled: String(access.accessId) === String(getSuperAdminId) ? true : false
					}));
					form.list = accessList;
				}
				return form;
			});
			setFormStructure(addAccessToForm);
		}
	},[layoutContext.accessLevels, layoutContext.pageDetails]);

	const onSetAccess = (index, value, list = {}) => {
		let backupStructure = [ ...formStructure ];
		backupStructure = backupStructure.map((backup) => {
			if (backup.id === index) {
				backup.list &&
					backup.list.length > 0 &&
					backup.list.map((l) => {
						if (String(l.id) === String(list.id)) {
							l.checked = list.checked;
						}
						return l;
					});
				const newValue =
					!value && Object.keys(list).length > 0
						? backup.list.filter((f) => f.checked).map((c) => c.value)
						: value;
				backup.value = newValue;
			}
			return backup;
		});
		setFormStructure(backupStructure);
		// todo: set pageaccess in global properties
	}
	const getPages = () => {
		apiInstance
			.get('/getConfigPages')
			.then((res) => {
				const list = res.data.response;
				layoutContext.onfetchPageList(list);
				const lastPageAdded = list[list.length - 1];
				lastPageAdded && getPageDetails(lastPageAdded);
			})
			.catch(() => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Unable to fetch pages. Please try again later'
				});
			});
	};

	const getPageDetails = (obj) => {
		const formdata = new FormData();
		formdata.append('pageId', obj.pageId);
		apiInstance
			.post('/getConfigPageDetails', formdata)
			.then((res) => {
				const details = res.data.response[0];
				layoutContext.onFetchPageDetails(details);
			})
			.catch(() => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Unable to fetch page details. Please try again..'
				});
			});
	};

	const onAddPageFormAction = (data) => {
		const now = moment(new Date(), 'YYYY/MMM/DD').format('YYYY-MM-DD:HH:mm:ss');
		const payLoad = {
			...data,
			modifiedBy: userContext.userData.userId,
			pageObject: {
				props: {},
				children: `${data.pageLabel} page`,
				component: 'div'
			},
			pageCreatedAt: now,
			pageUpatedAt: now,
			pageStatus: layoutContext.statusList.filter((f) => f.pub_value === 'saved')[0].pub_id || null
		};

		const formdata = new FormData();
		formdata.append('postData', JSON.stringify(payLoad));
		apiInstance
			.post('/createPage', formdata)
			.then((res) => {
				if (res.data.response) {
					userContext.renderToast({ message: 'Page successfully created' });
					getPages();
				}
			})
			.catch((e) => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Oops.. Something went wrong. Please try again.'
				});
			})
			.finally(() => {
				setShowAddPage(false);
			});
	};

	return (
		<LayoutContext.Consumer>
			{(layoutDetails) => (
				<React.Fragment>
					{showAddPage && (
						<AddPage
							{...props}
							show={showAddPage}
							onHide={() => setShowAddPage(false)}
							handleHide={() => {
								setShowAddPage(false);
							}}
							onFormSubmit={onAddPageFormAction}
						/>
					)}
					<Row>
						<Col xs={12} className="d-grid">
							<ButtonGroup size="sm">
								{layoutDetails.pageList &&
								layoutDetails.pageList.length > 0 && (
									<DropdownButton title="Pages" variant={userContext.userData.theme === 'dark' ? "light" : "secondary"} as={ButtonGroup}>
										<Dropdown.Item onClick={() => setShowAddPage(true)}>
											<i className="fa fa-plus" /> Add Page
										</Dropdown.Item>
										{layoutDetails.pageList.map((page, i) => (
											<Dropdown.Item key={i} onClick={() => getPageDetails(page)}>
												{page.pageLabel}
											</Dropdown.Item>
										))}
									</DropdownButton>
								)}
								{layoutDetails.statusList
									.filter((f) =>
										[ 'published', 'inactive', 'deleted', 'saved' ].includes(f.pub_value)
									)
									.sort((a, b) => {
										return sortList.indexOf(a.pub_value) - sortList.indexOf(b.pub_value);
									})
									.map((status, i) => (
										<Button
											key={i}
											className={`${statusInfo[status.pub_value].rowClass}`}
											disabled={
												layoutDetails.pageDetails &&
												!Object.keys(layoutDetails.pageDetails).length > 0
											}
										>
											<div className="d-flex align-items-center justify-content-center">
												<i className={statusInfo[status.pub_value].icon} />
												<span className="d-none d-sm-block ps-2">{status.pub_verb}</span>
											</div>
										</Button>
									))}
							</ButtonGroup>
						</Col>
						{Object.keys(layoutDetails.pageDetails).length > 0 && (
							<React.Fragment>
								<Col xs={12}>
									<div className="text-center py-2">
										<div>
											<span className="badge bg-primary">
												{layoutDetails.pageDetails.pageLabel}
											</span>
											<i className='fa fa-link px-2 text-primary' />
											<span className="badge bg-primary">
												{layoutDetails.pageDetails.pageRoute}
											</span>
										</div>
									</div>
								</Col>
								<Col xs={12}>
									<div className="row pb-2">
										<div className="col-md-6 text-center py-1">
											<Col xs={12}><i className="fa fa-user" /> {layoutDetails.pageDetails.pageModifiedBy}</Col>
											<Col xs={12}><i className="fa fa-calendar" /> {layoutDetails.pageDetails.pageCreatedAt}</Col>
											<Col xs={12}><i className="fa fa-clock-o" /> {layoutDetails.pageDetails.pageUpdatedAt}</Col>
										</div>
										<div className="col-md-6 text-center py-1">
										<ReactiveForm
											parentClassName={`reactive-form ${userContext.userData.theme === 'dark'
												? 'text-light'
												: 'text-dark'}`}
											structure={formStructure}
											onChange={onSetAccess}
											submitBtnLabel={'Save'}
											showSubmit={false}
										/>

										</div>
									</div>
								</Col>
							</React.Fragment>
						)}
					</Row>
				</React.Fragment>
			)}
		</LayoutContext.Consumer>
	);
}

export default ButtonMenu;
