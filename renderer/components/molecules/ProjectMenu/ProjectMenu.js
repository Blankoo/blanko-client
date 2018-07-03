import React, { Component } from 'react'
import styles from './ProjectMenuStyles'

class ProjectMenu extends Component {
	constructor(props) {
		super(props)

		this.state = { menuVisibility: false }

		this.showMenuPopOver = this.showMenuPopOver.bind(this)
		this.hideMenuPopOver = this.hideMenuPopOver.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.iconVisibility) {
			this.setState({
				menuVisibility: false
			})
		}
	}

	showMenuPopOver() {
		this.setState((prevState) => ({ menuVisibility: true }))
	}

	hideMenuPopOver() {
			this.setState((prevState) => ({ menuVisibility: false }))
	}

	render() {
		const { project, setProjectFavorite, iconVisibility, deleteProject } = this.props
		const { menuVisibility } = this.state

		return (
			<div className='action-bar' onClick={ this.showMenuPopOver } onMouseLeave={this.hideMenuPopOver}>
				{ iconVisibility &&
					<span className="action-bar-icon">
						<img src="../../static/kebab-menu.svg"/>
					</span>
				}
				{
					menuVisibility &&
					<div className="action-bar-menu">
						<ul>
							<li onClick={ e => {
									setProjectFavorite(e, project._id, !project.favorite)
									this.hideMenuPopOver()
								}}>Favorite</li>
							<li onClick={e => {
									deleteProject(project._id)
									this.hideMenuPopOver()
								}} style={{color: '#fb1c1c'}}>Delete</li>
						</ul>
					</div>
				}
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ProjectMenu
