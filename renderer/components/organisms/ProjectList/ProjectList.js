import React from 'react'
import styles from './projectListStyle'
import get from '../../../utils/get'

const listStyle = {
	lineHeight: 2.6
}

class ProjectList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { projects, activeProjectId, selectedProjectId, favorite } = this.props

		return(
			<div className={this.props.className}>
				<div className="label">
					{ this.props.className }
					{!favorite && <span className="add-project" onClick={e => this.props.toggleModal('addProjectModalVisible', true)}>
						<img src="/static/plus-large.svg"/>
					</span>}
				</div>

				{projects !== undefined && <div>

					<ul className="projects-list">{
						projects.filter(project => project !== null && project.favorite === favorite).map((project, i) => {

							return(
								<li key={i} className={selectedProjectId === project._id ? 'active' : ''}>
									<span onClick={e => this.props.selectProject(project._id)}
										title={project.projectTitle}>{ project.projectTitle }</span>
									<span className="set-favorite" onClick={ e => this.props.setProjectFavorite(e, project._id, !project.favorite)}>
										⭐
									</span>
								</li>
							)

						})
					}</ul>

				</div>}
				<style jsx>{styles}</style>
			</div>
		)
	}
}

export default ProjectList;
