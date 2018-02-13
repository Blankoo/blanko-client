import React from 'react'

// Components
import Checkbox from '../../atoms/form/Checkbox'

// Style
import styles from './taskDetailStyle'

class TaskDetail extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
		//Receive props
	}

	render() {

		const { selectedTask, updateTaskStatus, toggleTaskDetail, hideTaskDetail} = this.props

		return(
			<div className={`task-detail ${toggleTaskDetail ? 'show' : ''}`}>
					<div className="task-detail-tile">
						{selectedTask !== undefined &&
							<div className="task-detail-tile-container">
								<span className="close-task-detail" onClick={ hideTaskDetail }><img src="../../static/plus-large.svg"/></span>
								<Checkbox
									check={selectedTask.status === 'todo' ? false : true}
									onClick={e => updateTaskStatus(e, 0, selectedTask._id, selectedTask)}
								/>
									<h1 className="main-title">{ selectedTask.title }</h1>
									{ selectedTask.subTitle && <p className="description">{ selectedTask.subTitle }</p> }
									<div className="dates">
										<div className="date-item">
											<span className="label">Task due date</span>
											<span className="date">21-08-2012</span>
										</div>
										<div className="date-item">
											<span className="label">Task status</span>
											<span className="date">21-08-2012</span>
										</div>
									</div>
							</div>
						}
					</div>
					<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default TaskDetail;
