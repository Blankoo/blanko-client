import React from 'react'

import ListView from './ListView'
import AddTask from './AddTask'

import styles from '../styles/components/activeProject'

class ActiveProject extends React.Component {
	render() {
		return(<div className="activeProject">
			<h1 className="mainTitle">Active Project Title</h1>
			<p className="description">Description of the project Sed lacinia, justo lacinia congue scelerisque, uctor diam elit in urna.</p>

			<div className="label">Today</div>

			<ListView tasks={ this.props.tasks } updateTaskStatus={this.props.updateTaskStatus} deleteTask={ this.props.deleteTask }/>

			<AddTask addNewTask={this.props.addNewTask}/>

			{/*<div>today</div>
			<div>Tommorow</div>
			<div>Backlog</div>
			<div>Tasks</div>*/}

			<style jsx>{styles}</style>
		</div>)
	}
}

export default ActiveProject;
