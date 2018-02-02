import React from 'react'
import styles from './AddProjectModalStyle'

import InputText from '../../atoms/form/InputText'
import Textarea from '../../atoms/form/Textarea'
import ButtonSubmit from '../../atoms/form/ButtonSubmit'

const offset = {
	marginTop: 8 * 3,
	marginBottom: 4,
	display: 'block'
}

class ModalContainer extends React.Component {
	constructor() {
		super()
		this.state = {
			projectTitle: '',
			projectDescription: '',
			favorite: false
		}

		this.onType = this.onType.bind(this)
	}

	onType(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		return(
			<div>
				{this.props.visible && <div className="modal-container">
					<div className="modal-content">
						<h2>Add Project</h2>

						<label className="label" style={offset}>Project title</label>
						<InputText onChange={e => this.onType(e)} name="projectTitle"/>

						<label className="label" style={offset}>Project Description</label>
						<Textarea onChange={e => this.onType(e)} name="projectDescription"/>

						<div style={{ ...offset, ...{ display: 'flex', justifyContent: 'flex-end' }}}>
							<ButtonSubmit style={{marginRight: 8}} invert buttonText="cancel" onClick={e => this.props.toggleModal('addProjectModalVisible', false)}/>
							<ButtonSubmit buttonText="Save" onClick={e => this.props.addProjectToAccount(this.state, this.props.toggleModal)}/>
						</div>
					</div>
					<style jsx>{ styles }</style>
				</div>}
			</div>
		)
	}
}

export default ModalContainer
