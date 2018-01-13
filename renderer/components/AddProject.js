import React from 'react'
import Input from './atoms/form/InputText'
import ButtonSubmit from './atoms/form/ButtonSubmit'

import add from '../utils/add'

class AddProject extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			projectTitle: '',
			projectDescription: '',
			favorite: false
		}

		this.getInputValue = this.getInputValue.bind(this)
	}

	getInputValue(e) {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div className="addProject">
				<Input onChange={this.getInputValue} name="projectTitle"/>
				<Input onChange={this.getInputValue} name="projectDescription"/>
				<br/>
				<ButtonSubmit
					disabled={this.state.projectTitle.length < 2}
					buttonText="Add project"
					onClick={e => this.props.addProjectToAccount(this.state)}
				/>
			</div>)
	}
}

export default AddProject;
