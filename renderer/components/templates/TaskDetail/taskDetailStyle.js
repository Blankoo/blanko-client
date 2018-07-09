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
	box-shadow: 0 6px 18px -6px rgba(4,19,36,0.27);
	border-radius: 8px;
	padding: 24px;
	max-width: 100%;
	height: 100%;
	overflow-y: scroll;
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
	align-items: center;
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

.checkbox.taskdetail {
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
	margin-bottom: 32px;
	width: 100%;
}

.labels {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 32px;
}

.labels .label-item {
	width: 50%;
	height: auto;
	display: flex;
	flex-direction: column;
}

.labels .label-item label {
	margin-bottom: 8px;
	font-weight: 500;
	text-transform: uppercase;
	font-size: 10px;
}

.labels .label-item .status {
	font-size: 14px;
	color: #424459;
	letter-spacing: 0.7px;
	text-transform: capitalize;
}

.subtask-list {
	width: 100%;
	margin-bottom: 32px;
}

.subtask-list .subtask {
	display: flex;
	font-size: 14px;
	align-items: center;
	margin: 12px 0;
	color: #424459;
	position: relative;
}

.subtask-list .subtask:hover .delete-subtask {
	visibility: visible;
	opacity: 1;
}

.subtask-list .subtask span.checked {
	text-decoration: line-through;
	color: #D0D1D6;
	text-decoration-color: #1C87FB;
}

.subtask-list .subtask .delete-subtask {
	font-size: 10px;
	margin-left: 10px;
	position: absolute;
	right: 0;
	visibility: hidden;
	cursor: default;
	opacity: 0;
}

.controllers {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
`
