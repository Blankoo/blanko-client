import React, { Component } from 'react'
import styles from './projectViewStyle'

// Components
import Kanban from '../../organisms/Kanban'
import ListView from '../../templates/ListView'

class Project extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

    const { tasks, kanban, columns, updateTaskStatus, deleteTask } = this.props

		return(
			<div className="project">
				{ tasks.length !== 0 && kanban ?
					<Kanban tasks={ tasks } columns={ columns } deleteTask={ this.deleteTask }/>
					:
					<ListView tasks={ tasks } updateTaskStatus={ updateTaskStatus } deleteTask={ deleteTask }/>
				}

				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default Project;
