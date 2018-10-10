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
		const {
      projects,
      activeProjectId,
      selectedProjectId,
      favorite,
      className,
      toggleModal,
      setProjectFavorite,
      selectProject
    } = this.props

		return(
			<div className={className}>
				<div className="label">
					{ className }
					{!favorite && <span className="add-project" onClick={e => toggleModal('addProjectModalVisible', true)}>
						<img src="/static/plus-large.svg"/>
					</span>}
				</div>

				{projects !== undefined && <div>

					<ul className="projects-list">{
						projects.filter(project => project !== null && project.favorite === favorite)
							.map((project, i) => {

								return(
									<li key={i} className={selectedProjectId === project._id ? 'active' : ''}
										onClick={e => selectProject(project._id)}>
										<span title={project.projectTitle}>{ project.projectTitle }</span>
										<span className="set-favorite" onClick={ e => setProjectFavorite(e, project._id, !project.favorite)}>
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
