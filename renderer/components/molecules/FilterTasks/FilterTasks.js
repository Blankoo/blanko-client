import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../../atoms/Button'
import styles from './filterTaskStyles'

class FilterTasks extends React.Component {

	constructor() {
		super()

		this.state = {
			fixed: false
		}

		this.fixedFilterTasks = this.fixedFilterTasks.bind(this)
	}

	fixedFilterTasks() {
		const filterTasks = ReactDOM.findDOMNode(this.refs['filterTasks'])
		const filterOffsetTop = filterTasks.getBoundingClientRect().top
		const filterHeight = filterTasks.getBoundingClientRect().height

		const activeProject = document.querySelector('.active-project')
		const mainTitle = document.querySelector('.active-project .mainTitle')
		const description = document.querySelector('.active-project .description')

		const activeProjectContentHeight = mainTitle.offsetHeight + description.offsetHeight

		if (window.scrollY >= filterOffsetTop + activeProjectContentHeight + 56) {
			this.setState({
				fixed: true
			})
			activeProject.style.paddingTop = '40px'
			window.document.body.style.paddingTop = filterHeight + 'px'
		} else {
			this.setState({
				fixed: false
			})
			activeProject.style.paddingTop = 0
			window.document.body.style.paddingTop = 0
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.fixedFilterTasks)
	}

	render() {
		const { filteredValue, setFilteredValue, toggleAddTask } = this.props

		const { fixed } = this.state

		return(
			<div className={`filter-tasks ${fixed ? 'fixed' : ''}`} ref="filterTasks">
				<span onClick={e => toggleAddTask(e)}><img src="../../static/plus-large.svg"/></span>
				<Button onClick={e => setFilteredValue('all') } text="All" active={filteredValue === 'all'}/>
				<Button onClick={e => setFilteredValue('todo') } text="To Do" active={filteredValue === 'todo'}/>
				<Button onClick={e => setFilteredValue('done') } text="Done" active={filteredValue === 'done'}/>

				<style jsx>{ styles }</style>
			</div>


		)
	}
}

export default FilterTasks
