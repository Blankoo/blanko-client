import React, { Component } from 'react'
import styles from '../styles/components/sidebar'
import ProjectList from './ProjectList'
import AddProject from './AddProject'

class SideBar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: 'sidebar'
		}
	}

	render() {
		return (
			<div className="sidebar">
				<div className="blanko">Blanko.</div>
				<ProjectList
					className="favorites"
					favorite={true}
					projects={this.props.projects}
					selectedProjectId={this.props.selectedProjectId}
					activeProjectId={this.props.activeProjectId}
					selectProject={this.props.selectProject}
				/>

				<ProjectList
					className="projectList"
					favorite={false}
					projects={this.props.projects}
					selectedProjectId={this.props.selectedProjectId}
					activeProjectId={this.props.activeProjectId}
					selectProject={this.props.selectProject}
				/>

			<AddProject addProjectToAccount={this.props.addProjectToAccount}/>

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default SideBar
