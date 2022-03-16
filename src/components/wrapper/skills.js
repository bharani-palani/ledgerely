import React, { useState, useEffect, useContext } from 'react';
import Loader from 'react-loader-spinner';
import apiInstance from '../../services/apiServices';
import helpers from '../../helpers';
import AppContext from '../../contexts/AppContext';
import SignedUrl from '../configuration/Gallery/SignedUrl';
import { UserContext } from '../../contexts/UserContext';

function Skills() {
	const [ appData ] = useContext(AppContext);
	const userContext = useContext(UserContext);
	document.title = `${appData.web} | Skills`;
	const [ skills, setSkills ] = useState([]);
	const [ skillsHeading, setSkillsHeading ] = useState('');

	useEffect(() => {
		apiInstance
			.get('/skills')
			.then((response) => {
				const [ skillsHeading, skillsList ] = helpers.sageHeaderAndList(response.data.response, 'skill_sort');
				setSkills(skillsList);
				setSkillsHeading(skillsHeading);
			})
			.catch((error) => console.log(error))
			.finally(() => 1);
	}, []);

	return (
		<section className="">
			{skills.length < 1 ? (
				<div className="spinner">
					<Loader
						type={helpers.LoadRandomSpinnerIcon()}
						color={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
						height={100}
						width={100}
					/>
				</div>
			) : (
				<div className="">
					<div className="pt-5">
						<div className="pt-4">
							<div className="text-center">
								<h2 className="">Skills</h2>
								<hr className="hr" />
								<i className="fa fa-graduation-cap fa-5x py-3" />
								<p className="container-fluid">{skillsHeading ? skillsHeading.skill_value : null}</p>
							</div>
						</div>
					</div>
					<div className="container-fluid">
						{skills.map((skill, i) => (
							<div className="m-2">
								<div key={i} className="row">
									<div className="col-lg-3 col-md-6 p-0">
										<SignedUrl
											optionalAttr={{ width: '100%' }}
											type="image"
											className="img-fluid"
											appData={appData}
											unsignedUrl={skill.skill_image_url}
										/>
									</div>
									<div
										className={`col-lg-9 col-md-6 ${userContext.userData.theme === 'dark'
											? 'bg-dark text-light'
											: 'bg-light text-dark'}`}
									>
										<h4 className="text-center p-2">{skill.skill_label}</h4>
										<p className="p-3">{skill.skill_value}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}

export default Skills;
