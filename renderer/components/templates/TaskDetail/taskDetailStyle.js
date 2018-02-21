export default `
.task-detail {
	position: fixed;
	right: -396px;
	width: 420px;
	top: 0;
	bottom: 0;
	padding: 32px 32px 32px 0;
	transition: all .2s ease-in-out;
	z-index: 10;
}

.task-detail.show {
	right: 0;
	transiton: all .3s ease-in-out;
}

.task-detail-tile {
	background: #FFFFFF;
	/* box-shadow: 0 5px 20px 0 rgba(238,238,243, 0.8); */
	box-shadow: 0 6px 18px -6px rgba(4,19,36,0.27);
	border-radius: 8px;
	padding: 40px;
	max-width: 100%;
	height: 100%;
	position: relative;
	transition: 300ms	ease-in-out;
}

.task-detail-tile .close-task-detail {
	position: absolute;
	right: 0;
	top: 0;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
}

.task-detail-tile .close-task-detail img {
	transform: rotate(-45deg);
}

.task-detail-tile-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	opacity: 1;
	transition: all 150ms	ease-in-out;
}

.task-detail-tile-container.animate {
	opacity: 0;
}


.checkbox {
	position: relative;
	top: 6px;
}

.main-title {
	font-weight: normal;
	font-size: 22px;
	color: #7A848F;
	margin-bottom: 16px;
	position: relative;
	width: calc(100% - 32px);
}

.description {
	font-weight: light;
	font-size: 12px;
	color: #7D7D7D;
	letter-spacing: 0;
	line-height: 20px;
	margin-bottom: 40px;
	width: 100%;
}

.dates {
	width: 100%;
	display: flex;
	justify-content: space-between;
}

.dates .date-item {
	width: 50%;
	height: auto;
	display: flex;
	flex-direction: column;
}

.dates .date-item label {
	margin-bottom: 8px;
}

.dates .date-item .date {
	font-size: 14px;
	color: #424459;
	letter-spacing: 0.7px;
}
`
