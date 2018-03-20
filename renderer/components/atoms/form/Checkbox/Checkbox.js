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
					onClick={this.props.onClick}>
					<style jsx>{ styles }</style>
				</div>
		)
	}
}

export default Checkbox
