import React from 'react'
import styles from './LogoutConfirmationStyle'
import Button from '../../atoms/Button'

export default ({ visible, logoutUser, toggleLogoutConfirmation }) => (
	<div>
		{ visible && <div className="modal-container">
			<div className="modal-content">
				<h2>Are you sure you want to logout?</h2>

				<div className="button-container">
					<Button text="Logout" type='delete' onClick={logoutUser}/>
					<Button text="cancel" type="submit" onClick={toggleLogoutConfirmation}/>
				</div>
			</div>
			<style jsx>{ styles }</style>
		</div>}
	</div>
)
