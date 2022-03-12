import React, { useState, useEffect, useContext } from 'react';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import AppContext from '../../contexts/AppContext';

function Awards() {
	const [ awards, setAwards ] = useState([]);
	const [ awardsHeading, setAwardsHeading ] = useState('');
	const [ appData ] = useContext(AppContext);
	document.title = `${appData.web} | Awards`;

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
		<section className="bg-dark text-white" style={{ minHeight: window.screen.height }}>
			{awards.length < 1 ? (
				<div className="spinner">
					<Loader
						type={helpers.LoadRandomSpinnerIcon()}
						color={helpers.fluorescentColor}
						height={100}
						width={100}
					/>
				</div>
			) : (
				<React.Fragment>
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
										<div className="bg-dark p-4">
											<div className="text-center">
												<h6>{award.award_label}</h6>
											</div>
										</div>
										<div className="text-center bg-white text-dark p">
											<p className='p-4'>{award.award_value}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</React.Fragment>
			)}
		</section>
	);
}

export default Awards;
