import React, { Component } from 'react'

import Checkbox from '../../atoms/form/Checkbox';

// Style import
import styles from './listViewStyle'

class ListView extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { tasks, selectedTaskId, setTaskActive, updateTaskStatus } = this.props
		const isCheckedToggle = task => (task.status === 'done' ? ' checked ' : '')
		const isSelected = task => (task._id === selectedTaskId ? ' active ' : '')

		return (
			<div className="listView">
				{tasks.map((task, i) =>

					<div
						key={i} className={'single ' + isCheckedToggle(task) + isSelected(task)}
						onClick={e => setTaskActive(e, task._id)}
					>

						<Checkbox
							check={task.status === 'done'}
							onClick={ e => updateTaskStatus(e, i, task._id, task) }
						/>

						<div className="taskTitle">
							<h4>{ task.title }</h4>
							{ task.subTitle.length > 0 && <p>{ task.subTitle }</p>}
						</div>
					</div>

				)}

				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListView
