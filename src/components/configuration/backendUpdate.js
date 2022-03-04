import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from './loginForm';

function BackendUpdate(props) {
	const [ auth, setAuth ] = useState(false);
	const [ showForgot, setShowForgot ] = useState(false);

	return (
		<Modal {...props} className="" size={'sm'}>
			<Modal.Header closeButton>
				<Modal.Title>
					<span className="">
						{showForgot && (
							<button className='btn btn-sm btn-dark me-2'>
                <i onClick={() => setShowForgot(false)} className="fa fa-chevron-left" />
              </button>
						)}
					</span>
					<span className="pull-left pl-5">Admin login</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-dark text-white rounded-bottom">
        <LoginForm
          ddForgot={(b) => setShowForgot(b)}
          dForgot={showForgot}
          showForgot={(bool) => setShowForgot(bool)}  
          validate={(bool, lastLogin, cObj) => {
            setAuth(bool);
          }}
        />
				<div className='text-center text-danger'>{JSON.stringify(auth)}</div>
			</Modal.Body>
		</Modal>
	);
}

export default BackendUpdate;
