import React from 'react'
import styles from './ModalContainerStyle'

import InputText from '../form/InputText'
import Textarea from '../form/Textarea'
import ButtonSubmit from '../form/ButtonSubmit'

const offset = {
	marginTop: 16,
	marginBottom: 4,
	display: 'block'
}

class ModalContainer extends React.Component {
	render() {
		return(
			<div className="modal-container">
				<div className="modal-content">
					<h1>Add Project</h1>

					<label style={offset}>Project title</label>
					<InputText />

					<label style={offset}>Project Description</label>
					<Textarea />

					<div style={{ ...offset, ...{ display: 'flex', justifyContent: 'flex-end' }}}>
						<ButtonSubmit style={{marginRight: 8}} invert buttonText="cancel"/>
						<ButtonSubmit buttonText="Save"/>
					</div>
				</div>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ModalContainer
