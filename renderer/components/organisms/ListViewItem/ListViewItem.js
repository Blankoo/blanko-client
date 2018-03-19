import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//Components
import Checkbox from '../../atoms/form/Checkbox';

// Style import
import styles from './listViewItemStyle'

class ListViewItem extends Component {
	constructor(props) {
		super(props)

		this.state = {
			editing: false,
			title: this.props.task.title,
			subTitle: this.props.task.subTitle
		}

		this.setActiveTaskCheck = this.setActiveTaskCheck.bind(this)
		this.toggleEditTask = this.toggleEditTask.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	setActiveTaskCheck(targetItem) {
		const targetFirstClassName = targetItem.target.className.split(' ')[0];

		if(targetFirstClassName === 'list-view-title' || targetFirstClassName === 'list-view-sub-title' ) {
			targetItem.preventDefault()
		} else {
			this.props.setTaskActive(targetItem)
		}
	}

	toggleEditTask(e) {
		this.setState({
			editing: !this.state.editing,
		})
		console.log('togglee!!')
	}

	onEdit(value) {
    this.setState({
			title: value
    })
  }

	onBlur() {
		this.props.updateTaskTitles(this.props.task._id, this.state.title, undefined)
		this.toggleEditTask()
	}

	render() {
		const { task, isCheckedToggle, isSelected, updateTaskStatus, updateTaskTitles, setTaskActive } = this.props
		const { editing, taskState } = this.state

		return (
			<div className={'list-view-item single ' + isCheckedToggle + isSelected} onClick={(e) => { this.setActiveTaskCheck(e) }}>
				<Checkbox check={task.status === 'done'} onClick={ updateTaskStatus } />
				<div className="task-title">
					{ !editing ?
							<h4 className="list-view-title"
									onDoubleClick={ this.toggleEditTask }>
									{ task.title }
							</h4>
							:
							<input
								autoFocus
								className="list-view-title edit"
								value={ this.state.title }
								onChange={e => this.onEdit(e.target.value)}
								onBlur={e => this.onBlur()}
							/>
					}
					{ task.subTitle.length > 0 && <p className="list-view-sub-title">{ task.subTitle }</p>}
				</div>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListViewItem
