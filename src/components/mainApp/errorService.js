import React from 'react';

function ErrorService() {
	document.title = `No Internet`;
	return (
		<div className="">
			<div className="p-5">
				<div className="position-relative">
					<div className="position-absolute top-50 start-50 translate-middle-x">
						<div className="text-center">
							<i className="fa fa-plug fa-5x text-danger" />
							<h1>Sorry!</h1>
							<h2>Unable to connect server</h2>
							<div className="error-details">Please check your internet connection..</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ErrorService;
