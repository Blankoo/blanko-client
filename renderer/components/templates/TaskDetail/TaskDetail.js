import React from 'react'

import styles from './taskDetailStyle'

class TaskDetail extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		const { selectedTask, toggle } = this.props;

		return(
			<div className={`taskDetail ${this.props.toggle ? 'show' : ''}`}>
				<div className="taskDetailTile">
					<span className="closeTaskDetail" onClick={this.props.close}><img src="../../static/plus-large.svg"/></span>
					<h1 className="mainTitle">{ selectedTask.title }</h1>
					{ selectedTask.subTitle && <p className="description">{ selectedTask.subTitle }</p> }
					<div className="dates">
						<div className="dateItem">
							<span className="label">Task due date</span>
							<span className="date">21-08-2012</span>
						</div>
						<div className="dateItem">
							<span className="label">Task due date</span>
							<span className="date">21-08-2012</span>
						</div>
					</div>
				</div>
				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default TaskDetail;
