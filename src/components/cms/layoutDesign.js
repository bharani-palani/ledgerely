import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import ButtonMenu from './ButtonMenu';
import SideMenu from './SideMenu';

export const LayoutContext = React.createContext();

function LayoutDesign(props) {
	const [ loader ] = useState(false);

	const [ pageList, setPageList ] = useState([]);
	const [ statusList, setStatusList ] = useState([]);
	const [ pageDetails, setPageDetails ] = useState({});

	const onfetchPageList = (data) => {
		setPageList(data);
	};

	const onfetchStatusList = (data) => {
		setStatusList(data);
	};

	const onFetchPageDetails = (data) => {
		setPageDetails(data);
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
				<LayoutContext.Provider
					value={{
						pageList,
						statusList,
						pageDetails,
						onfetchPageList,
						onfetchStatusList,
						onFetchPageDetails
					}}
				>
					<Row className="pt-1">
						<Col md={9}>
							<ButtonMenu />
						</Col>
						<Col md={3}>
							<SideMenu />
						</Col>
					</Row>
				</LayoutContext.Provider>
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
