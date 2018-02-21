import React, { Component } from 'react'
import styles from './sidebarStyle'
import ProjectList from '../../organisms/ProjectList'

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
				<div className="blanko-small">B.</div>
				<ProjectList
					className="favorites"
					favorite={true}
					projects={this.props.projects}
					selectedProjectId={this.props.selectedProjectId}
					activeProjectId={this.props.activeProjectId}
					selectProject={this.props.selectProject}
					setProjectFavorite={this.props.setProjectFavorite}
				/>

				<ProjectList
					className="projectList"
					favorite={false}
					projects={this.props.projects}
					selectedProjectId={this.props.selectedProjectId}
					activeProjectId={this.props.activeProjectId}
					selectProject={this.props.selectProject}
					setProjectFavorite={this.props.setProjectFavorite}
					toggleModal={this.props.toggleModal}
				/>

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default SideBar
