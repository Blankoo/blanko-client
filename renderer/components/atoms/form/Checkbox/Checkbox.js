import React, { Component } from 'react'

import styles from './checkboxStyle'

class Checkbox extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
				<div
					className={`checkbox ${this.props.check ? 'checked' : ''}`}
					check={this.props.check}
					onClick={this.props.onClick}>
					<style jsx>{ styles }</style>
				</div>
		)
	}
}

Checkbox.propTypes = {
	check: React.PropTypes.bool,
}


export default Checkbox
