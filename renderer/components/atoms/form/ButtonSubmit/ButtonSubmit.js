import React, {Component} from 'react'

import styles from './buttonSubmitStyle'

class ButtonSubmit extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<button
					type="button"
					className={this.props.invert ? 'inverted' : ''}
					name={this.props.name}
					disabled={this.props.disabled}
					autoFocus={this.props.autofocus}
					style={this.props.style}
					onClick={this.props.onClick}>
					{this.props.buttonText}
				</button>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

ButtonSubmit.propTypes = {
	name: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	autofocus: React.PropTypes.bool,
	onClick: React.PropTypes.func.isRequired,
	buttonText: React.PropTypes.string
}

export default ButtonSubmit
