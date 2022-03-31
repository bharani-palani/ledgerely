import React, { useState, useContext, useEffect } from 'react';
import {
	Row,
	Col,
	ButtonGroup,
	DropdownButton,
	Dropdown,
	Button,
	Accordion,
	useAccordionButton,
	Card,
	Tabs,
	Tab
} from 'react-bootstrap';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';

function LayoutDesign(props) {
	const userContext = useContext(UserContext);
	const statusInfo = {
		saved: { icon: 'fa fa-save' },
		published: { icon: 'fa fa-cloud-upload' },
		inactive: { icon: 'fa fa-thumbs-o-down' },
		deleted: { icon: 'fa fa-trash', rowClass: 'text-danger' }
	};
	const [ loader, setLoader ] = useState(false);
	const [ pageSelected, setPageSelected ] = useState({});
	const [ tab, setTab ] = useState('design');
	const [ pageList, setPageList ] = useState([]);
	const [ statusList, setStatusList ] = useState([]);
	const [ sideMenu ] = useState([
		{
			id: 0,
			label: 'Components',
			children: [
				{ id: 0.1, label: 'Built in', body: 'built in body' },
				{ id: 0.2, label: 'Bootstrap', body: 'Bootstrap body' }
			]
		},
		{ id: 1, label: 'Props', body: 'Props body' },
		{ id: 2, label: 'Styles', body: 'Styles body' },
		{ id: 3, label: 'Functions', body: 'Functions body' },
		{
			id: 4,
			label: 'Database',
			children: [
				{ id: 4.1, label: 'List', body: 'List table' },
				{ id: 4.2, label: 'Create', body: 'Create table' },
				{ id: 4.3, label: 'Fetch', body: 'Fetch table' }
			]
		}
	]);

	useEffect(
		() => {
			console.log('bbb', pageSelected);
		},
		[ pageSelected ]
	);

	useEffect(() => {
		setLoader(true);
		const a = apiInstance.get('/getConfigPages');
		const b = apiInstance.get('/getPageStatuses');

		Promise.all([ a, b ])
			.then((res) => {
				setPageList(res[0].data.response);
				setStatusList(res[1].data.response);
			})
			.catch(() => {
				userContext.renderToast({
					type: 'error',
					icon: 'fa fa-times-circle',
					message: 'Unable to fetch pages. Please try again later'
				});
			})
			.finally(() => setLoader(false));
	}, []);

	const CustomToggle = ({ children, eventKey, object }) => {
		const decoratedOnClick = useAccordionButton(eventKey, () => null);

		return (
			<button
				type="button"
				className={`btn-sm text-start btn ${userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-white'}`}
				onClick={decoratedOnClick}
			>
				{children}
			</button>
		);
	};

	return (
		<div className="container-fluid">
			<div className="pt-4">
				<div className="text-center">
					<h2 className="">Design layout</h2>
					<hr className="my-3" />
					<i className="fa fa-paint-brush fa-2x py-2" />
					<p className="">Design your web pages</p>
				</div>
			</div>
			{!loader ? (
				<Row className="pt-1">
					<Col md={9}>
						<Row>
							<Col xs={12} className="d-grid">
								<ButtonGroup>
									{pageList.length > 0 && (
										<DropdownButton as={ButtonGroup} variant="light" title="Pages">
											{pageList.map((page, i) => (
												<Dropdown.Item
													key={i}
													eventKey="1"
													onClick={() => setPageSelected(page)}
												>
													{page.pageLabel}
												</Dropdown.Item>
											))}
										</DropdownButton>
									)}
									{Object.keys(pageSelected).length > 0 &&
										statusList
											.filter((f) =>
												[ 'published', 'inactive', 'deleted', 'saved' ].includes(f.pub_value)
											)
											.map((status, i) => (
												<Button
													key={i}
													variant="light"
													className={statusInfo[status.pub_value].rowClass}
												>
													<i className={statusInfo[status.pub_value].icon} />{' '}
													{status.pub_verb}
												</Button>
											))}
								</ButtonGroup>
							</Col>
							{Object.keys(pageSelected).length > 0 && (
								<React.Fragment>
									<Col xs={12}>
										<div className="text-center py-2">
											<i className="fa fa-pencil" /> {pageSelected.pageLabel}
										</div>
									</Col>
									<Col xs={12}>
										<div className="d-flex justify-content-around py-2">
											<div>
												<i className="fa fa-user" /> {pageSelected.pageModifiedBy}
											</div>
											<div>
												<i className="fa fa-calendar" /> {pageSelected.pageCreatedAt}
											</div>
											<div>
												<i className="fa fa-clock-o" /> {pageSelected.pageUpdatedAt}
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
					</Col>
					<Col md={3}>
						<Accordion defaultActiveKey={[ '0' ]} alwaysOpen>
							{sideMenu.map((side, i) => (
								<Card
									key={side.id}
									className={`mb-1 ${userContext.userData.theme === 'dark'
										? 'bg-dark text-light'
										: 'bg-light text-dark'}`}
								>
									<Card.Header className="row m-0 p-0">
										<CustomToggle eventKey={side.id} object={side}>
											{side.label}
										</CustomToggle>
									</Card.Header>
									<Accordion.Collapse eventKey={side.id}>
										<Card.Body className="p-1">
											{side.body && side.body}
											{side.children &&
												side.children.length > 0 &&
												side.children.map((ch, j) => (
													<Accordion key={ch.id}>
														<Card
															className={`mb-1 ${userContext.userData.theme === 'dark'
																? 'bg-dark text-light'
																: 'bg-light text-dark'}`}
														>
															<Card.Header className="row m-0 p-0">
																<CustomToggle eventKey={ch.id} object={side}>
																	{ch.label}
																</CustomToggle>
															</Card.Header>
															<Accordion.Collapse eventKey={ch.id}>
																<Card.Body className="p-1">{ch.body}</Card.Body>
															</Accordion.Collapse>
														</Card>
													</Accordion>
												))}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							))}
						</Accordion>
					</Col>
				</Row>
			) : (
				<div className="text-center">
					<Loader
						type={helpers.loadRandomSpinnerIcon()}
						color={document.documentElement.style.getPropertyValue('--app-theme-bg-color')}
						height={100}
						width={100}
					/>
				</div>
			)}
		</div>
	);
}

export default LayoutDesign;
