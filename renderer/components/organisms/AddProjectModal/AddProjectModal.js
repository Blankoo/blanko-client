import React from 'react'
import styles from './AddProjectModalStyle'

import InputText from '../../atoms/form/InputText'
import Textarea from '../../atoms/form/Textarea'
import Button from '../../atoms/Button'

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
		this.validateCheck = this.validateCheck.bind(this)
	}

	onType(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	validateCheck() {
		if(this.state.projectTitle !== '') {

			this.props.addProjectToAccount(this.state, this.props.toggleModal)

			this.setState({
				projectTitle: '',
				projectDescription: ''
			})
		}
	}

	render() {
		return(
			<div>
				{this.props.visible && <div className="modal-container">
					<div className="modal-content">
						<h2>Add Project</h2>

						<label className="label" style={offset}>Project title</label>
						<InputText onChange={e => this.onType(e)} name="projectTitle" autoFocus/>

						<label className="label" style={offset}>Project Description</label>
						<Textarea onChange={e => this.onType(e)} name="projectDescription"/>

						<div style={{ ...offset, ...{ display: 'flex', justifyContent: 'flex-end' }}}>
							<Button style={{marginRight: 8}} text="cancel" onClick={e => this.props.toggleModal('addProjectModalVisible', false)}/>
							<Button text="save" type={this.state.projectTitle !== '' ? 'submit' : 'disabled'} onClick={this.validateCheck}/>
						</div>
					</div>
					<style jsx>{ styles }</style>
				</div>}
			</div>
		)
	}
}

export default ModalContainer
