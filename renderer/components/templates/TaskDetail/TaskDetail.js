import React from 'react'

import styles from './taskDetailStyle'

class TaskDetail extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			toggleTaskDetail: false
		}

		this.closeTaskDetail = this.closeTaskDetail.bind(this)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedTask !== this.props.selectedTask) {
			this.setState({
				toggleTaskDetail: true
			})
		}
	}

	closeTaskDetail = () => {
		this.setState({
			toggleTaskDetail: false
		})
	}

	render() {

		const { selectedTask } = this.props;

		return(
			<div className={`taskDetail ${this.state.toggleTaskDetail ? 'show' : ''}`}>
				<div className="taskDetailTile">
					<h1 className="mainTitle">Title here!</h1>
					<span onClick={e => this.closeTaskDetail(e)}><img src="../../static/plus-large.svg"/></span>
				</div>
				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default TaskDetail;
