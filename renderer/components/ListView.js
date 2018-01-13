import React, { Component } from 'react'

import styles from '../styles/components/listview'

class ListView extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { tasks } = this.props

		return (
			<div className="listView">
				{tasks.map((task, i) =>
					<div key={i} className="single">
						<div
							onClick={ e => this.props.updateTaskStatus(e, i, task._id, task) }
							className={'checkbox ' + (task.status === 'done' ? 'checked' : ' ')}
						></div>
						<div className="taskTitle">
							<h4>{ task.title }</h4>
							<p>{ task.subTitle }</p>
						</div>
						<span className="status">{ task.status }</span>
						<span onClick={ e => this.props.deleteTask(e, i, task._id) } className="delete">X</span>
					</div>
				)}

				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default ListView
