import React, {Component} from 'react'

import styles from './InputTextStyle'

class InputText extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<input
					type="text"
					placeholder={this.props.placeholder}
					name={this.props.name}
					autoFocus={this.props.autofocus}
					disabled={this.props.disabled}
					onChange={this.props.onChange}/>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

InputText.propTypes = {
	placeholder: React.PropTypes.string,
	name: React.PropTypes.string,
	autoFocus: React.PropTypes.bool,
	disabled: React.PropTypes.bool,
	onChange: React.PropTypes.func
}

export default InputText
