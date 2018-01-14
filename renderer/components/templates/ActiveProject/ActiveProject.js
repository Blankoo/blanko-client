import React from 'react'

import ListView from '../../organisms/ListView'
import AddTask from '../../molecules/AddTask'

import styles from './activeProjectStyle'

class ActiveProject extends React.Component {
	render() {
		const { projectTitle, projectDescription } = this.props.activeProject

		return(<div className="activeProject">
			<h1 className="mainTitle">{ projectTitle }</h1>
			<p className="description">{ projectDescription }</p>

			<div className="label">Today</div>

			<ListView tasks={ this.props.tasks } updateTaskStatus={this.props.updateTaskStatus} deleteTask={ this.props.deleteTask }/>

			<AddTask addNewTask={this.props.addNewTask}/>

			<style jsx>{styles}</style>
		</div>)
	}
}

export default ActiveProject;
