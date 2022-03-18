import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from './loginForm';
import ResetForm from './resetForm';
import ChangePassword from './changePassword';
import { UserContext } from "../../contexts/UserContext";

function AdminLogin(props) {
	const { onClose, onSuccess } = props;
	const userContext = useContext(UserContext);
	const [ view, setView ] = useState("Admin login");

	return (
		<Modal {...props} className="" size={'sm'} centered>
			<Modal.Header>
				<Modal.Title>
						{view !== "Admin login" && (
							<button onClick={() => setView("Admin login")} className="btn btn-sm btn-default me-2">
								<i className="fa fa-chevron-left" />
							</button>
						)}
					<span className="pl-5">{view}</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={`rounded-bottom ${userContext.userData.theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-dark'}`}>
				<div className='text-dark'>
					{view === "Admin login" && <LoginForm onToggle={(val) => setView(val)} onClose={onClose} onSuccess={onSuccess} />}
					{view === 'Reset password' && <ResetForm onClose={onClose} />}
					{view === 'Change password' && <ChangePassword onClose={onClose} />}
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default AdminLogin;
