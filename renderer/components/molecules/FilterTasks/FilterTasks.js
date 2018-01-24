import React from 'react'
import Button from '../../atoms/FilterButton'
import styles from './filterTaskStyles'

class FilterTasks extends React.Component {
	render() {
		const { filteredValue, setFilteredValue, toggleAddProject } = this.props

		return(
			<div className="filter-tasks">
				<span onClick={e => toggleAddProject(e)}><img src="../../static/plus-large.svg"/></span>
				<Button onClick={e => setFilteredValue('all') } text="All" active={filteredValue === 'all'}/>
				<Button onClick={e => setFilteredValue('todo') } text="To Do" active={filteredValue === 'todo'}/>
				<Button onClick={e => setFilteredValue('done') } text="Done" active={filteredValue === 'done'}/>

				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default FilterTasks
