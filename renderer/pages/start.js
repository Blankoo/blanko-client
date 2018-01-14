import electron from 'electron'
import React, {Component} from 'react'
import router from 'next/router'

// utils
import db from '../utils/db'
import add from '../utils/add'
import put from '../utils/put'
import del from '../utils/delete'
import get from '../utils/get'

// styles
import styles from '../styles/pages/start'

// components
import Loader from '../components/atoms/Loader'
import AddTask from '../components/AddTask'
import Sidebar from '../components/Sidebar'
import ProjectView from '../components/ProjectView'
import ActiveProject from '../components/ActiveProject'

class Start extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: 'title',
			message: '',
			current: 1,
			kanban: false,
			accountId: '',
			selectedProjectId: '',
			tasks: [],
			projects: [],
			columns: ['todo', 'doing', 'done'],
			loading: true
		}

		this.remote = electron.remote || false
		this.addNewTask = this.addNewTask.bind(this)
		this.toggleView = this.toggleView.bind(this)
		this.updateTaskStatus = this.updateTaskStatus.bind(this)
		this.reloadTasks = this.reloadTasks.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.selectProject = this.selectProject.bind(this)
		this.addProjectToAccount = this.addProjectToAccount.bind(this)
	}

	componentDidMount() {
		const isThereAToken = localStorage.getItem('USER_TOK')
		const isThereAProjectSelected = localStorage.getItem('SELECTED_PROJECT_ID')

		if (!isThereAToken) {
			router.push('/login')
		} else {
			this.setState({
				loading: false,
				accountId: localStorage.getItem('USER_ID')
			}, () => {
				if (isThereAProjectSelected) {
					this.setState({
						selectedProjectId: isThereAProjectSelected
					}, () => {
						this.dataInit(false)
					})
				} else {
					this.dataInit(true)
				}
			})
		}
	}

	async dataInit(noSelectedProject) {
		const { accountId, selectedProjectId } = this.state
		const { data: projects } = await get('projects', accountId)

		if(noSelectedProject) {
			this.setState({ projects })
		} else {
			const { data: tasks } = await get(`projects/${accountId}/${selectedProjectId}/tasks`, undefined)
			this.setState({ projects, tasks })
		}
	}

	reloadTasks() {}

	async addNewTask(endpoint, objectToAdd, id) {
		const { selectedProjectId, accountId } = this.state
		id = `${accountId}/${selectedProjectId}`
		const { data } = await add(endpoint, id, objectToAdd)
		const { body: newTask, message } = data

		this.setState(previousState => ({
			message,
			tasks: [...previousState.tasks, newTask]
		}))
	}

	async addProjectToAccount(newProjectData) {
		const { accountId } = this.state
		const { data: newProject } = await add('projects/add', accountId, newProjectData)
		console.log('added new project: ', newProject);
		this.setState(previousState => ({
			projects: [...previousState.projects, newProject],
			selectedProjectId: newProject._id
		}), () => {
			this.dataInit(false)
		})
	}

	selectProject(id) {
		this.setState({
			selectedProjectId: id
		}, () => {
			localStorage.setItem('SELECTED_PROJECT_ID', this.state.selectedProjectId)
			this.dataInit(false)
		})
	}

	toggleView() {
		console.log('toggle view');
		this.setState(oldState => ({
			kanban: !oldState.kanban
		}))
	}

	async updateTaskStatus(e, i, id, task) {
		const { selectedProjectId } = this.state

		let newTask
		switch (task.status) {
			case 'todo':
				newTask = await put(`tasks/${selectedProjectId}`, id, { status: 'done' })
				break;
			case 'doing':
				newTask = await put(`tasks/${selectedProjectId}`, id, { status: 'done' })
				break;
			case 'done':
				newTask = await put(`tasks/${selectedProjectId}`, id, { status: 'todo' })
				break;
		}

		const copyTasks = [...this.state.tasks]
		const thisTask = copyTasks.find(task => task._id === id)
		thisTask.status = newTask.data.body.status

		this.setState({
			tasks: copyTasks
		})
	}

	deleteTask(e, i, id) {
		// del('tasks', id)
	}

	render() {
		return (
			<div className="container">
				<Sidebar
					tasks={this.state.tasks}
					projects={this.state.projects}
					activeProjectId={this.state.activeProjectId}
					selectedProjectId={this.state.selectedProjectId}
					selectProject={this.selectProject}
					addProjectToAccount={this.addProjectToAccount}
				/>

				<ActiveProject
					tasks={ this.state.tasks }
					updateTaskStatus={this.updateTaskStatus}
					deleteTask={ this.deleteTask }
					addNewTask={this.addNewTask}
				/>

			{/*<ProjectView
					tasks={this.state.tasks}
					kanban={this.state.kanban}
					updateTaskStatus={this.updateTaskStatus}
					deleteTask={this.deleteTask}
				/>*/}

				{ !this.state.loading ? <Loader/> : <Loader loading/> }

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default Start
