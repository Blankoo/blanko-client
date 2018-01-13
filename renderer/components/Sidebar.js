import React, { Component } from 'react'
import styles from '../styles/components/sidebar'
import ProjectList from './ProjectList'

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
				<div className="favorites">
					<span className="title">favorites</span>
				</div>

				<ProjectList
					className="projectList"
					projects={this.props.projects}
					selectedProjectId={this.props.selectedProjectId}
					activeProjectId={this.props.activeProjectId}
					selectProject={this.props.selectProject}
				/>

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default SideBar
