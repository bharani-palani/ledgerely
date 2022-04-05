import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import ButtonMenu from './ButtonMenu';
import SideMenu from './SideMenu';
import Proto from './proto';

export const LayoutContext = React.createContext();

function LayoutDesign(props) {
	const [ pageList, setPageList ] = useState([]);
	const [ statusList, setStatusList ] = useState([]);
	const [ pageDetails, setPageDetails ] = useState({});
	const [ accessLevels, setAccessLevels ] = useState([]);
	const [ viewMode, setViewMode ] = useState('design');

	const onfetchPageList = (data) => {
		setPageList(data);
	};

	const onfetchStatusList = (data) => {
		setStatusList(data);
	};

	const onFetchPageDetails = (data) => {
		setPageDetails(data);
	};

	const onFetchAccessLevels = (data) => {
		setAccessLevels(data);
	};

	const onSetViewMode = (mode) => {
		setViewMode(mode);
	};

	return (
		<div className="container-fluid">
			<div className="">
				<div className="text-center">
					<h5 className="p-3">
						<i className="fa fa-paint-brush" /> Design layout
					</h5>
					<hr className="my-2" />
				</div>
			</div>
			{!pageList.length &&
				(!statusList.length && (
					<div className="text-center">
						<Loader
							type={helpers.loadRandomSpinnerIcon()}
							color={document.documentElement.style.getPropertyValue('--app-theme-bg-color')}
							height={100}
							width={100}
						/>
					</div>
				))}

			<LayoutContext.Provider
				value={{
					pageList,
					statusList,
					pageDetails,
					accessLevels,
					viewMode,
					onfetchPageList,
					onfetchStatusList,
					onFetchPageDetails,
					onFetchAccessLevels,
					onSetViewMode
				}}
			>
				<Row className="pt-1">
					<Col md={9}>
						<ButtonMenu />
						<Proto />
					</Col>
					<Col md={3}>
						<SideMenu />
					</Col>
				</Row>
			</LayoutContext.Provider>
		</div>
	);
}

export default LayoutDesign;
