import React, { Component } from 'react'

//Components
import Checkbox from '../../atoms/form/Checkbox';

// Style import
import styles from './listViewItemStyle'

class ListViewItem extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { task, isCheckedToggle, isSelected, updateTaskStatus, setTaskActive } = this.props

		return (
			<div className={'list-view-item single ' + isCheckedToggle + isSelected} onClick={setTaskActive}>
				<Checkbox check={task.status === 'done'} onClick={ updateTaskStatus } />
				<div className="taskTitle">
					<h4>{ task.title }</h4>
					{ task.subTitle.length > 0 && <p>{ task.subTitle }</p>}
				</div>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListViewItem
