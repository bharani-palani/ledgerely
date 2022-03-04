import React, { useState, useEffect } from 'react';

function ResetForm(props) {
	const [ email, setEmail ] = useState([]);

  const resetAction = () => {

  }

	return (
		<div>
			<div className="form-floating mb-3">
				<input
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					type="email"
					className="form-control"
					placeholder="Your email.."
					id="email"
				/>
				<label htmlFor="email">Your email please</label>
			</div>
      <div className='mb-3 text-danger fst-italic'>The reset details will be mailed to you.</div>
			<div className="d-grid">
				<button
					onClick={() => resetAction()}
					className="btn btn-bni"
				>
					Reset
				</button>
			</div>
		</div>
	);
}

export default ResetForm;
