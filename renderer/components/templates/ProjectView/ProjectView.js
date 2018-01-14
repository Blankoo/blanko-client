import React, { Component } from 'react'
import styles from './projectViewStyle'

// Components
import Kanban from '../../organisms/Kanban'
import ListView from '../../organisms/ListView'

class Project extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div className="project">
				{ this.props.tasks.length !== 0 && this.props.kanban ?
					<Kanban tasks={ this.props.tasks } columns={this.props.columns} deleteTask={ this.deleteTask }/>
					:
					<ListView tasks={ this.props.tasks } updateTaskStatus={this.props.updateTaskStatus} deleteTask={ this.props.deleteTask }/>
				}

				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default Project;
