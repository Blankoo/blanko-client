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
		event.stopPropagation()
		this.setState({
			isMeasuring: true
		}, () => {
			this.setSpendedTimeValue()
			const inititalMeasurement = {
				startTime: this.currenTime(),
				isFinished: false
			}

			this.props.putNewTimeMeasurement(true, inititalMeasurement)
		})
	}

	setSpendedTimeValue() {
		this.interval = setInterval(() => {
			this.setState({
				currenTime: this.currenTime()
			})
		}, 500)
	}

	stopMeasurement() {
		event.stopPropagation()
		this.setState({
			isMeasuring: false,
		}, () => {
			const inititalMeasurement = {
				endTime: this.currenTime(),
				isFinished: true
			}
			const measurementId = [...this.props.measurements].pop()._id

			this.props.putNewTimeMeasurement(false, inititalMeasurement, measurementId)
			clearInterval(this.interval)
		})
	}

	secondsToHourMinuteSecond(totalSeconds) {
		let hour = Math.floor(totalSeconds / 3600)
		let minute = Math.floor(totalSeconds % 3600 / 60)
		let seconds = Math.floor(totalSeconds % 3600 % 60)

		return `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}:${('0' + seconds).slice(-2)}`
	}

	render() {
		const { selectedTask } = this.props
		const { measurements } = selectedTask
		const totalInMiliSeconds = (endTime, startTime) => Math.floor(endTime - startTime)
		const totalInSeconds = (endTime, startTime) => Math.floor(totalInMiliSeconds(endTime, startTime) / 1000)
		const totalMeasuredTime = this.props.measurements.reduce((zero, { total }) => zero + total, 0)
		console.log('totalMeasuredTime', totalMeasuredTime);
		console.log('totalMeasuredTime == NaN', totalMeasuredTime == undefined);
		return (
			<div className="time-measurement-container">
				{ selectedTask !== null ?
				<ul className="time-measurements">

					{this.props.measurements.map((measurement, idx) =>

						<li key={idx}>
							<label>Measurement</label>
							<span>

								{
									measurement.isFinished ?
										<span className="numbers isFinished">{
											this.secondsToHourMinuteSecond(
												totalInSeconds(measurement.endTime, measurement.startTime)
											)}
										</span>
									:
										<span className="numbers isNotFinished">{
											this.secondsToHourMinuteSecond(
												totalInSeconds(this.state.currenTime, measurement.startTime)
											)}
										</span>
								}
							</span>
						</li>

					)}

					{ <div className="measurement-controls">
						<span className="add-measurement">
							{this.state.isMeasuring ?
								<Button text="Stop time measurement" type="cancel" onClick={this.stopMeasurement}/>
								:
								<Button text="Start time measurement" type="submit" onClick={this.startMeasurement}/>
							}
						</span>
						<span className="total-measurement">
							<span>
								<label>Total measured time:</label>
								<span className="numbers">
									{
										this.state.isMeasuring ?
										<span>-</span>
										:
										this.secondsToHourMinuteSecond(totalMeasuredTime / 1000)
									}
								</span>
							</span>
						</span>
					</div>}

				</ul>
				: null}
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default TimeMeasurement;
