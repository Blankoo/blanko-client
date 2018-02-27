import React, { Component } from 'react'

//Components
import ListViewItem from '../../organisms/ListViewItem'

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
			<div className="list-view">
				{tasks.map((task, i) =>
					<ListViewItem
						key={i}
						task={task}
						isCheckedToggle={isCheckedToggle(task)}
						isSelected={isSelected(task)}
						setTaskActive={e => this.props.setTaskActive(e, task._id)}
						updateTaskStatus={e => this.props.updateTaskStatus(e, i, task._id, task)}
					/>
				)}
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListView
