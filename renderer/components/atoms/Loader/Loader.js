import React, {Component} from 'react'

import styles from '../../../styles/components/atoms/loader'

class Start extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		const classNames = this.props.loading ? 'loader active' : 'loader'

		return (
			<div className={classNames}>
				<div className="loader-icon">
					LOADING
				</div>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default Start
