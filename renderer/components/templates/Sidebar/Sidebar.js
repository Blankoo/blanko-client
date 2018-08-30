import React, { Component } from 'react'
import styles from './sidebarStyle'
import ProjectList from '../../organisms/ProjectList'

class SideBar extends Component {
	constructor(props) {
		super(props)
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
					deleteProject={this.props.deleteProject}
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
					deleteProject={this.props.deleteProject}
				/>


				<div className="bottom-bar">
					<span
						className={`all-tasks ${this.props.selectedProjectId === 'all-tasks' ? 'active' : ''}`}
						onClick={e => this.props.selectProject('all-tasks')}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8">
						  <path fill={`${this.props.selectedProjectId === 'all-tasks' ? '#1C87FB' : '#7A848F'}`} d="M70.9086175,866.165 C70.2129654,865.415 69.2840406,865 68.3009633,865 C67.317886,865 66.3889612,865.415 65.693309,866.165 L64.3769852,867.59 L65.3100755,868.6 L66.6055715,867.2 C67.0554543,866.715 67.6594637,866.445 68.3009633,866.445 C68.9424629,866.445 69.5464723,866.715 69.9963551,867.2 C70.4420724,867.68 70.6878417,868.32 70.6878417,869.005 C70.6878417,869.685 70.4420724,870.325 69.9963551,870.805 C69.5464723,871.29 68.9424629,871.56 68.3009633,871.56 C67.6594637,871.56 67.0554543,871.29 66.6055715,870.805 L62.3025254,866.17 C61.6068732,865.42 60.6779485,865.005 59.6948711,865.005 C58.7117938,865.005 57.782869,865.42 57.0872169,866.17 C56.3873991,866.92 56,867.925 56,869 C56,870.075 56.3873991,871.08 57.0872169,871.835 C57.782869,872.585 58.7117938,873 59.6948711,873 C60.6779485,873 61.6068732,872.585 62.3025254,871.835 L63.6188493,870.415 L62.6857589,869.405 L61.3944285,870.8 C60.9445457,871.285 60.3405363,871.555 59.6990367,871.555 C59.0575371,871.555 58.4535277,871.285 58.0036449,870.8 C57.5579276,870.32 57.3121583,869.68 57.3121583,869 C57.3121583,868.32 57.5579276,867.68 58.0036449,867.195 C58.4535277,866.71 59.0575371,866.44 59.6990367,866.44 C60.3405363,866.44 60.9445457,866.71 61.3944285,867.195 L65.6974746,871.83 C66.3931268,872.58 67.3220515,872.995 68.3051289,872.995 C69.2882062,872.995 70.217131,872.58 70.9127831,871.83 C71.6126009,871.075 72,870.07 72,868.995 C71.9958344,867.925 71.6084353,866.92 70.9086175,866.165 Z" transform="translate(-56 -865)"/>
						</svg>

					</span>

					<span className="logout-icon" onClick={e => this.props.toggleLogoutConfirmation()}>
						<svg width="31px" height="32px" viewBox="0 0 31 32" version="1.1">
						  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
						    <g className="logout-icon-path" fill="#7A848F" fillRule="nonzero">
						      <path
						        d="M15.9999806,0 L15.9999806,2.28569346 L2.2857116,2.28569346 L2.2857116,29.7142417 L15.9999806,29.7142417 L15.9999806,32 L-3.55271368e-14,32 L-3.55271368e-14,0 L15.9999806,0 Z M10.7142495,14.0571397 L24.7142486,14.0571397 L18.7142486,8.01427065 L20.714249,6 L30.7142495,16.0713818 L20.714249,26.1428492 L18.7142494,24.1285786 L24.7142492,18.0857381 L10.7142495,18.0857381 L10.7142495,14.0571397 Z"
						        transform="translate(15.357125, 16.000000) scale(-1, 1) translate(-15.357125, -16.000000) "></path>
						    </g>
						  </g>
						</svg>
					</span>
				</div>

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default SideBar
