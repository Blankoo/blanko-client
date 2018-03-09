import React from 'react'
import styles from './TimeMeasurementStyle'
import Button from '../../atoms/Button'

class TimeMeasurement extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isMeasuring: false,
			startTime: null,
			currentTime: null,
			endTime: null,
			selectedTask: null,
			measurements: [],
			selectedTask: {}
		}

		this.startMeasurement = this.startMeasurement.bind(this)
		this.setSpendedTimeValue = this.setSpendedTimeValue.bind(this)
		this.stopMeasurement = this.stopMeasurement.bind(this)
	}

	componentWillReceiveProps(newProps) {
		console.log('time measurement new props', newProps);
		this.setState({
			selectedTask: newProps.selectedTask,
			measurements: newProps.selectedTask.measurements
		})
	}
	componentDidMount() {
		this.setState({
			selectedTask: this.props.selectedTask,
			measurements: this.props.selectedTask.measurements
		})
	}

	currenTime = () => new Date().getTime()

	startMeasurement() {
		this.setState(previousState => {
			return {
				isMeasuring: true,
				startTime: this.currenTime(),
				currenTime: this.currenTime(),
				measurements: [...previousState.measurements, {
					startTime: this.currenTime(),
					endTime: 0,
					isPosted: false
				}]
			}
		}, () => {
			this.setSpendedTimeValue()
		})
	}

	setSpendedTimeValue(isTiming) {
		this.interval = setInterval(() => {
			this.setState(previousState => ({
				currenTime: this.currenTime()
			}))
		}, 980)
	}

	stopMeasurement() {
		const measurementId = '5a9ab6d68a11df1856f1da25'
		this.setState({
			isMeasuring: false,
			endTime: this.state.currenTime
		}, () => {
			this.props.putNewTimeMeasurement(this.props.selectedTask._id, this.state.startTime, this.state.endTime, measurementId)
			clearInterval(this.interval)
		})
	}

	render() {
		const { selectedTask } = this.props
		const { measurements } = selectedTask

		return (
			<div className="time-measurement-container">
				{ selectedTask !== null ?
				<ul className="time-measurements">

					{this.state.measurements.map((timeObject, idx) =>

						<li key={idx}>
							<label>Measurement:</label>
							<span>
								{
									timeObject.isPosted ?
									<span>{ timeObject.endTime - timeObject.startTime}</span>
									:
									<span>{ this.state.currenTime - timeObject.startTime}</span>
								}
							</span>
						</li>

					)}

					<div className="measurement-controls">

						{<span className="total-measurement">
							{ selectedTask.totalTime !== undefined &&
							<span>
								<label>Total measured time:</label>
								<span>{}</span>
							</span>
							}
						</span>}

						<span>
							{this.state.isMeasuring ?
								<Button text="Cancel" type="cancel" onClick={e => this.stopMeasurement()}/>
								:
								<Button text="Start time measurement" type="submit" onClick={e => this.startMeasurement()}/>
							}

						</span>
					</div>

				</ul>
				: null}
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default TimeMeasurement;
