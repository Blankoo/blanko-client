import React from 'react'

import ListView from '../../organisms/ListView'
import AddTask from '../../molecules/AddTask'
import FilterTasks from '../..//molecules/FilterTasks'

import styles from './activeProjectStyle'

class ActiveProject extends React.Component {
	render() {
		const { activeProject, tasks, updateTaskStatus, deleteTask, addNewTask } = this.props
		const { projectTitle, projectDescription } = activeProject

		return(<div className="activeProject">
			<h1 className="mainTitle">{ projectTitle }</h1>
			{ projectDescription && <p className="description">{ projectDescription }</p> }

			<FilterTasks
				filteredValue={this.props.filteredValue}
				setFilteredValue={this.props.setFilteredValue}
			/>

			<div className="label">To Do:</div>

			<ListView tasks={ tasks } updateTaskStatus={ updateTaskStatus } deleteTask={ deleteTask }/>

			<AddTask addNewTask={ addNewTask }/>

			<style jsx>{styles}</style>
		</div>)
	}
}

export default ActiveProject;
