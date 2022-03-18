import React, { useState, useEffect, useContext } from 'react';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import AppContext from '../../contexts/AppContext';
import { UserContext } from "../../contexts/UserContext";

function Awards() {
	const [ awards, setAwards ] = useState([]);
	const [ awardsHeading, setAwardsHeading ] = useState('');
	const [ appData ] = useContext(AppContext);
	document.title = `${appData.web} | Awards`;
	const userContext = useContext(UserContext);

	useEffect(() => {
		apiInstance
			.get('/awards')
			.then((response) => {
				const [ awardsHeading, awardsList ] = helpers.sageHeaderAndList(response.data.response, 'award_sort');
				setAwards(awardsList);
				setAwardsHeading(awardsHeading);
			})
			.catch((error) => console.log(error))
			.finally(() => 1);
	}, []);

	return (
		<section className="">
			{awards.length < 1 ? (
				<div className="spinner">
					<Loader
						type={helpers.LoadRandomSpinnerIcon()}
						color={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
						height={100}
						width={100}
					/>
				</div>
			) : (
				<div className="container-fluid">
					<div className="pt-5">
						<div className="pt-4">
							<div className="text-center">
								<h3 className="">Awards</h3>
								<hr className="hr" />
								<i className="fa fa-trophy fa-5x py-3" />
								<p className="container-fluid">{awardsHeading ? awardsHeading.award_value : null}</p>
							</div>
						</div>
						<div className="row">
							{awards.map((award, i) => (
								<div key={i} className="col-md-4">
									<div className="py-2">
										<div className={`card border border-1 ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-black'}`}>
											<div className="card-body">
												<p className="card-text">
													<h5>{award.award_label}</h5>
												</p>
												<p className="p-2">{award.award_value}</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default Awards;
