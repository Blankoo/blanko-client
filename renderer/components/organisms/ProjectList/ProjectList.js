import React from 'react'
import styles from './projectListStyle'
import get from '../../../utils/get'

import ProjectMenu from '../../molecules/ProjectMenu'

const listStyle = {
	lineHeight: 2.6
}

class ProjectList extends React.Component {
	constructor(props) {
		super(props)
	}

 	selectProjectCheck(e) {
		if(e.target.classList[0] !== 'action-bar-icon') {
			this.props.selectProject(this.props.project._id)
		}
	}

	render() {
		const { projects, activeProjectId, selectedProjectId, favorite } = this.props

		return (
			<div className={this.props.className}>
				<div className="label">
					{ this.props.className }
					{!favorite && <span className="add-project" onClick={e => this.props.toggleModal('addProjectModalVisible', true)}>
						<img src="/static/plus-large.svg"/>
					</span>}
				</div>

				{projects !== undefined &&
					<ul className="projects-list">{
						projects
							.filter(project => project !== null && project.favorite === favorite)
							.map((project, i) => {
								const { _id, projectTitle, favorite } = project

								return (
									<li
										key={i}
										className={selectedProjectId === _id ? 'active' : ''}
										onClick={e => this.props.selectProject(_id)}
									>
										<span title={ projectTitle }>{ projectTitle }</span>
										<ProjectMenu
											iconVisibility={true}
											project={{ favorite: favorite, _id: _id }}
											setProjectFavorite={this.props.setProjectFavorite}
											deleteProject={this.props.deleteProject}
										/>
									</li>
								)

						})
					}</ul>}

				<style jsx>{styles}</style>
			</div>
		)
	}
}

export default ProjectList;
