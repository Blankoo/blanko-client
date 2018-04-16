import React, {Component} from 'react'

import styles from './loaderStyle'

class Loader extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		const classNames = this.props.loading
			? 'loader active'
			: 'loader'

		return (<div className={classNames}>
			<div className="loader-icon">
				<div className="loading">
					<div className="circle"></div>
					<div className="circle two"></div>
					<div className="circle three"></div>
				</div>
			</div>

			<style jsx="jsx">{ styles }</style>
		</div>)
	}
}

export default Loader
