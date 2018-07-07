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
import IsOnlineMessage from '../components/templates/IsOnlineMessage'
import ActiveProject from '../components/templates/ActiveProject'
import AddProjectModal from '../components/organisms/AddProjectModal'
import TaskDetail from '../components/templates/TaskDetail'
import LogoutConfirmation from '../components/organisms/LogoutConfirmation'
import EmptyState from '../components/molecules/EmptyState'

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
			isDetailShown: false,
			measurements: [],
			isMeasuring: false,
			showLogoutConfirmation: false,
			isonline: true
		}

		this.remote = electron.remote || false

		this.addNewTask = this.addNewTask.bind(this)
		this.toggleView = this.toggleView.bind(this)
		this.updateTaskStatus = this.updateTaskStatus.bind(this)
		this.updateTaskTitles = this.updateTaskTitles.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.deleteSubTask = this.deleteSubTask.bind(this)
		this.deleteProject = this.deleteProject.bind(this)
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
		this.putNewTimeMeasurement = this.putNewTimeMeasurement.bind(this)
		this.toggleLogoutConfirmation = this.toggleLogoutConfirmation.bind(this)
	}

	componentDidMount() {
		this.disableWindowZoom()
		const isThereAToken = localStorage.getItem('USER_TOK')
		const isThereAProjectSelected = localStorage.getItem('SELECTED_PROJECT_ID')

		if (!isThereAToken) {
			router.push('/login')
		} else {
			this.setState({
				accountId: localStorage.getItem('USER_ID'),
			}, () => {
				if (isThereAProjectSelected) {
					this.setState({
						selectedProjectId: isThereAProjectSelected
					}, () => {
						this.dataInit(false)
					})
				} else {
					this.dataInit(true)
					this.setState({
						noSelectedProject: true
					})
				}
			})
		}

		Mousetrap.bind('esc', e => {
			if(this.state.selectedTaskId.length > 0) {
				this.hideTaskDetail()
			}
		})

		const retrieveInternetStatus = e => {
			this.setState({
				isonline: window.navigator.onLine
			}, this.forceUpdate)
		}

		window.addEventListener('online', retrieveInternetStatus)
		window.addEventListener('offline', retrieveInternetStatus)
	}

	async dataInit(noSelectedProject) {
		const { accountId, selectedProjectId, selectedTaskId } = this.state
		const { data: projects } = await get('projects', accountId)

		if(window.navigator.onLine) {
			if(noSelectedProject) {
				this.setState({
					isonline: window.navigator.onLine,
					loading: false,
					projects,
					tasks: [],
					activeProject: {},
					selectedProjectId: '',
					noSelectedProject,
				})
			} else {
				const { data: tasks } = await get(`projects/${accountId}/${selectedProjectId}/tasks`, undefined)
				const selectedProjectObject = projects.find(project => project._id === selectedProjectId)

				this.setState({
					isonline: window.navigator.onLine,
					projects,
					tasks,
					activeProject: selectedProjectObject,
					loading: false
				})
			}
		} else {
			this.setState({
				isonline: window.navigator.onLine
			})
		}
	}

	async disableWindowZoom() {
		const window = await electron.webFrame
		window.setVisualZoomLevelLimits(1, 1)
		window.setLayoutZoomLevelLimits(0, 0)
	}

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
			localStorage.setItem('SELECTED_PROJECT_ID', newProject._id)
			callback('addProjectModalVisible', false)
		})
	}

	selectProject(id) {
		this.setState({
			selectedProjectId: id,
			noSelectedProject: false
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

		del(`tasks/${accountId}/${selectedProjectId}/${id}`)
			.then(res => {
				this.dataInit(false)
			})
	}

	deleteSubTask(e, taskId, subTaskId) {
		const { accountId, selectedProjectId } = this.state

		put(`tasks/delsub/${accountId}/${selectedProjectId}/${taskId}/${subTaskId}`)
			.then(res => {
				this.dataInit(false)
			})
	}

	deleteProject(projectId) {
		const { accountId } = this.state

		del(`projects/${accountId}/${projectId}`)
			.then(res => {
				if(res.data.succes) {
					window.localStorage.removeItem('SELECTED_PROJECT_ID')
				} else {
					console.error('There has been an error deleting your project.');
				}
				return res.data.succes
			})
			.then(hasSucceed => {
				this.dataInit(true)
			})
	}

	setFilteredValue(filteredValue) {
		this.setState({ filteredValue })
	}

	setTaskActive(e, id) {
		if(!e.target.classList.contains('checkbox') && !this.state.isMeasuring) {
			this.setState({
				selectedTaskId: id,
				isDetailShown: true
			}, () => {
				this.inititalizeMeasurements()
			})
		}
	}

	inititalizeMeasurements() {
		get(`timemeasurements/all/${this.state.selectedTaskId}`)
			.then(response => {
				const { data: { measurements }} = response
				this.setState({ measurements })
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
		put(`projects/${accountId}/${projectId}`, { favorite: boolean })
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
		if(!this.state.isMeasuring) {
			this.setState({
				isDetailShown: false,
			}, () => {
				setTimeout(() => {
					this.setState({ selectedTaskId: '' })
				}, 320) // remove data after transition time.
			})
		}
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

	async putNewTimeMeasurement(isNew, bodyToUpload, measurementId) {
		const { selectedTaskId } = this.state
		const { accountId, selectedProjectId, tasks } = this.state
		const copyTasks = [...tasks]

		if(isNew && measurementId === undefined) {
			add(`timemeasurements/new/${accountId}/${selectedTaskId}`, undefined, bodyToUpload)
				.then(response => {
					this.setState({ isMeasuring: true })
					this.inititalizeMeasurements()
				})

		} else {
			put(`timemeasurements/update/${accountId}/${selectedTaskId}/${measurementId}`, bodyToUpload)
				.then(response => {
					this.setState({ isMeasuring: false })
					this.inititalizeMeasurements()
				})
		}
	}

	toggleLogoutConfirmation() {
		this.setState(({ showLogoutConfirmation }) => ({
			showLogoutConfirmation: !showLogoutConfirmation
		}))
	}

	logoutUser() {
		localStorage.removeItem('USER')
		localStorage.removeItem('USER_ID')
		localStorage.removeItem('USER_TOK')
		router.push('/login')
	}

	render() {
		const filteredTask = this.state.tasks.filter(task => (
			this.state.filteredValue === 'all') ? task : task.status === this.state.filteredValue
		)

		return (
			<div className={`container ${this.state.isDetailShown ? 'toggleTaskDetail' : ''}`}>
				<TitleBar/>

				{ this.state.isonline ?
				<span>
				<Sidebar
					tasks={filteredTask}
					projects={this.state.projects}
					activeProjectId={this.state.activeProjectId}
					selectedProjectId={this.state.selectedProjectId}
					selectProject={this.selectProject}
					addProjectToAccount={this.addProjectToAccount}
					setProjectFavorite={this.setProjectFavorite}
					toggleModal={this.toggleModal}
					toggleLogoutConfirmation={this.toggleLogoutConfirmation}
					deleteProject={this.deleteProject}
				/>

				{ this.state.noSelectedProject ?
					<EmptyState message="niks aan t handje"/>
					:
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
				}

				{ this.state.loading && <Loader loading/> }

				<AddProjectModal
					visible={this.state.addProjectModalVisible}
					toggleModal={this.toggleModal}
					addProjectToAccount={this.addProjectToAccount}
				/>

				<LogoutConfirmation
					visible={this.state.showLogoutConfirmation}
					logoutUser={this.logoutUser}
					toggleLogoutConfirmation={this.toggleLogoutConfirmation}
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
					putNewTimeMeasurement={this.putNewTimeMeasurement}
					measurements={this.state.measurements}
				/>
				</span>
				:
				<IsOnlineMessage/>
				}

				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default Start
