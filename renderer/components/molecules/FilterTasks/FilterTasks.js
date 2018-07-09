import React from 'react'
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
		const filterTasks = document.querySelector('.filter-tasks')
		const filterOffsetTop = filterTasks.getBoundingClientRect().top
		const filterHeight = filterTasks.getBoundingClientRect().height
		const activeProject = document.querySelector('.active-project')
		const mainTitle = document.querySelector('.active-project .mainTitle')
		const description = document.querySelector('.active-project .description')

		const activeProjectContentHeight = description !== null ? mainTitle.offsetHeight + description.offsetHeight : mainTitle.offsetHeight
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
				<span onClick={e => toggleAddTask(e)} className="toggle-add-task">
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
					  <path fill="#7A848F" d="M424.707511,20.0000834 L427.853411,16.8540516 C428.048863,16.6587588 428.048863,16.3418875 427.853411,16.1465947 C427.65796,15.9511351 427.341435,15.9511351 427.145984,16.1465947 L424.000083,19.2926265 L420.854016,16.1465947 C420.658565,15.9511351 420.34204,15.9511351 420.146589,16.1465947 C419.951137,16.3418875 419.951137,16.6587588 420.146589,16.8540516 L423.292656,20.0000834 L420.146589,23.1461152 C419.951137,23.341408 419.951137,23.6582793 420.146589,23.8535721 C420.244314,23.9511351 420.372392,24 420.500302,24 C420.628213,24 420.75629,23.9511351 420.854016,23.8534053 L424.000083,20.7073735 L427.145984,23.8534053 C427.24371,23.9511351 427.371787,24 427.499698,24 C427.627608,24 427.755686,23.9511351 427.853411,23.8534053 C428.048863,23.6581125 428.048863,23.3412412 427.853411,23.1459484 L424.707511,20.0000834 Z" transform="translate(-420 -16)"/>
					</svg>
				</span>
				<Button type="filter" onClick={e => setFilteredValue('all') } text="All" active={filteredValue === 'all'}/>
				<Button type="filter" onClick={e => setFilteredValue('todo') } text="To Do" active={filteredValue === 'todo'}/>
				<Button type="filter" onClick={e => setFilteredValue('done') } text="Done" active={filteredValue === 'done'}/>

				<style jsx>{ styles }</style>
			</div>


		)
	}
}

export default FilterTasks
