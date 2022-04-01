import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, ButtonGroup, DropdownButton, Dropdown, Button, Tabs, Tab } from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { LayoutContext } from './layoutDesign';
import { UserContext } from '../../contexts/UserContext';

function ButtonMenu(props) {
	const userContext = useContext(UserContext);
	const layoutContext = useContext(LayoutContext);
	const [ tab, setTab ] = useState('design');
	const sortList = [ 'saved', 'published', 'inactive', 'deleted' ];

	const statusInfo = {
		saved: { icon: 'fa fa-save', rowClass: 'btn-primary' },
		published: { icon: 'fa fa-cloud-upload', rowClass: 'btn-success' },
		inactive: { icon: 'fa fa-lock', rowClass: 'btn-warning' },
		deleted: { icon: 'fa fa-trash', rowClass: 'btn-danger' }
	};

	useEffect(() => {
		// layoutContext.setLoader(true);
		const a = apiInstance.get('/getConfigPages');
		const b = apiInstance.get('/getPageStatuses');

		Promise.all([ a, b ])
			.then((res) => {
				layoutContext.onfetchPageList(res[0].data.response);
				layoutContext.onfetchStatusList(res[1].data.response);
			})
			.catch(() => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Unable to fetch pages. Please try again later'
				});
			})
			.finally(() => null);
	}, []);

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

	return (
		<LayoutContext.Consumer>
			{(layoutDetails) => (
				<Row>
					<Col xs={12} className="d-grid">
						<ButtonGroup size="sm">
							{layoutDetails.pageList &&
							layoutDetails.pageList.length > 0 && (
								<DropdownButton title="Pages" variant="secondary" as={ButtonGroup}>
									{layoutDetails.pageList.map((page, i) => (
										<Dropdown.Item key={i} eventKey="1" onClick={() => getPageDetails(page)}>
											{page.pageLabel}
										</Dropdown.Item>
									))}
								</DropdownButton>
							)}
							{layoutDetails.statusList
								.filter((f) => [ 'published', 'inactive', 'deleted', 'saved' ].includes(f.pub_value))
								.sort((a, b) => {
									return sortList.indexOf(a.pub_value) - sortList.indexOf(b.pub_value);
								})
								.map((status, i) => (
									<Button
										key={i}
										className={`${statusInfo[status.pub_value].rowClass}`}
										disabled={!Object.keys(layoutDetails.pageDetails).length > 0}
									>
										<i className={statusInfo[status.pub_value].icon} /> {status.pub_verb}
									</Button>
								))}
						</ButtonGroup>
					</Col>
					{Object.keys(layoutDetails.pageDetails).length > 0 && (
						<React.Fragment>
							<Col xs={12}>
								<div className="text-center py-3">
									<i className="fa fa-pencil" /> {layoutDetails.pageDetails.pageLabel}
								</div>
							</Col>
							<Col xs={12}>
								<div className="d-flex justify-content-around py-2">
									<div>
										<i className="fa fa-user" /> {layoutDetails.pageDetails.pageModifiedBy}
									</div>
									<div>
										<i className="fa fa-calendar" /> {layoutDetails.pageDetails.pageCreatedAt}
									</div>
									<div>
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
			)}
		</LayoutContext.Consumer>
	);
}

export default ButtonMenu;
