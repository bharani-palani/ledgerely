import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, ButtonGroup, DropdownButton, Dropdown, Button, Tabs, Tab } from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { LayoutContext } from './layoutDesign';
import { UserContext } from '../../contexts/UserContext';
import AddPage from './AddPage';
import moment from 'moment';

function ButtonMenu(props) {
	const userContext = useContext(UserContext);
	const layoutContext = useContext(LayoutContext);
	const [ tab, setTab ] = useState('design');
	const [ showAddPage, setShowAddPage ] = useState(false); // set to false
	const sortList = [ 'saved', 'published', 'inactive', 'deleted' ];

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
				layoutContext.onFetchPageDetails(res.data.response[0]);
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
									<DropdownButton title="Pages" variant="secondary" as={ButtonGroup}>
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
									<div className="text-center py-3">
										<h5>
											<span className="badge bg-primary">
												{layoutDetails.pageDetails.pageLabel}
											</span>
										</h5>
									</div>
								</Col>
								<Col xs={12}>
									<div className="row">
										<div className="col-md-4 text-center">
											<i className="fa fa-user" /> {layoutDetails.pageDetails.pageModifiedBy}
										</div>
										<div className="col-md-4 text-center">
											<i className="fa fa-calendar" /> {layoutDetails.pageDetails.pageCreatedAt}
										</div>
										<div className="col-md-4 text-center">
											<i className="fa fa-clock-o" /> {layoutDetails.pageDetails.pageUpdatedAt}
										</div>
									</div>
								</Col>
								<Col xs={12}>
									<Tabs activeKey={tab} onSelect={(k) => setTab(k)} className="my-3">
										<Tab
											eventKey="design"
											title="Design"
											tabClassName={`bg-transparent ${userContext.userData.theme === 'dark'
												? 'text-light'
												: 'text-dark'}`}
										>
											Design
										</Tab>
										<Tab
											eventKey="preview"
											title="Preview"
											tabClassName={`bg-transparent ${userContext.userData.theme === 'dark'
												? 'text-light'
												: 'text-dark'}`}
										>
											Preview
										</Tab>
									</Tabs>
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
