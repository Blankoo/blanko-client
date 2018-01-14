import React, { Component } from 'react'

import styles from '../styles/components/listview'

class ListView extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { tasks } = this.props
		const isChecked = task => (task.status === 'done' ? 'checked' : ' ')

		return (
			<div className="listView">
				{tasks.map((task, i) =>

					<div key={i} className={'single ' + isChecked(task)}>
						<div
							onClick={ e => this.props.updateTaskStatus(e, i, task._id, task) }
							className={'checkbox ' + isChecked(task)}>
						</div>

						<div className="taskTitle">
							<h4>{ task.title }</h4>
							<p>{ task.subTitle }</p>
						</div>
						{/*<span onClick={ e => this.props.deleteTask(e, i, task._id) } className="delete">X</span>*/}
					</div>

				)}

				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListView
