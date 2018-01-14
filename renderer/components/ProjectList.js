import React from 'react'
import styles from '../styles/components/projectList'
import get from '../utils/get'

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
				<div className="label">{ this.props.className }</div>

				{projects !== undefined && <div>

					<ul className="projects-list">{
						projects.filter(project => project !== null && project.favorite === favorite).map((project, i) => {

							return(
								<li key={i} className={selectedProjectId === project._id ? 'active' : ''}
									onClick={e => this.props.selectProject(project._id)}>
									{ project.projectTitle }
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
