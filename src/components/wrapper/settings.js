import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import ResumeBackend from '../configuration/resumeBackend';
import ViewMessages from '../configuration/viewMessages';
import Config from '../configuration/config';
import Gallery from '../configuration/Gallery';
import Users from '../configuration/users';
import { configArray } from '../configuration/backendTableConfig';
import { Accordion, Card, Button } from 'react-bootstrap';
import BackendCore from '../configuration/backend/BackendCore';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import { UserContext } from '../../contexts/UserContext';

const Settings = (props) => {
	const [ collapse, setCollapse ] = useState('');
	const [ key, setKey ] = useState('AWS_S3'); // change to web
	const [ dbData, setDbData ] = useState([]);
	const userContext = useContext(UserContext);

	const getBackendAjax = (Table, TableRows) => {
		const formdata = new FormData();
		formdata.append('TableRows', TableRows);
		formdata.append('Table', Table);
		return apiInstance.post('getBackend', formdata);
	};

	const onToggle = async (t) => {
		setDbData([]);
		const data = await getBackendAjax(t.Table, t.TableRows)
			.then((r) => {
				setDbData(r.data.response);
				setCollapse(t.label);
			})
			.catch((error) => {
				console.log(error);
			});
		return data;
	};
	const loaderComp = () => {
		return (
			<div className="relativeSpinner">
				<Loader
					type={helpers.LoadRandomSpinnerIcon()}
					color={document.documentElement.style.getPropertyValue('--app-theme-bg-color')}
					height={100}
					width={100}
				/>
			</div>
		);
	};
	const onPostApi = (response) => {
		const { status, data } = response;
		if (status) {
			response && data && data.response
				? userContext.renderToast({ message: 'Transaction saved successfully' })
				: userContext.renderToast({
						type: 'error',
						icon: 'fa fa-times-circle',
						message: 'Oops.. No form change found'
					});
		} else {
			userContext.renderToast({
				type: 'error',
				icon: 'fa fa-times-circle',
				message: 'Unable to reach server. Please try again later'
			});
		}
	};

  // todo: optimise this pae after cms config. Show only config, users and gallery. Remove others
  // Below Compoenent is for resume. Remove them later

  // <BackendCore
  //   Table={t.Table}
  //   TableRows={t.TableRows}
  //   TableAliasRows={t.TableAliasRows}
  //   rowElements={t.rowElements}
  //   dbData={dbData}
  //   postApiUrl="/postBackend"
  //   onPostApi={response => onPostApi(response)}
  //   onReFetchData={() => onToggle(t)}
  //   cellWidth="25rem"
  // />
  
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
										onClick={() => onToggle(t)}
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
									<Card.Body>{React.createElement(t.component)}</Card.Body>
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
