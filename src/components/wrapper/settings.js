import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Config from '../configuration/config';
import Gallery from '../configuration/Gallery';
import Users from '../configuration/users';
import { Accordion, Card, Button, Offcanvas, useAccordionButton } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';

const Settings = (props) => {
	const userContext = useContext(UserContext);  
	const [collapse, setCollapse] = useState("");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const compList = [
		{ id: 1, label: 'Config', component: Config, help: {heading: "Config help"} },
		{ id: 2, label: 'Users', component: Users, help: {heading: "Users help"} },
		{ id: 3, label: 'Gallery', component: Gallery, help: {heading: "Gallery help"} },
		// { id: 4, label: 'Messages', component: ViewMessages },
		// { id: 5, label: 'Resume', component: ResumeBackend },
	];

	function CustomToggle({ children, eventKey, eventLabel }) {
		const decoratedOnClick = useAccordionButton(eventKey, () =>
		  setCollapse(eventLabel)
		);
	  
		return (
		  <button
			type="button"
			className={`text-start btn ${userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
			onClick={decoratedOnClick}
		  >
			{children}
		  </button>
		);
	  }

	return (
		<section className={`pt-5`}>
			<div className="pt-4">
				<div className="text-center">
					<h2 className="">Settings</h2>
					<hr className="my-3" />
					<i className="fa fa-gears fa-2x py-2" />
					<p className="">Configure your appliation settings</p>
				</div>
			</div>
			<div className="settings">
				<div className="container-fluid">
					<Accordion bsPrefix="util" defaultActiveKey={-1} className="">
						{compList.map((t, i) => (
							<Card
								key={t.id}
								className={`my-2 ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
							>
								<Card.Header className='d-flex justify-content-between'>
									<CustomToggle eventLabel={t.label} eventKey={t.id}>{t.label}</CustomToggle>
									<Button className={`btn btn-sm ${userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-light'}`} onClick={handleShow}>
										Help
									</Button>

									<Offcanvas 
									className={`${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
									placement="end" backdrop={false} show={show} onHide={handleClose}>
										<Offcanvas.Header closeButton>
										<Offcanvas.Title>{t.help.heading}</Offcanvas.Title>
										</Offcanvas.Header>
										<Offcanvas.Body>
										Some text as placeholder. In real life you can have the elements you
										have chosen. Like, text, images, lists, etc.
										</Offcanvas.Body>
									</Offcanvas>
								</Card.Header>
								<Accordion.Collapse eventKey={t.id}>
									<Card.Body className='p-2'>{t.label === collapse && React.createElement(t.component)}</Card.Body>
								</Accordion.Collapse>
							</Card>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
};

Settings.propTypes = {
	property: PropTypes.string
};
Settings.defaultProps = {
	property: 'String name'
};

export default Settings;
