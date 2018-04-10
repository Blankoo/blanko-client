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
			subTitle: this.props.task.subTitle,
		}
		this.setActiveTaskCheck = this.setActiveTaskCheck.bind(this)
		this.toggleEditTaskView = this.toggleEditTaskView.bind(this)
		this.deselectInputAndSetTitle = this.deselectInputAndSetTitle.bind(this)
	}

	setActiveTaskCheck(targetItem) {
		const targetFirstClassName = targetItem.target.className.split(' ')[0];
		if(targetFirstClassName === 'list-view-title' || targetFirstClassName === 'list-view-sub-title' ) {
			targetItem.preventDefault()
		} else {
			this.props.setTaskActive(targetItem)
		}
	}

	toggleEditTaskView(e) {
		if(e.target.tagName === 'H4') {
			this.setState(({editingTitle, editing}) => ({
				editingTitle: !editingTitle,
				editing: !editing
			}))
		} else if(e.target.tagName === 'P') {
			this.setState(({editingSubTitle, editing}) => ({
				editingSubTitle: !editingSubTitle,
				editing: !editing
			}))
		}
	}

	deselectInputAndSetTitle() {
		if (this.state.title.length > 1) {
			this.props.updateTaskTitles(this.props.task._id, this.state.title, undefined)
		} else {
			this.setState({
				title: this.props.task.title
			})
		}

		if (this.state.subTitle.length > 1) {
			this.props.updateTaskTitles(this.props.task._id, undefined, this.state.subTitle)
		} else {
			this.setState({
				subTitle: this.props.task.subTitle
			})
		}

		this.setState({
			editingTitle: false,
			editingSubTitle: false,
		})
	}

	updateInputValue(titleValue, subTitleValue) {
    this.setState({
			title: titleValue,
			subTitle: subTitleValue
    })
  }

	render() {
		const { task, isCheckedToggle, isSelected, updateTaskStatus, updateTaskTitles, setTaskActive } = this.props
		const { editingTitle, editingSubTitle } = this.state

		return (
			<div className={'list-view-item single ' + isCheckedToggle + isSelected} onClick={(e) => { this.setActiveTaskCheck(e) }}>
				<Checkbox check={task.status === 'done'} onClick={ updateTaskStatus } />
				<div className={"task-titles " + (this.state.editing ? 'isEditing' :  '')}>
					{ !editingTitle ?
						<h4 className="list-view-title"
								onClick={(e) => { this.setActiveTaskCheck(e) }}
								onDoubleClick={e => this.toggleEditTaskView(e) }>
								{ task.title }
						</h4>
						:
						<input
							autoFocus
							maxLength="80"
							className="list-view-title edit"
							onKeyUp={e => e.key === 'Enter' && this.deselectInputAndSetTitle() }
							value={ this.state.title }
							onChange={e => this.updateInputValue(e.target.value, task.subTitle)}
							onBlur={e => this.deselectInputAndSetTitle() }
						/>
					}
					{ task.subTitle &&
					<span>
							{ !editingSubTitle ?
								<p	className="list-view-sub-title"
										onDoubleClick={e => this.toggleEditTaskView(e) }>
										{ task.subTitle }
								</p>
								:
								<input
									autoFocus
									maxLength="140"
									className="list-view-sub-title edit"
									onKeyUp={e => e.keyCode === 27 && this.deselectInputAndSetTitle() }
									value={ this.state.subTitle }
									onChange={e => this.updateInputValue(task.title, e.target.value) }
									onBlur={e => this.deselectInputAndSetTitle() }
								/>
							}
						</span>
					}
				</div>
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListViewItem
