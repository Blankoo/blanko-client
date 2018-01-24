import React, { Component } from 'react'

//
import Checkbox from '../../atoms/form/Checkbox';

// Style import
import styles from './listViewStyle'

class ListView extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { tasks, selectedTaskId } = this.props
		const isCheckedToggle = task => (task.status === 'done' ? ' checked ' : '')
		const isSelected = task => (task._id === selectedTaskId ? ' active ' : '')

		return (
			<div className="listView">
				{tasks.map((task, i) =>

					<div
						key={i} className={'single ' + isCheckedToggle(task) + isSelected(task)}
						onClick={e => this.props.setTaskActive(task._id)}
					>

						<Checkbox
							check={task.status === 'done'}
							onClick={ e => this.props.updateTaskStatus(e, i, task._id, task) }
						/>

						<div className="taskTitle">
							<h4>{ task.title }</h4>
							<p>{ task.subTitle }</p>
						</div>
						{/*<span onClick={ e => this.props.deleteTask(e, i, task._id) } className="delete">X</span>*/}
					</div>

				)}

				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListView
