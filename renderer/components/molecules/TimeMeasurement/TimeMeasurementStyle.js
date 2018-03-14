export default `
.time-measurement-container {
	width: 100%;
}

.time-measurements {
	width: 100%;
	margin-bottom: 64px;
}

.time-measurements li {
	display: flex;
	background: #F6F6F6;
	border-radius: 4px;
	margin: 16px 0;
	padding: 16px;
	width: 100%;
	align-items: center;
}

.time-measurements li label {
	flex: 1;
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 500;
}

.add-measurement,
.total-measurement {
	display: inline-flex;
}

.total-measurement {
	text-align: right;
}

.measurement-controls {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.total-measurement span {
	font-size: 14px;
	color: #424459;
	letter-spacing: 0.7px;
}
.total-measurement label {
	margin-bottom: 8px;
	text-transform: uppercase;
	color: #7A848F;
	font-weight: 700;
	font-size: 10px;
	display: block;
}
`
