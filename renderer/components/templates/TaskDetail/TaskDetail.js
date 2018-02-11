import React from 'react'

// Components
import Checkbox from '../../atoms/form/Checkbox'

// Style
import styles from './taskDetailStyle'

class TaskDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle: this.props.toggle
		}

		this.closeTaskDetail = this.closeToggleDetail.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedTask === undefined) {
			this.setState({
				toggle: false,
			})
		}else {
			this.setState({
				toggle: true,
			})
		}
	}

	closeToggleDetail = () => {
		this.setState({
			toggle: false,
		})
	}

	render() {

		const { selectedTask, toggle, updateTaskStatus, close} = this.props

		return(
			<div className={`task-detail ${this.state.toggle ? 'show' : ''}`}>
					<div className="task-detail-tile">
						{selectedTask !== undefined &&
							<div className="task-detail-tile-container">
								<span className="close-task-detail" onClick={this.closeToggleDetail}><img src="../../static/plus-large.svg"/></span>
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
