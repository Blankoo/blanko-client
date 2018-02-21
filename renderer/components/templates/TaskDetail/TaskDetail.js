import React from 'react'

// Components
import Checkbox from '../../atoms/form/Checkbox'

// Style
import styles from './taskDetailStyle'

class TaskDetail extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { selectedTask, updateTaskStatus, isDetailShown, hideTaskDetail} = this.props

		return(
			<div className={`task-detail ${isDetailShown && selectedTask !== undefined ? 'show' : ''}`} onKeyUp={e => this.props.keyup(e)}>
					<div className="task-detail-tile">
						{selectedTask !== undefined &&
							<div className="task-detail-tile-container">
								<span className="close-task-detail" onClick={ hideTaskDetail }>
									<img src="../../static/plus-large.svg"/>
								</span>
								<Checkbox
									check={selectedTask.status === 'todo' ? false : true}
									onClick={e => updateTaskStatus(e, 0, selectedTask._id, selectedTask)}
								/>
									<h1 className="main-title">{ selectedTask.title }</h1>
									{ selectedTask.subTitle &&
										<p className="description">{ selectedTask.subTitle }</p>
									}
									<div className="labels">
										<div className="label-item">
											<label>Task due date</label>
											<span className="status">21-08-2012</span>
										</div>
										<div className="label-item">
											<label>Task status</label>
											<span className="status">{ selectedTask.status.toUpperCase() }</span>
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
