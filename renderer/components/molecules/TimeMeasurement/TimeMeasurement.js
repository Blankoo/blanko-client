import React from 'react'
import styles from './TimeMeasurementStyle'
import Button from '../../atoms/Button'

const timeData = {
	'totalTime': '03:44:16',
	'measurements': [
		{
			'startTime': 1519316141859,
			'endTime': 1519319247283,
			'total': '03:44:13'
		}, {
			'startTime': 1519316141859,
			'endTime': 1519319247283,
			'total': '00:44:03'
		}
	]
}

class TimeMeasurement extends React.Component {
	render() {
		return (

			<ul className="time-measurements">
				{timeData.measurements.map((timeObject, idx) =>

					<li key={idx}>
						<label>Measurement:</label>
						{ timeObject.total }
					</li>

				)}

				<div className="measurement-controls">
					<span className="total-measurement">
						<label>Total measured time:</label>
						<span>{timeData.totalTime}</span>
					</span>

					<span>
						<Button text="new time measurement" type="submit" onClick={e => {
							console.log('hoi man ff time measuren ja toch niet dan')
						}}/>
					</span>
				</div>

				<style jsx>{ styles }</style>
			</ul>

		)
	}
}

export default TimeMeasurement;
