import React, {Component} from 'react'

import styles from './inputPasswordStyle'

class InputPassword extends Component {
	constructor(props) {
		super(props)

		this.state = {
			type: 'input'
		}

		this.showHideToggle = this.showHideToggle.bind(this)
	}

	showHideToggle(e) {
		e.preventDefault()
		this.setState({
			type: this.state.type === 'input' ? 'password' : 'input'
		})
	}

	render() {
		return (
			<div>
				<input
					type={this.state.type}
					name={this.props.name}
					autoFocus={this.props.autofocus}
					disabled={this.props.disabled}
					onChange={this.props.onChange}/>
				<span className="show-hide-toggle" onClick={this.showHideToggle}>
					{this.state.type === 'input' ? 'Hide' : 'Show'}
				</span>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

InputPassword.propTypes = {
	name: React.PropTypes.string,
	autoFocus: React.PropTypes.bool,
	disabled: React.PropTypes.bool,
	onChange: React.PropTypes.func
}

export default InputPassword
