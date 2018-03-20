import electron from 'electron'
import React, {Component} from 'react'
import router from 'next/router'
import Mousetrap from 'mousetrap'

// utils
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
			isDetailShown: false
		}

		this.remote = electron.remote || false

		this.addNewTask = this.addNewTask.bind(this)
		this.toggleView = this.toggleView.bind(this)
		this.updateTaskStatus = this.updateTaskStatus.bind(this)
		this.updateTaskTitles = this.updateTaskTitles.bind(this)
		this.reloadTasks = this.reloadTasks.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.deleteSubTask = this.deleteSubTask.bind(this)
		this.selectProject = this.selectProject.bind(this)
		this.addProjectToAccount = this.addProjectToAccount.bind(this)
		this.setFilteredValue = this.setFilteredValue.bind(this)
		this.setTaskActive = this.setTaskActive.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.setProjectFavorite = this.setProjectFavorite.bind(this)
		this.hideTaskDetail = this.hideTaskDetail.bind(this)
		this.showTaskDetail = this.showTaskDetail.bind(this)
		this.addSubTaskToTask = this.addSubTaskToTask.bind(this)
		this.updateSubTaskStatus = this.updateSubTaskStatus.bind(this)
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

		Mousetrap.bind('esc', e => {
			if(this.state.selectedTaskId.length > 0) {
				this.hideTaskDetail()
			}
		})
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
		e.stopPropagation()
		const { selectedProjectId, accountId } = this.state
		const copyTasks = [...this.state.tasks]
		let newTask
		switch (task.status) {
			case 'todo':
				copyTasks.find(task => task._id === id).status = 'done'
				put(`tasks/a/${accountId}/${id}`, { status: 'done' })
				break;
			case 'doing':
				copyTasks.find(task => task._id === id).status = 'done'
				put(`tasks/a/${accountId}/${id}`, { status: 'done' })
				break;
			case 'done':
				copyTasks.find(task => task._id === id).status = 'todo'
				put(`tasks/a/${accountId}/${id}`, { status: 'todo' })
				break;
		}

		this.setState({
			tasks: copyTasks
		})
	}

	deleteTask(e, id) {
		const { accountId, selectedProjectId } = this.state
		del(`tasks/${accountId}/${selectedProjectId}/${id}`).then(res => {
			this.dataInit(false)
		})
	}

	deleteSubTask(e, taskId, subTaskId) {
		const { accountId, selectedProjectId } = this.state
		put(`tasks/delsub/${accountId}/${selectedProjectId}/${taskId}/${subTaskId}`).then(res => {
			this.dataInit(false)
		})
	}

	setFilteredValue(filteredValue) {
		this.setState({ filteredValue })
	}

	setTaskActive(e, id) {
		if(!e.target.classList.contains('checkbox')) {
			this.setState({
				selectedTaskId: id,
				isDetailShown: true
			})
		}
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
		this.setState({ [key]: value})
	}

	showTaskDetail() {
		this.setState({
			isDetailShown: true,
		})
	}

	hideTaskDetail() {
		this.setState({
			isDetailShown: false,
		}, () => {
			setTimeout(() => {
				this.setState({ selectedTaskId: '' })
			}, 320) // remove data after transition time.
		})
	}

	async addSubTaskToTask(title) {
		const { accountId, projectId, selectedTaskId } = this.state
		const body = { title }
		put(`tasks/sub/${accountId}/${projectId}/${selectedTaskId}`, body)
			.then(({ message }) => {
				this.dataInit(false)
			})
	}

	updateSubTaskStatus(task) {
		const { accountId, projectId, selectedTaskId } = this.state
		const { id: subTaskId, status } = task
		const newStatus = status === 'done' ? 'todo' : 'done'
		const body = { status: newStatus }
		put(`tasks/updatesub/${accountId}/${projectId}/${selectedTaskId}/${subTaskId}`, body)
			.then(({ message }) => {
				this.dataInit(false)
			})
	}

	updateTaskTitles(taskId, title, subTitle) {
		const { accountId } = this.state
		let body = {}
		if(title === undefined) {
			body = { subTitle }
 		} else if(subTitle === undefined) {
			body = { title }
		}
		put(`tasks/a/${accountId}/${taskId}`, body)
			.then(({ message }) => {
				this.dataInit(false)
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
			<div className={`container ${this.state.isDetailShown ? 'toggleTaskDetail' : ''}`}>
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
					updateTaskTitles={this.updateTaskTitles}
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
					isDetailShown={this.state.isDetailShown}
					updateTaskStatus={this.updateTaskStatus}
					hideTaskDetail={this.hideTaskDetail}
					showTaskdetail={this.showTaskDetail}
					addSubTaskToTask={this.addSubTaskToTask}
					updateSubTaskStatus={this.updateSubTaskStatus}
					deleteTask={this.deleteTask}
					deleteSubTask={this.deleteSubTask}
				/>

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default Start
