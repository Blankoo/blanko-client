import React from 'react'

import ListView from '../../templates/ListView'
import AddTask from '../../molecules/AddTask'
import FilterTasks from '../..//molecules/FilterTasks'
import Button from '../../atoms/Button'

import styles from './activeProjectStyle'

class ActiveProject extends React.Component {
	constructor(props) {
		super(props)

		this.state = { isAddingTask: false }

		this.onKeyUp = this.onKeyUp.bind(this)
		this.showAddTask = this.showAddTask.bind(this)
		this.hideAddTask = this.hideAddTask.bind(this)
	}

	showAddTask() {
		this.setState({ isAddingTask: true })
		window.scrollTo(0, document.querySelector('.active-project').scrollHeight)
	}

	hideAddTask() {
		this.setState({ isAddingTask: false })
	}

	onKeyUp(e) {
		if((e.key === 'Escape' && this.state.isAddingTask) || (e.key === 'Enter')) {
			this.hideAddTask()
		}
	}

	render() {
		const {
			activeProject,
			tasks,
			updateTaskStatus,
			updateTaskTitles,
			deleteTask,
			addNewTask,
			filteredValue,
			setFilteredValue,
			setTaskActive,
			selectedTaskId
		} = this.props
		const { projectTitle, projectDescription } = activeProject

		return(<div className="active-project" onKeyUp={ this.onKeyUp }>
			<h1 className="mainTitle" ref="activeProjectTitle">{ projectTitle }</h1>
			{ projectDescription && <p className="description" ref="activeProjectDescription">{ projectDescription }</p> }

			<FilterTasks
				filteredValue={ filteredValue }
				setFilteredValue={ setFilteredValue }
				toggleAddTask={ this.showAddTask }
			/>

			<div className="label">
				{filteredValue === 'done' ? 'done' : filteredValue === 'todo' ? 'todo' : 'all' }
			</div>

			<ListView
				tasks={ tasks }
				updateTaskStatus={ updateTaskStatus }
				updateTaskTitles={ updateTaskTitles }
				deleteTask={ deleteTask }
				setTaskActive={ setTaskActive }
				selectedTaskId={ selectedTaskId }
			/>

			{
				this.state.isAddingTask || tasks.length === 0 ?
				<AddTask addNewTask={ addNewTask } onKeyUp={this.onKeyUp}/>
				:
				<Button onClick={ this.showAddTask } text="Add Task"/>
			}

			<style jsx>{styles}</style>
		</div>)
	}
}

export default ActiveProject;
