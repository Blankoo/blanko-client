import React, { Component } from 'react'
import styles from './kanbanStyle'

import db from '../../../utils/db'

class Kanban extends Component {
	constructor(props) {
		super(props)

		this.state = {
			dropped: false,
			x: 0,
			y: 0,
		}

		this.onDragStart = this.onDragStart.bind(this)
		this.dragOver = this.dragOver.bind(this)
		this.drop = this.drop.bind(this)
	}

	componentDidMount() {
		console.log('kanban props: ', this.props);
		this.props.columns.map(column => {
			this.setState({
				[column]: this.props.tasks.filter(task => task.status === column)
			})
		})
	}

	componentWillReceiveProps(props) {
		console.log('KANBAN RECEIVED PROPS: ', props);
		this.setState({todo: props.tasks})
	}

	onDragStart(e) {
		console.log('drag start');
		e.dataTransfer.dropEffect = 'move'
		e.dataTransfer.setData('status', e.target.dataset.status);
		e.dataTransfer.setData('index', e.target.dataset.index);
		e.dataTransfer.setData('id', e.target.dataset.id);
	}

	dragOver(e) {
		e.preventDefault();
	}

	drop(e) {
		e.preventDefault()
		const arrayIndex = e.dataTransfer.getData('index')
		const status = e.dataTransfer.getData('status')
		const oldArray = this.state[status]
		const newArray = this.state[e.target.dataset.name]
		const oldTask = oldArray[arrayIndex]
		oldArray.splice(0, 1)

		this.setState({ // ja dat dus...
			[e.target.dataset.name]: [...this.state[e.target.dataset.name], oldTask]
		})

		// update('tasks', oldTask._id, { status: e.target.dataset.name })
	}


  render() {
    return(
				<div id='kanban' onMouseMove={this.getMouseCoords}>

					{
						this.props.columns.map(status =>
							<div className='column one' data-name={status} onDrop={this.drop} onDragOver={this.dragOver} key={status}>

								{this.state[status] !== undefined ?
									this.state[status].map((task, i) =>
										<div
											data-status={status}
											data-dbkey={task._id}
											className='task'
											draggable={true}
											onDragStart={this.onDragStart}
											data-index={i}
											key={i}>
											<h3>{ task.title }</h3>
											<p>{ task.subTitle }</p>
											<span onClick={ e => this.props.deleteTask(e, i, task._id) } className="delete">X</span>
										</div>

									)
									: null
								}

							</div>
						)
					}

					<style jsx>{ styles }</style>
				</div>

    )
  }
}

export default Kanban

/*
// card:


*/
