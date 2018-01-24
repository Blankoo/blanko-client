import React from 'react'

import ListView from '../../organisms/ListView'
import AddTask from '../../molecules/AddTask'
import FilterTasks from '../..//molecules/FilterTasks'
import Button from '../../atoms/FilterButton'

import styles from './activeProjectStyle'

class ActiveProject extends React.Component {
	constructor(props) {
		super(props)

		this.state = { isAddingProject: false }

		this.toggleAddProject = this.toggleAddProject.bind(this)
		this.onKeyUp = this.onKeyUp.bind(this)
	}

	toggleAddProject() {
		console.log('toggle add project');
		this.setState(prevState => ({ isAddingProject: !prevState.isAddingProject}))
	}

	onKeyUp(e) {
		if(e.key === 'Escape' || e.key === 'Enter') {
			this.toggleAddProject()
		}
	}

	render() {
		const { activeProject, tasks, updateTaskStatus, deleteTask, addNewTask, filteredValue, setFilteredValue } = this.props
		const { projectTitle, projectDescription } = activeProject

		return(<div className="activeProject" onKeyUp={this.onKeyUp}>
			<h1 className="mainTitle">{ projectTitle }</h1>
			{ projectDescription && <p className="description">{ projectDescription }</p> }

			<FilterTasks
				filteredValue={filteredValue}
				setFilteredValue={setFilteredValue}
				toggleAddProject={this.toggleAddProject}
			/>

			<div className="label">
				{ filteredValue === 'done' ? 'DONE' : 'To Do:' }
			</div>

			<ListView tasks={ tasks } updateTaskStatus={ updateTaskStatus } deleteTask={ deleteTask }/>

			{
				this.state.isAddingProject ?
				<AddTask addNewTask={ addNewTask } onKeyUp={this.onKeyUp}/>
				:
				<Button onClick={this.toggleAddProject} text="Add Task" style={{ fontSize: 8}}/>
			}

			<style jsx>{styles}</style>
		</div>)
	}
}

export default ActiveProject;
