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
    const { tasks, selectedTaskId, setTaskActive, updateTaskStatus, updateTaskTitles } = this.props
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
						setTaskActive={e => setTaskActive(e, task._id)}
						updateTaskStatus={e => updateTaskStatus(e, i, task._id, task)}
						updateTaskTitles={updateTaskTitles}
					/>
				)}
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListView
