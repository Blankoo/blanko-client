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
import TitleBar from '../components/atoms/TitleBar'
import AddTask from '../components/molecules/AddTask'
import Sidebar from '../components/templates/Sidebar'
import ActiveProject from '../components/templates/ActiveProject'
import AddProjectModal from '../components/organisms/AddProjectModal'
import TaskDetail from '../components/templates/TaskDetail'

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
			activeProject: {},
			tasks: [],
			projects: [],
			columns: ['todo', 'doing', 'done'],
			loading: true,
			filteredValue: 'all',
			selectedTaskId: '',
			addProjectModalVisible: false,
			toggleTaskDetail: false
		}

		this.remote = electron.remote || false

		this.addNewTask = this.addNewTask.bind(this)
		this.toggleView = this.toggleView.bind(this)
		this.updateTaskStatus = this.updateTaskStatus.bind(this)
		this.reloadTasks = this.reloadTasks.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.selectProject = this.selectProject.bind(this)
		this.addProjectToAccount = this.addProjectToAccount.bind(this)
		this.setFilteredValue = this.setFilteredValue.bind(this)
		this.setTaskActive = this.setTaskActive.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.setProjectFavorite = this.setProjectFavorite.bind(this)
		this.closeTaskDetail = this.closeTaskDetail.bind(this)
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

	componentDidUpdate(prevProps, prevState) {
		if (prevState.selectedTaskId !== this.state.selectedTaskId) {
			this.setState({
				toggleTaskDetail: true
			})
		}
	}

	async dataInit(noSelectedProject) {
		const { accountId, selectedProjectId, selectedTaskId } = this.state
		const { data: projects } = await get('projects', accountId)
		if(noSelectedProject) {
			this.setState({ projects })
		} else {
			const { data: tasks } = await get(`projects/${accountId}/${selectedProjectId}/tasks`, undefined)
			const selectedProjectObject = projects.find(project => project._id === selectedProjectId)

			this.setState({
				projects,
				tasks,
				activeProject: selectedProjectObject
			}, () => {
				this.getActiveTaskData(selectedTaskId)
			})
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

	async addProjectToAccount(newProjectData, callback) {
		const { accountId } = this.state
		const { data: newProject } = await add('projects/add', accountId, newProjectData)

		this.setState(previousState => ({
			projects: [...previousState.projects, newProject],
			selectedProjectId: newProject._id
		}), () => {
			this.dataInit(false)
			callback('addProjectModalVisible', false)
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
		this.setState(oldState => ({
			kanban: !oldState.kanban
		}))
	}

	async updateTaskStatus(e, i, id, task) {
		const { selectedProjectId } = this.state
		const copyTasks = [...this.state.tasks]

		let newTask
		switch (task.status) {
			case 'todo':
				copyTasks.find(task => task._id === id).status = 'done'
				break;
			case 'doing':
				copyTasks.find(task => task._id === id).status = 'done'
				break;
			case 'done':
				copyTasks.find(task => task._id === id).status = 'todo'
				break;
		}

		this.setTaskActive(id)

		this.setState({
			tasks: copyTasks
		})
	}

	deleteTask(e, i, id) {
		// del('tasks', id)
	}

	setFilteredValue(filteredValue) {
		this.setState({ filteredValue })
	}

	setTaskActive(id) {
		this.setState({
			selectedTaskId: id
		}, () => {
			this.getActiveTaskData(this.state.selectedTaskId)
		})
	}

	async getActiveTaskData(id) {
		const { accountId } = this.state
		if(id.length > 0) {
			const { data: selectedTask } = await get(`tasks/${accountId}/${id}`)
			this.setState({ selectedTask })
		}
	}

	async setProjectFavorite(e, projectId, boolean) {
		const { accountId } = this.state
		put(`projects/${accountId}`, projectId, { favorite: boolean })
			.then(({ message }) => {
				this.dataInit(false)
			})
	}

	toggleModal(key, value) {
		console.log('moetje');
		this.setState({ [key]: value})
	}

	closeTaskDetail = () => {
		this.setState({
			toggleTaskDetail: false,
		})
	}

	render() {
		const filteredTask = this.state.tasks.filter(task => {
			if(this.state.filteredValue === 'all') {
				return task
			} else {
				return task.status === this.state.filteredValue
			}
		})

		return (
			<div className={`container ${this.state.toggleTaskDetail ? 'toggleTaskDetail' : ''}`}>
				<TitleBar/>

				<Sidebar
					tasks={filteredTask}
					projects={this.state.projects}
					activeProjectId={this.state.activeProjectId}
					selectedProjectId={this.state.selectedProjectId}
					selectProject={this.selectProject}
					addProjectToAccount={this.addProjectToAccount}
					setProjectFavorite={this.setProjectFavorite}
					toggleModal={this.toggleModal}
				/>

				<ActiveProject
					tasks={filteredTask}
					updateTaskStatus={this.updateTaskStatus}
					deleteTask={ this.deleteTask }
					addNewTask={this.addNewTask}
					activeProject={this.state.activeProject}
					filteredValue={this.state.filteredValue}
					setFilteredValue={this.setFilteredValue}
					setTaskActive={this.setTaskActive}
					selectedTaskId={this.state.selectedTaskId}
				/>

				{ this.state.loading && <Loader loading/> }

				<AddProjectModal
					visible={this.state.addProjectModalVisible}
					toggleModal={this.toggleModal}
					addProjectToAccount={this.addProjectToAccount}
				/>

				<TaskDetail
					selectedTask={this.state.tasks.find(task => task._id === this.state.selectedTaskId)}
					toggle={this.state.toggleTaskDetail}
					close={this.closeTaskDetail}
					updateTaskStatus={this.updateTaskStatus}
				/>

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default Start
