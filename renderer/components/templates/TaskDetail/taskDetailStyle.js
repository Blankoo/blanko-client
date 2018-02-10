export default `
.taskDetail {
	position: fixed;
	right: -396px;
	width: 420px;
	top: 0;
	bottom: 0;
	padding: 32px 32px 32px 0;
	transition: all .2s ease-in-out;
}

.taskDetail.show {
	right: 0;
	transiton: all .3s ease-in-out;
}

.taskDetailTile {
	background: #FFFFFF;
	box-shadow: 0 5px 20px 0 rgba(238,238,243, 0.8);
	border-radius: 4px;
	padding: 24px;
	max-width: 100%;
	height: 100%;
	position: relative;
	transition: 300ms	ease-in-out;
}

.taskDetailTile .closeTaskDetail {
	position: absolute;
	right: 0;
	top: 0;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
}

.taskDetailTile .closeTaskDetail img {
	transform: rotate(-45deg);
}

.mainTitle {
	font-weight: normal;
	font-size: 22px;
	color: #7A848F;
	margin-bottom: 16px;
}

.description {
	font-weight: light;
	font-size: 12px;
	color: #7D7D7D;
	letter-spacing: 0;
	line-height: 20px;
	margin-bottom: 40px;
}

.dates {
	display: flex;
	justify-content: space-between;
}

.dates .dateItem {
	width: 50%;
	height: auto;
	display: flex;
	flex-direction: column;
}

.dates .dateItem .label {
	margin-bottom: 8px;
}

.dates .dateItem .date {
	font-size: 14px;
	color: #424459;
	letter-spacing: 0.7px;
}
`
