import React, { Component } from 'react'
import styles from './checkboxStyle'

const Checkbox = ({ check, className, onClick }) => (
	<div className={`checkbox ${check ? 'checked' : ''} ${className}`} onClick={onClick}>
		{
			check && <img src="../../static/checked-v.svg"/>
		}
		<style jsx>{ styles }</style>
	</div>
)

Checkbox.propTypes = {
	check: React.PropTypes.bool,
}


export default Checkbox
