import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Config from '../configuration/config';
import Gallery from '../configuration/Gallery';
import Users from '../configuration/users';
import { Accordion, Card, Button } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';

const Settings = (props) => {
	const userContext = useContext(UserContext);  
	const [collapse, setCollapse] = useState("");
	const compList = [
		{ id: 1, label: 'Config', component: Config },
		{ id: 2, label: 'Users', component: Users },
		{ id: 3, label: 'Gallery', component: Gallery },
		// { id: 4, label: 'Messages', component: ViewMessages },
		// { id: 5, label: 'Resume', component: ResumeBackend },
	];

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
								className={`my-2 ${userContext.userData.theme === 'dark'
									? 'bg-dark text-light'
									: 'bg-light text-dark'}`}
							>
								<Card.Header>
									<Accordion.Toggle
										onClick={() => setCollapse(t.label)}
										as={Button}
										variant="link"
										eventKey={t.id}
                    					style={{boxShadow: "none"}}
										className={`text-decoration-none ${userContext.userData.theme === 'dark'
											? 'text-light'
											: 'text-dark'}`}
									>
										{t.label}
									</Accordion.Toggle>
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
