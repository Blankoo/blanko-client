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
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
									  <path fill="#7A848F" d="M424.707511,20.0000834 L427.853411,16.8540516 C428.048863,16.6587588 428.048863,16.3418875 427.853411,16.1465947 C427.65796,15.9511351 427.341435,15.9511351 427.145984,16.1465947 L424.000083,19.2926265 L420.854016,16.1465947 C420.658565,15.9511351 420.34204,15.9511351 420.146589,16.1465947 C419.951137,16.3418875 419.951137,16.6587588 420.146589,16.8540516 L423.292656,20.0000834 L420.146589,23.1461152 C419.951137,23.341408 419.951137,23.6582793 420.146589,23.8535721 C420.244314,23.9511351 420.372392,24 420.500302,24 C420.628213,24 420.75629,23.9511351 420.854016,23.8534053 L424.000083,20.7073735 L427.145984,23.8534053 C427.24371,23.9511351 427.371787,24 427.499698,24 C427.627608,24 427.755686,23.9511351 427.853411,23.8534053 C428.048863,23.6581125 428.048863,23.3412412 427.853411,23.1459484 L424.707511,20.0000834 Z" transform="translate(-420 -16)"/>
									</svg>
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
