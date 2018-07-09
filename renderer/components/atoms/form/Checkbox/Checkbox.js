import React, { Component } from 'react'
import styles from './checkboxStyle'

const Checkbox = ({ check, className, onClick }) => (
	<div className={`checkbox ${check ? 'checked' : ''} ${className}`} onClick={onClick}>
		{
			check && <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6">
			  <path fill="#007AFF" d="M4.10384615,8.3 C4.03461538,8.24 4,8.15 4,8.09 C4,8.03 4.03461538,7.94 4.10384615,7.88 L4.58846154,7.46 C4.72692308,7.34 4.93461538,7.34 5.07307692,7.46 L5.10769231,7.49 L7.01153846,9.26 C7.08076923,9.32 7.18461538,9.32 7.25384615,9.26 L11.8923077,5.09 L11.9269231,5.09 C12.0653846,4.97 12.2730769,4.97 12.4115385,5.09 L12.8961538,5.51 C13.0346154,5.63 13.0346154,5.81 12.8961538,5.93 L7.35769231,10.91 C7.28846154,10.97 7.21923077,11 7.11538462,11 C7.01153846,11 6.94230769,10.97 6.87307692,10.91 L4.17307692,8.39 L4.10384615,8.3 Z" transform="translate(-4 -5)"/>
			</svg>

		}
		<style jsx>{ styles }</style>
	</div>
)

Checkbox.propTypes = {
	check: React.PropTypes.bool,
}


export default Checkbox
