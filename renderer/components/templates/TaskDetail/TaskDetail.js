import React from 'react'

// Components
import Checkbox from '../../atoms/form/Checkbox'
import Button from '../../atoms/Button'
import InputText from '../../atoms/form/InputText'
import TimeMeasurement from '../../molecules/TimeMeasurement'

// Style
import styles from './taskDetailStyle'

// utils
import put from '../../../utils/put'
import get from '../../../utils/get'

class TaskDetail extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			subTaskTypedValue: '',
			isAddingSubTask: false
		}

		this.onType = this.onType.bind(this)
		this.onKeyUp = this.onKeyUp.bind(this)
		this.toggleAddSubTask = this.toggleAddSubTask.bind(this)
	}

	onType(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	toggleAddSubTask() {
		this.setState(prevState => ({ isAddingSubTask: !prevState.isAddingSubTask }))
	}

	onKeyUp(e) {
		if(e.key === 'Escape') {
			this.toggleAddSubTask()
		} else if(e.key === 'Enter') {
			if(e.target.value.length > 1) {
				this.props.addSubTaskToTask(this.state.subTaskTypedValue)
				this.setState({
					subTaskTypedValue: ''
				}, () => {
					this.toggleAddSubTask()
				})
			} else {
				console.error('Not longer then 1 char.')
			}
		}
	}

	render() {
		const {
			selectedTask,
			updateTaskStatus,
			isDetailShown,
			hideTaskDetail,
			updateSubTaskStatus,
			deleteTask,
			deleteSubTask,
			measurements
		} = this.props

		return(
			<div className={`task-detail ${isDetailShown && selectedTask !== undefined ? 'show' : ''}`}>
					<div className="task-detail-tile">
						{selectedTask !== undefined &&
							<div className="task-detail-tile-container">
								<span className="close-task-detail" onClick={ hideTaskDetail }>
									<img src="../../static/plus-large.svg"/>
								</span>
								<Checkbox
									check={selectedTask.status === 'todo' ? false : true}
									onClick={e => updateTaskStatus(e, 0, selectedTask._id, selectedTask)}
									className="taskdetail"
								/>
									<h1 className="main-title">{ selectedTask.title }</h1>
									{ selectedTask.subTitle &&
										<p className="description">{ selectedTask.subTitle }</p>
									}

									<div className="subtask-list">
										{selectedTask.subTasks.map((task, idx) =>

											<div className="subtask" key={idx}>
												<Checkbox
													check={task.status === 'done'}
													onClick={e => this.props.updateSubTaskStatus(task)}
													className="subtask-checkbox"
												/>
												<span className={task.status === 'done' ? 'checked' : null}>
													{ task.title }
												</span>
												<span
													onClick={e => deleteSubTask(e, selectedTask._id, task.id)}
													className="delete-subtask">X
												</span>
											</div>

										)}

										<div className="add-sub-task" onKeyUp={this.onKeyUp}>
											{this.state.isAddingSubTask ?
												<InputText autofocus name="subTaskTypedValue" value={this.state.subTaskTypedValue}
													onChange={this.onType}/>
												:
												<Button type="submit" onClick={this.toggleAddSubTask} text="Add Sub Task" style={{ fontSize: 10 }}/>
											}
										</div>
									</div>

									<TimeMeasurement
										selectedTask={selectedTask}
										putNewTimeMeasurement={this.props.putNewTimeMeasurement}
										measurements={measurements}
									/>

									<div className="controllers">
										<Button text="edit" type="default" onClick={e => console.log('edit') }/>
										<Button text="delete" type="delete" onClick={e => this.props.deleteTask(e, selectedTask._id)} />
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
