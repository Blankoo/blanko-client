import React from 'react'
import Button from '../../atoms/FilterButton'

class FilterTasks extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {
		console.log('_______________FilterTasks______________');
		console.log(this.props);
	}

	render() {
		const { filteredValue, setFilteredValue } = this.props
		const todoValue = 'todo'
		const doneValue = 'done'

		return(
			<div style={{ margin: '18px 0 10px 0' }}>
				<Button onClick={e => setFilteredValue('') } text="All" active={filteredValue === ''}/>
				<Button onClick={e => setFilteredValue(todoValue) } text="To Do" active={filteredValue === todoValue}/>
				<Button onClick={e => setFilteredValue(doneValue) } text="Done" active={filteredValue === doneValue}/>
			</div>
		)
	}
}

export default FilterTasks
