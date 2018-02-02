import React, {Component} from 'react'

import styles from './textareaStyle'

class Textarea extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<textarea
					name={this.props.name}
					maxLength={this.props.maxLength}
					disabled={this.props.disabled}
					autoFocus={this.props.autofocus}
					style={this.props.style}
					onChange={this.props.onChange}
					placeholder={this.props.placeholder}>
					{this.props.textareaText}
				</textarea>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

Textarea.propTypes = {
	name: React.PropTypes.string,
	maxLength: React.PropTypes.integer,
	disabled: React.PropTypes.bool,
	autofocus: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	textareaText: React.PropTypes.string
}

export default Textarea
